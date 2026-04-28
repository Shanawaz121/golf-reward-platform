import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-white">
      <h1 className="text-6xl font-black tracking-tighter text-slate-900 mb-6">GOLF REWARDS</h1>
      <p className="text-slate-500 mb-10 max-w-md text-lg">
        Join the exclusive platform to track your golf performance and give back to the community.
      </p>
      <Link href="/dashboard" className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl active:scale-95">
        Enter Dashboard
      </Link>
    </div>
  );
}