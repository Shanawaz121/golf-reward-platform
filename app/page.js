// File: app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans">
      <h1 className="text-5xl font-black mb-4">GOLF REWARDS</h1>
      <p className="text-slate-500 mb-8">Digital Heroes Assignment Platform</p>
      <Link href="/dashboard" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold">
        Enter Dashboard
      </Link>
    </div>
  );
}