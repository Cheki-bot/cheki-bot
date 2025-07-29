"use client";

import { useState, useEffect } from "react";
import { ButtonComponent, InputComponent } from "@/components";

export default function Home() {
  const [state, setState] = useState({ query: "", messages: [] as string[] });

  useEffect(() => {
    const saved = localStorage.getItem("cheki_messages");
    if (saved) {
      setState((prev) => ({ ...prev, messages: JSON.parse(saved) }));
    } else {
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cheki_messages", JSON.stringify(state.messages));
  }, [state.messages]);

  const handleSend = () => {
    const trimmed = state.query.trim();
    if (trimmed) {
      setState((prev) => ({
        query: "",
        messages: [...prev.messages, trimmed],
      }));
    } else {
      console.log("no enviado");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-between w-full max-w-5xl mb-8">
        <h1 className="text-4xl font-bold">Bienvenido a Cheki Bot</h1>
        <p className="mt-4">
          Tu asistente de IA para todo lo relacionado con el proceso electoral.
        </p>
      </div>
      {state !== null && state.messages.length > 0 && (
        <div className="w-full max-w-4xl h-96 mb-8 p-6 rounded-xl overflow-auto space-y-4 scrollbar scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-lg scrollbar-track-neutral-900">
          {state.messages.map((msg, i) => (
            <article
              key={i}
              className="bg-neutral-800 text-white p-3 rounded text-right w-fit max-w-[70%] ml-auto"
            >
              {msg}
            </article>
          ))}
        </div>
      )}

      <div className="w-1/2 flex gap-4">
        <InputComponent
          placeholder="Pregunta lo que quieras sobre el proceso electoral"
          alt="Buscar"
          value={state.query}
          onChange={(e) =>
            setState((prev) => ({ ...prev, query: e.target.value }))
          }
        />
        <ButtonComponent onPress={handleSend}>Consultar</ButtonComponent>
      </div>
    </main>
  );
}
