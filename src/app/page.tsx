'use client';
import { useEffect, useRef, useState } from 'react';

import {
    ButtonComponent,
    InputComponent,
    MessageComponent,
} from '@/components';
import { type Message, useChatWebSocket, useViewportHeight } from '@/hooks';
import { ModalComponent } from '@/components/shared/modal-component/ModalComponent';
import { ChequeaBoliviaLogo } from '@/assets/logos/chequea-bolivia_logo';
import Image from 'next/image';
import { Questions } from '@/lib/models/frequently-questions';

export default function Home() {
    const [openModal, setOpenModal] = useState(false);
    const [randomQuestions, setRandomQuestions] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement>(
        null
    ) as React.RefObject<HTMLDivElement>;
    const { messages, query, setQuery, sendMessage, resetChat, isGenerating } =
        useChatWebSocket(bottomRef);
    useViewportHeight();

    useEffect(() => {
        setRandomQuestions(
            Questions.sort(() => 0.5 - Math.random()).slice(0, 5)
        );
    }, []);

    const handleNewChat = () => {
        setOpenModal(true);
    };

    return (
        <div
            className="flex flex-col p-2 md:p-0 bg-neutral-900 text-white"
            style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
        >
            {openModal && (
                <ModalComponent
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    Accept={() => {
                        setOpenModal(false);
                        resetChat();
                    }}
                >
                    <h2 className="text-lg font-semibold text-red-400">
                        ¿Estás seguro de que quieres iniciar un nuevo chat?
                    </h2>
                    <p className="text-neutral-400 m-auto my-5">
                        ¡Esto borrará el historial actual!
                    </p>
                </ModalComponent>
            )}
            <ChatHeader onNewChat={handleNewChat} />

            <main className="flex relative flex-col flex-1 p-0 md:px-6 overflow-auto justify-center items-center">
                {messages.length > 0 ? (
                    <ChatMessages
                        messages={messages}
                        bottomRef={bottomRef}
                        isGenerating={isGenerating}
                    />
                ) : (
                    <>
                        <WelcomeMessage />
                        <div className="flex flex-wrap gap-2 justify-center mb-5 max-w-7xl">
                            {randomQuestions.map((question, index) => (
                                <span
                                    key={index}
                                    className="flex items-center text-center sm:text-lg text-sm sm:w-fit w-72 gap-2 bg-pink-300/10 rounded py-1 px-2 max-w-xs cursor-pointer"
                                >
                                    <p
                                        className="text-neutral-300 text-center w-full line-clamp-2 overflow-hidden"
                                        onClick={() => {
                                            setQuery(question);
                                            sendMessage(question);
                                        }}
                                    >
                                        {question}
                                    </p>
                                </span>
                            ))}
                        </div>
                    </>
                )}

                <ChatInput
                    query={query}
                    setQuery={setQuery}
                    onSend={(e) => {
                        e.preventDefault();
                        sendMessage(query);
                    }}
                    hasMessages={messages.length > 0}
                />
            </main>
            <footer>
                <p className="text-xs text-[10px] text-center text-neutral-400 sm:mb-7 mb-0">
                    La información fue generada con IA y puede contener errores.
                    Verifícala antes de usarla.
                </p>
                <p className="sm:text-xs text-[10px] md:absolute relative md:text-left w-full md:w-fit text-center text-neutral-400 md:p-1 bottom-0">
                    En colaboración con HackLab y SCESI
                </p>
            </footer>
        </div>
    );
}

function ChatHeader({ onNewChat }: { onNewChat: () => void }) {
    return (
        <header className="flex md:px-6 md:py-4 px-4 py-2 h-fit justify-between items-center w-full top-0 border-b border-neutral-700 shadow-lime-300/10 bg-neutral-900 ">
            <span className="md:w-full w-2/3">
                <h1 className="text-xl font-semibold">Checki Bot</h1>
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
    isGenerating = false,
}: {
    messages: Message[];
    bottomRef: React.RefObject<HTMLDivElement>;
    isGenerating?: boolean;
}) {
    return (
        <div className="w-full h-fit md:mb-16 mb-7 flex justify-center flex-1 overflow-y-auto p-4 rounded-xl space-y-4 bg-neutral-900 scrollbar scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-lg scrollbar-track-neutral-900">
            <div
                className=" h-fit md:max-w-7xl md:w-7xl flex flex-col gap-4 "
                style={{ width: '-webkit-fill-available' }}
            >
                {messages.map((msg, i) => (
                    <MessageComponent
                        key={i}
                        msg={msg}
                        // loading={isGenerating && i === messages.length - 1}
                    />
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}

function WelcomeMessage() {
    return (
        <header className="flex flex-col items-center justify-between w-full max-w-5xl mb-8">
            <Image
                width={200}
                height={200}
                src="/logo_chatbot_notext.png"
                alt="Logo chatbot Chekibot"
            />
            <h1 className="text-2xl font-bold text-center md:text-4xl text-[#68BEB4]">
                Bienvenido a CheckiBot
            </h1>
            <div className="flex mt-4 items-center justify-center w-full h-full gap-2">
                <p className="text-center flex flex-col md:flex-row items-center gap-2 text-neutral-300">
                    Tu asistente de IA para todo lo relacionado con el proceso
                    electoral creado por
                    <span className="flex items-center">
                        <ChequeaBoliviaLogo className="w-7 h-7 aspect-square" />
                        <strong className="text-xl">
                            <span className="text-white">Chequea</span>
                            <span className="text-[#68BEB4]">Bolivia</span>
                        </strong>
                    </span>
                </p>
            </div>
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
            className={`w-full mx-8 ${hasMessages ? 'fixed md:bottom-10 bottom-8 mb-2' : ''} max-w-7xl flex gap-4 items-baseline-last border  p-3 rounded-lg bg-neutral-900`}
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
