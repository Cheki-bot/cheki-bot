export const markdownComponents = {
    a: ({ node, ...props }) => (
        <a
            {...props}
            className="text-blue-400 hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
        />
    ),
    code: ({ node, inline, ...props }) =>
        inline ? (
            <code
                {...props}
                className="bg-neutral-700 px-1 py-0.5 rounded text-sm"
            />
        ) : (
            <code
                {...props}
                className="bg-neutral-900 text-green-400 px-2 py-1 rounded block text-sm"
            />
        ),
    pre: ({ node, ...props }) => (
        <pre
            {...props}
            className="bg-neutral-900 p-3 rounded-lg text-sm overflow-x-auto"
        />
    ),
    h1: ({ node, ...props }) => (
        <h1 {...props} className="text-2xl font-bold mb-3" />
    ),
    h2: ({ node, ...props }) => (
        <h2 {...props} className="text-xl font-bold mb-2" />
    ),
    h3: ({ node, ...props }) => (
        <h3 {...props} className="text-lg font-semibold mb-2" />
    ),
    p: ({ node, ...props }) => <p {...props} />,
    blockquote: ({ node, ...props }) => (
        <blockquote
            {...props}
            className="border-l-4 border-neutral-600 pl-4 italic mb-2 text-neutral-300"
        />
    ),
    ul: ({ node, ...props }) => (
        <ul {...props} className="list-disc pl-6 mb-2" />
    ),
    ol: ({ node, ...props }) => (
        <ol {...props} className="list-decimal pl-6 mb-2" />
    ),
    li: ({ node, ...props }) => <li {...props} className="mb-1" />,
};
