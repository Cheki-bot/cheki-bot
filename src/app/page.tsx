'use client';
import { useRef } from 'react';

import {
    ButtonComponent,
    InputComponent,
    MessageComponent,
} from '@/components';
import { type Message, useChatWebSocket, useViewportHeight } from '@/hooks';

export default function Home() {
    const bottomRef = useRef<HTMLDivElement>(
        null
    ) as React.RefObject<HTMLDivElement>;
    const { messages, query, setQuery, handleSend, resetChat } =
        useChatWebSocket(bottomRef);

    useViewportHeight();

    return (
        <div
            className="flex flex-col p-2 md:p-0 bg-neutral-800 text-white"
            style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
        >
            <ChatHeader onNewChat={resetChat} />

            <main className="flex flex-col flex-1 p-0 md:px-6 overflow-auto justify-center items-center mb-5">
                {messages.length > 0 ? (
                    <ChatMessages messages={messages} bottomRef={bottomRef} />
                ) : (
                    <WelcomeMessage />
                )}

                <ChatInput
                    query={query}
                    setQuery={setQuery}
                    onSend={handleSend}
                    hasMessages={messages.length > 0}
                />
            </main>
        </div>
    );
}

function ChatHeader({ onNewChat }: { onNewChat: () => void }) {
    return (
        <header className="flex md:px-6 md:py-4 px-4 py-2 h-fit justify-between items-center w-full top-0 border-b border-neutral-700 shadow-lime-300/10 bg-neutral-900 ">
            <span className="md:w-full w-2/3">
                <h1 className="text-xl font-semibold">Cheki Bot</h1>
                <p className="md:text-sm text-xs text-neutral-400">
                    Tu asistente de IA para todo lo relacionado con el proceso
                    electoral.
                </p>
            </span>
            <ButtonComponent
                styles="text-xs md:text-sm md:h-14 h-10"
                onPress={onNewChat}
            >
                Nuevo Chat
            </ButtonComponent>
        </header>
    );
}

function ChatMessages({
    messages,
    bottomRef,
}: {
    messages: Message[];
    bottomRef: React.RefObject<HTMLDivElement>;
}) {
    return (
        <div className="w-full h-fit md:mb-16 mb-7 flex justify-center flex-1 overflow-y-auto p-4 rounded-xl space-y-4 bg-neutral-900 scrollbar scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-lg scrollbar-track-neutral-900">
            <div className=" h-fit md:max-w-7xl md:w-7xl flex flex-col gap-4 " style={{ width: '-webkit-fill-available' }}>
                {messages.map((msg, i) => (
                    <MessageComponent key={i} msg={msg} />
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}

function WelcomeMessage() {
    return (
        <header className="flex flex-col items-center justify-between w-full max-w-5xl mb-8">
            <h1 className="text-2xl font-bold text-center md:text-4xl">
                Bienvenido a Cheki Bot
            </h1>
            <p className="mt-4 text-center ">
                Tu asistente de IA para todo lo relacionado con el proceso
                electoral.
            </p>
        </header>
    );
}

function ChatInput({
    query,
    setQuery,
    onSend,
    hasMessages,
    end = false,
}: {
    query: string;
    setQuery: (val: string) => void;
    onSend: (e: React.FormEvent) => void;
    hasMessages: boolean;
    end?: boolean;
}) {
    return (
        <form
            onSubmit={onSend}
            className={`w-full ${hasMessages ? 'fixed md:bottom-10 bottom-0 mb-2' : ''} max-w-7xl flex gap-4 items-baseline-last border border-neutral-700 p-3 rounded-lg bg-neutral-900`}
        >
            <InputComponent
                placeholder="Pregunta lo que quieras"
                type="largetext"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                limit={500}
            />
            <ButtonComponent type="submit" disabled={end && !query}>
                Consultar
            </ButtonComponent>
        </form>
    );
}
