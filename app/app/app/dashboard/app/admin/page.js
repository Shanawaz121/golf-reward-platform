'use client';
import { useState } from 'react';

export default function AdminPanel() {
  const [winningNums, setWinningNums] = useState([]);

  // Draw Logic: Random generation [cite: 55, 105]
  const triggerDraw = () => {
    const nums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 45) + 1);
    setWinningNums(nums);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black mb-10 tracking-tight">ADMIN CONTROL</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-slate-900 text-white p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6">Monthly Draw Engine [cite: 50]</h2>
          <button onClick={triggerDraw} className="bg-indigo-500 hover:bg-indigo-400 w-full py-4 rounded-full font-bold transition">
            Run Draw Simulation
          </button>
          
          {winningNums.length > 0 && (
            <div className="mt-8 flex gap-3 justify-center">
              {winningNums.map((n, i) => (
                <div key={i} className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center font-black text-xl">
                  {n}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6">Winner Verification [cite: 84]</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold">User #8291</p>
                <p className="text-xs text-slate-400 italic">Proof: score_card.png</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">Verify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}