import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-4xl font-black text-slate-900 mb-4">GOLF REWARDS</h1>
      <Link href="/dashboard" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
        Go to Dashboard
      </Link>
    </div>
  );
}