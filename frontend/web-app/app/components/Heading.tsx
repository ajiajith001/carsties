type Props = {
    title: string;
    subTitle?: string;
    center?: boolean;
};

export default function Heading({ title, subTitle, center }: Props) {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subTitle && <p className="font-light text-neutral-500 mt-2">{subTitle}</p>}
        </div>
    );
}
