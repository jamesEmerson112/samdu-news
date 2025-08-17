import { LayoutProps } from '@/types';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children, className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
