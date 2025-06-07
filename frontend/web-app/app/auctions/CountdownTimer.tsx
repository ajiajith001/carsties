'use client';
import Countdown, { zeroPad } from 'react-countdown';

type CountdownRenderProps = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    return (
        <div
            className={`flex border-2 border-white text-white py-1 px-2 rounded-lg justify-center
            ${
                completed
                    ? 'bg-red-500'
                    : days === 0 && hours < 10
                    ? 'bg-amber-600'
                    : 'bg-green-600'
            }`}>
            {completed ? (
                <span>Finished</span>
            ) : (
                <span suppressHydrationWarning>
                    {days}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            )}
        </div>
    );
};

type CountdownTimerProps = {
    auctionEnd?: string;
};

export default function CountdownTimer({ auctionEnd }: CountdownTimerProps) {
    return (
        <div>
            <Countdown date={auctionEnd} renderer={renderer} />
        </div>
    );
}
