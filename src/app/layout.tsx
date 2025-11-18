import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitGreen - Carbon Tracking for Software Development',
  description: 'Track, tokenize, and offset your software development carbon footprint with Hedera Guardian',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
