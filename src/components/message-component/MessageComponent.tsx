import { useEffect, useState } from 'react';

type MessageComponentProps = {
    msg: { role: 'user' | 'bot'; content: string };
    loading?: boolean;
};

export const MessageComponent = ({ msg, loading }: MessageComponentProps) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        if (!loading) return;

        const dotInterval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500);

        return () => clearInterval(dotInterval);
    }, [loading]);

    return (
        <article
            className={`bg-neutral-800 text-white p-3 rounded w-fit max-w-[70%] font-mono whitespace-pre-wrap 
                    ${loading && 'min-w-[60px] min-h-[50px] flex justify-start'} 
                ${msg.role === 'bot' ? 'text-left bg-transparent' : 'text-right ml-auto'}`}
        >
            {loading ? `${dots}` : msg.content}
        </article>
    );
};
