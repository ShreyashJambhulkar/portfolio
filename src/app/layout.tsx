// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata = {
  title: 'Code Greek Portfolio',
  description: 'Showcasing the technical journey and projects of Vishwatej and Shreyash',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}