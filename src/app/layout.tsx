import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';

import './globals.css';
import Script from 'next/script';

const baloo2 = Baloo_2({
    variable: '--font-baloo2',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Checki-Bot',
    description: 'AI Agent Chatbot used for electoral process in Bolivia',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${baloo2.variable} antialiased`}>
                {children}
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <Script
                    id="ga-setup"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `}
                </Script>
            </body>
        </html>
    );
}
