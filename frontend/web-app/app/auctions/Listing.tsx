'use client';
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import { useEffect, useState } from 'react';
import { Auction, PageResult } from '@/types';
import Filter from './Filter';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useShallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyContent from '../components/EmptyContent';

export default function Listing() {
    const [data, setData] = useState<PageResult<Auction>>();
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
    const setParams = useParamsStore((state) => state.setParams);
    const url = qs.stringifyUrl({ url: '', query: params }, { skipEmptyString: true });

    const setPageNumber = (pageNumber: number) => setParams({ pageNumber });

    useEffect(() => {
        getData(url).then((data) => {
            setData(data);
        });
    }, [setData, url]);

    if (!data) return <h3>Loading...</h3>;

    return (
        <>
            <Filter />
            {data.results.length === 0 ? (
                <EmptyContent showRest />
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-6">
                        {data &&
                            data.results.map((auction) => (
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
