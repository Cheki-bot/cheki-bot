import React, {
    AnchorHTMLAttributes,
    HTMLAttributes,
    DetailedHTMLProps,
} from 'react';

interface CodeProps extends HTMLAttributes<HTMLElement> {
    inline?: boolean;
}

export const markdownComponents = {
    a: (
        props: DetailedHTMLProps<
            AnchorHTMLAttributes<HTMLAnchorElement>,
            HTMLAnchorElement
        >
    ) => (
        <a
            {...props}
            className="text-blue-400 hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
        />
    ),
    code: ({ inline, ...props }: CodeProps) =>
        inline ? (
            <code
                {...props}
                className="bg-neutral-700 px-1 py-0.5 rounded text-sm"
            />
        ) : (
            <code
                {...props}
                className="bg-neutral-900 text-green-400 px-2 py-1 rounded block text-sm overflow-auto scrollbar scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-lg scrollbar-track-neutral-900"
            />
        ),
    pre: (props: HTMLAttributes<HTMLPreElement>) => (
        <pre
            {...props}
            className="bg-neutral-900 p-3 rounded-lg text-sm overflow-x-auto"
        />
    ),
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h1 {...props} className="text-2xl font-bold mb-3" />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h2 {...props} className="text-xl font-bold mb-2" />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h3 {...props} className="text-lg font-semibold mb-2" />
    ),
    p: (props: HTMLAttributes<HTMLParagraphElement>) => <p {...props} className="mb-2 text-neutral-300" />,
    blockquote: (props: HTMLAttributes<HTMLElement>) => (
        <blockquote
            {...props}
            className="border-l-4 border-neutral-600 pl-4 italic mb-2 text-neutral-300"
        />
    ),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
        <ul {...props} className="list-disc pl-6 mb-2" />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
        <ol {...props} className="list-decimal pl-6 mb-2" />
    ),
    li: (props: HTMLAttributes<HTMLLIElement>) => (
        <li {...props} className="mb-1" />
    ),
    hr: (props: HTMLAttributes<HTMLHRElement>) => (
        <hr {...props} className="border-t border-neutral-700  my-4" />
    ),
};
