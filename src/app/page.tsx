'use client';
import { useState, useEffect, useRef } from 'react';

import { useViewportHeight } from '@/hooks/useViewPortHeight';

import { MessageComponent } from '@/components/message-component/MessageComponent';
import { ButtonComponent, InputComponent } from '@/components';

type Message = {
    role: 'user' | 'bot';
    content: string;
};

export default function Home() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({
        query: '',
        messages: [] as Message[],
    });
    useViewportHeight();

    useEffect(() => {
        const saved = localStorage.getItem('cheki_messages');
        if (saved) {
            setState((prev) => ({ ...prev, messages: JSON.parse(saved) }));
        } else {
        }
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [state.messages]);

    useEffect(() => {
        localStorage.setItem('cheki_messages', JSON.stringify(state.messages));
    }, [state.messages]);

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = state.query.trim();

        if (trimmed) {
            const userMsg: Message = { role: 'user', content: trimmed };

            const responseMap: { [key: string]: string } = {
                elecciones:
                    'Las próximas elecciones serán el 2 de junio de 2024.',
                registro: 'Puedes consultar tu registro en la página del INE.',
                votar: 'Necesitas tu credencial de elector vigente para votar.',
            };
            const foundKey = Object.keys(responseMap).find((k) =>
                trimmed.toLowerCase().includes(k)
            );
            const botMsg: Message = {
                role: 'bot',
                content: foundKey
                    ? responseMap[foundKey]
                    : 'Lo siento, no tengo información sobre eso aún.',
            };
            setState((prev) => ({
                query: '',
                messages: [...prev.messages, userMsg, botMsg],
            }));
        } else {
            console.error('no enviado');
        }
    };

    return (
        <div
            className="flex flex-col p-2 md:p-0"
            style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
        >
            <header className="flex  px-6 py-4 h-fit flex-col w-full top-0 border-b-[1px] border-neutral-700 shadow-lime-300/10 bg-neutral-900 ">
                <h1 className="text-xl font-semibold">Cheki Bot</h1>
                <p className="md:text-sm text-xs text-neutral-400">
                    Tu asistente de IA para todo lo relacionado con el proceso
                    electoral.
                </p>
            </header>

            <main className="flex flex-col flex-1 p-0 md:px-6 overflow-auto justify-center items-center mb-5">
                {state.messages.length > 0 ? (
                    <div className="w-full h-fit md:mb-16 mb-7 flex justify-center flex-1 overflow-y-auto p-4 rounded-xl space-y-4 bg-neutral-900 scrollbar scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-lg scrollbar-track-neutral-900">
                        <div className="w-full h-fit md:w-7xl flex flex-col gap-4 ">
                            {state.messages.map((msg, i) => (
                                <MessageComponent key={i} msg={msg} />
                            ))}
                            <div ref={bottomRef} />
                        </div>
                    </div>
                ) : (
                    <header className="flex flex-col items-center justify-between w-full max-w-5xl mb-8">
                        <h1 className="text-2xl font-bold text-center md:text-4xl">
                            Bienvenido a Cheki Bot
                        </h1>
                        <p className="mt-4 text-center ">
                            Tu asistente de IA para todo lo relacionado con el
                            proceso electoral.
                        </p>
                    </header>
                )}

                <form
                    onSubmit={handleSend}
                    className="w-full fixed md:bottom-10 bottom-0 max-w-7xl flex gap-4 items-baseline-last border border-neutral-700 p-3 rounded-lg bg-neutral-900"
                >
                    <InputComponent
                        placeholder="Pregunta lo que quieras"
                        type="largetext"
                        value={state.query}
                        onChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                query: e.target.value,
                            }))
                        }
                    />
                    <ButtonComponent type="submit" disabled={!state.query}>
                        Consultar
                    </ButtonComponent>
                </form>
            </main>
        </div>
    );
}
