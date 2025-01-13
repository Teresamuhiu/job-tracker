import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Job Tracker',
  description: 'Track your job applications effectively',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
