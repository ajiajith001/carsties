'use client';

import { useParamsStore } from '@/hooks/useParamsStore';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineCar } from 'react-icons/ai';

export default function Logo() {
    const router = useRouter();
    const pathname = usePathname();
    const reset = useParamsStore((state) => state.reset);

    const handleRest = () => {
        if (pathname !== '/') {
            router.push('/');
        }
        reset();
    };

    return (
        <div
            className="flex items-center gap-2 
            text-3xl font-semibold text-red-500 
            cursor-pointer"
            onClick={handleRest}>
            <AiOutlineCar size={34} />
            <div>Carsties Auctions</div>
        </div>
    );
}
