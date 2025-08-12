import { useState, useEffect, useCallback } from 'react';

export type Message = {
    role: 'user' | 'bot';
    content: string;
};

export function useChatWebSocket(bottomRef: React.RefObject<HTMLDivElement>) {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [end, setEnd] = useState(false);

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

    const handleSend = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const trimmed = query.trim();
            if (!trimmed) return;

            const userMsg: Message = { role: 'user', content: trimmed };
            const updatedMessages = [...messages, userMsg];
            setMessages(updatedMessages);
            setQuery('');

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
                        content: trimmed,
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
                setEnd(true);
                console.log('Conexión cerrada');
            };
            ws.onerror = (err) => console.error('Error WebSocket', err);
        },
        [query, messages]
    );

    const resetChat = useCallback(() => {
        setMessages([]);
        localStorage.removeItem('cheki_messages');
    }, []);

    return { query, setQuery, messages, handleSend, resetChat };
}
