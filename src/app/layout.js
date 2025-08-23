import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'imaginary',
  description: 'Premium products at unbeatable prices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-zinc-900 text-zinc-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}