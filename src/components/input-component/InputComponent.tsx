"use client";

import React, { useRef, useEffect } from "react";

interface InputComponentProps {
  placeholder?: string;
  ariaLabel?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "search"
    | "tel"
    | "url"
    | "date"
    | "time"
    | "largetext";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const InputComponent = ({
  placeholder,
  ariaLabel,
  value,
  onChange,
  type = "text",
}: InputComponentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (type === "largetext") {
      handleInput();
    }
  }, [value, type]);

  return type === "largetext" ? (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className="max-h-40 border border-neutral-700 px-2 py-1.5 rounded-md w-full resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900"
      rows={1}
      onInput={handleInput}
      value={value}
      onChange={onChange}
    />
  ) : (
    <input
      placeholder={placeholder}
      aria-label={ariaLabel}
      type={type}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded-md w-full"
    />
  );
};
