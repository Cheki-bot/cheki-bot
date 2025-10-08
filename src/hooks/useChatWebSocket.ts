import { useState, useEffect, useCallback } from 'react';

export type Message = {
    role: 'user' | 'bot';
    content: string;
    type?: 'text' | 'error' | 'info';
};

export function useChatWebSocket(bottomRef: React.RefObject<HTMLDivElement>) {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('cheki_messages');
        if (saved) {
            const parsed = JSON.parse(saved);
            const trimmed = parsed.length > 200 ? parsed.slice(-200) : parsed;
            setMessages(trimmed);
            localStorage.setItem('cheki_messages', JSON.stringify(trimmed));
        }
    }, []);

    useEffect(() => {
        const trimmed = messages.length > 200 ? messages.slice(-200) : messages;
        localStorage.setItem('cheki_messages', JSON.stringify(trimmed));
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, bottomRef]);

    const sendMessage = useCallback(
        (message?: string) => {
            const content = message ?? query.trim().replace(/\s+/g, ' ').trim();
            if (!content || isGenerating) return;

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
                try {
                    const data = JSON.parse(event.data);
                    const { content, type, done } = data;

                    if (!content) return;

                    setMessages((prev) => {
                        let msgs = [...prev];

                        if (type === 'info') {
                            msgs = msgs.filter(
                                (m) => !(m.role === 'bot' && m.type === 'info')
                            );
                            return [
                                ...msgs,
                                { role: 'bot', content: content, type },
                            ];
                        } else {
                            msgs = msgs.filter(
                                (m) => !(m.role === 'bot' && m.type === 'info')
                            );

                            const lastMsg = msgs[msgs.length - 1];

                            if (
                                lastMsg?.role === 'bot' &&
                                lastMsg.type === type
                            ) {
                                msgs[msgs.length - 1] = {
                                    ...lastMsg,
                                    content:
                                        lastMsg.content + content,
                                };
                                return msgs;
                            }

                            return [
                                ...msgs,
                                { role: 'bot', content: content, type },
                            ];
                        }
                    });

                    if (done) ws.close();
                } catch (err) {
                    console.error('Error parsing message:', err);
                }
            };

            ws.onclose = () => {
                setIsGenerating(false);
            };

            ws.onerror = (err) => {
                setIsGenerating(false);
                console.error('Error WebSocket', err);
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'bot',
                        content: 'Error de conexión con el servidor.',
                        type: 'error',
                    },
                ]);
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
