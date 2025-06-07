import { useParamsStore } from '@/hooks/useParamsStore';
import Heading from './Heading';
import { Button } from 'flowbite-react';

type Props = {
    title?: string;
    subtitle?: string;
    showRest?: boolean;
};

export default function EmptyContent({
    title = 'No Match found',
    subtitle = 'Try chaning the filter or search term',
    showRest
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
            </div>
        </div>
    );
}
