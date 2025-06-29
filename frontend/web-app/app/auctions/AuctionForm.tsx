'use client';
import { useEffect } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { createAuction, updateAuction } from '../actions/auctionActions';
import toast from 'react-hot-toast';
import { Auction } from '@/types';

type Props = {
    auction?: Auction;
};
export default function AuctionForm({ auction }: Props) {
    const router = useRouter();
    const pathName = usePathname();
    const {
        control,
        handleSubmit,
        setFocus,
        reset,
        formState: { isSubmitting, isValid, isDirty }
    } = useForm({
        mode: 'onTouched'
    });

    useEffect(() => {
        if (auction) {
            const { make, model, color, year, mileage } = auction;
            reset({ make, model, color, year, mileage });
        }

        setFocus('make');
    }, [auction, setFocus, reset]);

    const onSubmit = async (data: FieldValues) => {
        try {
            let id = '';
            let res;

            if (pathName === '/auctions/create') {
                res = await createAuction(data);
                id = res.id;
            } else {
                if (auction) {
                    id = auction.id;
                    res = await updateAuction(data, id);
                }
            }

            if (res.error) {
                throw res.error;
            }
            router.push(`/auctions/details/${id}`);
        } catch (error: any) {
            console.log(error);
            toast.error(error.status + ' ' + error.message);
        }
    };

    return (
        <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="make"
                label="Make"
                control={control}
                rules={{ required: 'Make is required' }}
            />
            <Input
                name="model"
                label="Model"
                control={control}
                rules={{ required: 'Model is required' }}
            />
            <Input
                name="color"
                label="Color"
                control={control}
                rules={{ required: 'Color is required' }}
            />
            <div className="grid grid-cols-2 gap-3">
                <Input
                    name="year"
                    label="Year"
                    type="number"
                    control={control}
                    rules={{ required: 'Year is required' }}
                />
                <Input
                    name="mileage"
                    label="Mileage"
                    type="number"
                    control={control}
                    rules={{ required: 'Mileage is required' }}
                />
            </div>
            {pathName === '/auctions/create' && (
                <>
                    <Input
                        name="imageUrl"
                        label="Image URL"
                        control={control}
                        rules={{ required: 'Image URL is required' }}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <Input
                            name="reservePrice"
                            label="Reserve price (enter 0 if no reserve price)"
                            type="number"
                            control={control}
                            rules={{ required: 'Reserve price is required' }}
                        />
                        <DateInput
                            name="auctionEnd"
                            label="Auction end date/time"
                            control={control}
                            showTimeSelect
                            dateFormat={'dd MMMM yyyy h:mm a'}
                            rules={{ required: 'Auction end date is required' }}
                        />
                    </div>
                </>
            )}

            <div className="flex justify-between">
                <Button color="alternative" onClick={() => router.push('/')}>
                    Cancel
                </Button>
                <Button
                    outline
                    color="green"
                    type="submit"
                    disabled={!isValid || !isDirty}
                    onClick={() => router.push('/')}>
                    {isSubmitting && <Spinner size="sm" />}
                    Submit
                </Button>
            </div>
        </form>
    );
}
