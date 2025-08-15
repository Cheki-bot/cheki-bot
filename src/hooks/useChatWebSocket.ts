import { useState, useEffect, useCallback } from 'react';

export type Message = {
    role: 'user' | 'bot';
    content: string;
};

export function useChatWebSocket(bottomRef: React.RefObject<HTMLDivElement>) {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('cheki_messages');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.length > 200) {
                const last200 = parsed.slice(-200);
                setMessages(last200);
                localStorage.setItem('cheki_messages', JSON.stringify(last200));
            } else {
                setMessages(parsed);
            }
        }
    }, []);

    useEffect(() => {
        if (messages.length > 200) {
            const last200 = messages.slice(-200);
            setMessages(last200);
            localStorage.setItem('cheki_messages', JSON.stringify(last200));
        } else {
            localStorage.setItem('cheki_messages', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, bottomRef]);

    const sendMessage = useCallback(
        (message?: string) => {
            const content = message ?? query.trim();
            if (!content.trim() || isGenerating) return;

            const userMsg: Message = { role: 'user', content };
            const updatedMessages = [...messages, userMsg];
            setMessages(updatedMessages);
            setQuery('');
            setIsGenerating(true);

            const ws = new WebSocket(
                `${process.env.NEXT_PUBLIC_API_URL}/chatbot/ws`
            );

            ws.onopen = () => {
                const last50Messages = updatedMessages.slice(-50);
                const formattedHistory = last50Messages.map((msg) => ({
                    role: msg.role === 'bot' ? 'assistant' : 'user',
                    content: msg.content,
                }));

                ws.send(
                    JSON.stringify({
                        content,
                        history: formattedHistory,
                    })
                );
            };

            ws.onmessage = (event) => {
                const chunk = event.data;
                setMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg?.role === 'bot') {
                        const msgs = [...prev];
                        msgs[msgs.length - 1] = {
                            ...lastMsg,
                            content: lastMsg.content + chunk,
                        };
                        return msgs;
                    }
                    return [...prev, { role: 'bot', content: chunk }];
                });
            };

            ws.onclose = () => {
                setIsGenerating(false);
                console.log('Conexión cerrada');
            };

            ws.onerror = (err) => {
                setIsGenerating(false);
                console.error('Error WebSocket', err);
            };
        },
        [messages, query, isGenerating]
    );

    const resetChat = useCallback(() => {
        setMessages([]);
        setIsGenerating(false);
        localStorage.removeItem('cheki_messages');
    }, []);

    return { query, setQuery, messages, sendMessage, resetChat, isGenerating };
}
