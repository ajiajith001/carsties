'use server';

import { fetchWrapper } from '@/lib/fetchWrapper';
import { Auction, Bid, PageResult } from '@/types';
import { FieldValues } from 'react-hook-form';

export async function getData(query: string): Promise<PageResult<Auction>> {
    return fetchWrapper.get(`search/${query}`);
}

export async function updateAuctionTest(): Promise<{ status: number; message: string }> {
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1
    };
    return fetchWrapper.put('auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', data);
}

export async function createAuction(data: FieldValues) {
    return fetchWrapper.post('auctions', data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
    return fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
    return fetchWrapper.put(`auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
    return fetchWrapper.del(`auctions/${id}`);
}

export async function getBidsForAuction(auctionId: string): Promise<Bid[]> {
    return fetchWrapper.get(`bids/${auctionId}`);
}

export async function placeBidForAuction(auctionId: string, amount: number) {
    return fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {});
}
