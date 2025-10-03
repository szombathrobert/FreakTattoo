import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'FreakTattoo',
  description: 'Tetováló oldal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
