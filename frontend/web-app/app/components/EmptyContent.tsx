'use client';

import { useParamsStore } from '@/hooks/useParamsStore';
import Heading from './Heading';
import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';

type Props = {
    title?: string;
    subtitle?: string;
    showRest?: boolean;
    showLogin?: boolean;
    callbackUrl?: string;
};

export default function EmptyContent({
    title = 'No Match found',
    subtitle = 'Try chaning the filter or search term',
    showRest,
    showLogin,
    callbackUrl
}: Props) {
    const reset = useParamsStore((state) => state.reset);
    return (
        <div className="flex flex-col items-center justify-center h-[40vh] shadow-lg">
            <Heading title={title} subTitle={subtitle} center />
            <div className="mt-4">
                {showRest && (
                    <Button outline onClick={reset}>
                        Reset filters or search
                    </Button>
                )}
                {showLogin && (
                    <Button
                        outline
                        onClick={() => signIn('id-server', { redirectTo: callbackUrl })}>
                        Login
                    </Button>
                )}
            </div>
        </div>
    );
}
