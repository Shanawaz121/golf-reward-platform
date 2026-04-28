'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function UserDashboard() {
  const [scores, setScores] = useState([]);
  const [scoreVal, setScoreVal] = useState('');
  const [date, setDate] = useState('');
  const [charity, setCharity] = useState('Clean Water Fund');

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    // PRD: Only latest 5 scores retained [cite: 46]
    const { data } = await supabase.from('scores')
      .select('*').eq('user_id', user.id)
      .order('entry_date', { ascending: false }).limit(5);
    setScores(data || []);
  };

  const submitScore = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    // PRD: No duplicate scores for same date [cite: 97]
    const { data: dup } = await supabase.from('scores')
      .select('id').eq('user_id', user.id).eq('entry_date', date);
    
    if (dup?.length > 0) return alert("Score for this date already exists!");

    await supabase.from('scores').insert([{ 
      user_id: user.id, 
      score: parseInt(scoreVal), 
      entry_date: date 
    }]);
    
    loadData();
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="max-w-4xl mx-auto p-10 font-sans">
      <h1 className="text-4xl font-black mb-10 tracking-tight text-slate-900">DASHBOARD</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-lg font-bold mb-6">Add New Score (1-45)</h2>
          <form onSubmit={submitScore} className="space-y-4">
            <input type="number" min="1" max="45" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-indigo-500" 
              placeholder="Stableford Score" onChange={e => setScoreVal(e.target.value)} required />
            <input type="date" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-indigo-500" 
              onChange={e => setDate(e.target.value)} required />
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition">Submit Score</button>
          </form>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-lg font-bold mb-6">Latest 5 Rolling Scores</h2>
          {scores.map((s, idx) => (
            <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-800 last:border-0">
              <span className="text-slate-400">{s.entry_date}</span>
              <span className="text-2xl font-black text-indigo-400">{s.score} <span className="text-sm font-normal text-slate-500">pts</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}