import { markdownComponents } from '@/lib/markdown/components';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
            className={`bg-neutral-800 text-white p-3 rounded w-fit max-w-full md:max-w-[70%] font-mono break-words 
                    ${loading && 'min-w-[60px] min-h-[50px] flex justify-start'} 
                ${msg.role === 'bot' ? 'text-left bg-transparent' : 'ml-auto'}`}
        >
            {loading && msg.role === 'bot' ? (
                `${dots}`
            ) : msg.role === 'bot' ? (
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                >
                    {msg.content}
                </Markdown>
            ) : (
                <span className="text-neutral-300">{msg.content}</span>
            )}
        </article>
    );
};
