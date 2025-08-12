import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';

import './globals.css';

const baloo2 = Baloo_2({
    variable: '--font-baloo2',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Checki-Bot',
    description: 'AI Agent Chatbot used for electoral process in Bolivia',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${baloo2.variable} antialiased`} >{children}</body>
        </html>
    );
}
