import EmptyContent from '@/app/components/EmptyContent';
import React from 'react';

export default function SignIn({ searchParams }: { searchParams: { callbackUrl?: string } }) {
    return (
        <EmptyContent
            title="you need to be logged in to do that"
            subtitle="Please click below to login"
            showLogin
            callbackUrl={searchParams.callbackUrl}
        />
    );
}
