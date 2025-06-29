'use client';
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import { useEffect, useState } from 'react';
import Filter from './Filter';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useShallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyContent from '../components/EmptyContent';
import { useAuctionStore } from '@/hooks/useAuctionStore';

export default function Listing() {
    // const [data, setData] = useState<PageResult<Auction>>();
    const [loading, setLoading] = useState(true);
    const params = useParamsStore(
        useShallow((state) => ({
            pageNumber: state.pageNumber,
            pageSize: state.pageSize,
            searchTerm: state.searchTerm,
            orderBy: state.orderBy,
            filterBy: state.filterBy,
            seller: state.seller,
            winner: state.winner
        }))
    );

    const data = useAuctionStore(
        useShallow((state) => ({
            auctions: state.auctions,
            totalCount: state.totalCount,
            pageCount: state.pageCount
        }))
    );

    const setData = useAuctionStore((state) => state.setData);

    const setParams = useParamsStore((state) => state.setParams);
    const url = qs.stringifyUrl({ url: '', query: params }, { skipEmptyString: true });

    const setPageNumber = (pageNumber: number) => setParams({ pageNumber });

    useEffect(() => {
        getData(url).then((data) => {
            setData(data);
            setLoading(false);
        });
    }, [setData, url]);

    if (loading) return <h3>Loading...</h3>;

    return (
        <>
            <Filter />
            {data.auctions.length === 0 ? (
                <EmptyContent showRest />
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-6">
                        {data &&
                            data.auctions.map((auction) => (
                                <AuctionCard key={auction.id} auction={auction} />
                            ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <AppPagination
                            currentPage={params.pageNumber}
                            pageCount={data.pageCount}
                            onPageChange={setPageNumber}
                        />
                    </div>
                </>
            )}
        </>
    );
}
