'use client';

import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { Auction, AuctionFinished, Bid } from '@/types';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from 'next-auth';
import { useParams } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import AuctionCreatedToast from '../components/AuctionCreatedToast';
import { getDetailedViewData } from '../actions/auctionActions';
import AuctionFinishedToast from '../components/AuctionFinishedToast';

type Props = {
    children: ReactNode;
    user: User | null;
};

export default function SignalRProvider({ children, user }: Props) {
    const connection = useRef<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
    const addBid = useBidStore((state) => state.addBid);
    const params = useParams<{ id: string }>();

    const handleBidPlaced = useCallback(
        (bid: Bid) => {
            if (bid.bidStatus.includes('Accepted')) {
                setCurrentPrice(bid.auctionId, bid.amount);
            }

            if (params.id === bid.auctionId) {
                addBid(bid);
            }
        },
        [params.id, setCurrentPrice, addBid]
    );

    const handleAuctionCreated = useCallback(
        (auction: Auction) => {
            if (user?.username !== auction.seller) {
                return toast(<AuctionCreatedToast auction={auction} />, {
                    duration: 10000
                });
            }
        },
        [user?.username]
    );

    const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
        const auction = getDetailedViewData(finishedAuction.auctionId);
        return toast.promise(
            auction,
            {
                loading: 'Loading',
                success: (auction) => (
                    <AuctionFinishedToast auction={auction} finishedAuction={finishedAuction} />
                ),
                error: () => 'Auction finished'
            },
            { success: { duration: 10000, icon: null } }
        );
    }, []);

    useEffect(() => {
        if (!connection.current) {
            connection.current = new HubConnectionBuilder()
                .withUrl('http://localhost:6001/notifications')
                .withAutomaticReconnect()
                .build();

            connection.current
                .start()
                .then(() => console.log('Connected to notification hub'))
                .catch((err) => console.log(err));
        }

        connection.current.on('BidPlaced', handleBidPlaced);
        connection.current.on('AuctionCreated', handleAuctionCreated);
        connection.current.on('AuctionFinished', handleAuctionFinished);

        return () => {
            connection.current?.off('BidPlaced', handleBidPlaced);
            connection.current?.off('AuctionCreated', handleAuctionCreated);
            connection.current?.off('AuctionFinished', handleAuctionFinished);
        };
    }, [setCurrentPrice, handleBidPlaced, handleAuctionCreated, handleAuctionFinished]);

    return children;
}
