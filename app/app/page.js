'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function UserDashboard() {
  const [scores, setScores] = useState([]);
  const [scoreVal, setScoreVal] = useState('');
  const [date, setDate] = useState('');

  // PRD Requirement: Retain only latest 5 scores [cite: 46, 48]
  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('scores')
      .select('*').eq('user_id', user.id)
      .order('entry_date', { ascending: false }).limit(5);
    setScores(data || []);
  };

  const submitScore = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    // PRD: No duplicate scores for the same date [cite: 97]
    const { data: dup } = await supabase.from('scores')
      .select('id').eq('user_id', user.id).eq('entry_date', date);
    
    if (dup?.length > 0) return alert("Date already exists!");

    await supabase.from('scores').insert([{ user_id: user.id, score: scoreVal, entry_date: date }]);
    loadData();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black mb-8">MY DASHBOARD</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Score Entry [cite: 89] */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-bold mb-4">Enter Latest Score</h2>
          <form onSubmit={submitScore} className="space-y-4">
            <input type="number" min="1" max="45" className="w-full border p-3 rounded-xl" 
              placeholder="Stableford Score (1-45)" onChange={e => setScoreVal(e.target.value)} required />
            <input type="date" className="w-full border p-3 rounded-xl" 
              onChange={e => setDate(e.target.value)} required />
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Submit Score</button>
          </form>
        </div>

        {/* Display [cite: 48, 91] */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-bold mb-4">Your Rolling 5 Scores</h2>
          {scores.map(s => (
            <div key={s.id} className="flex justify-between border-b py-3 last:border-0">
              <span className="text-slate-500">{s.entry_date}</span>
              <span className="font-bold text-lg">{s.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}