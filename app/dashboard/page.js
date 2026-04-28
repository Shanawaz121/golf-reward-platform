'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function UserDashboard() {
  const [scores, setScores] = useState([]);
  const [scoreVal, setScoreVal] = useState('');
  const [date, setDate] = useState('');

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('scores')
        .select('*').eq('user_id', user.id)
        .order('entry_date', { ascending: false }).limit(5);
      setScores(data || []);
    }
  };

  const submitScore = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please log in to submit scores.");

    const { data: dup } = await supabase.from('scores')
      .select('id').eq('user_id', user.id).eq('entry_date', date);
    
    if (dup?.length > 0) return alert("A score for this date already exists!");

    const { error } = await supabase.from('scores').insert([{ 
      user_id: user.id, 
      score: parseInt(scoreVal), 
      entry_date: date 
    }]);

    if (!error) {
      setScoreVal('');
      setDate('');
      loadData();
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Dashboard</h1>
        <p className="text-slate-400 font-medium italic">Member Performance Tracking</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
          <h2 className="text-xl font-bold mb-6">Log New Round</h2>
          <form onSubmit={submitScore} className="space-y-6">
            <input type="number" min="1" max="45" value={scoreVal}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 transition" 
              placeholder="Stableford Points (1-45)" onChange={e => setScoreVal(e.target.value)} required />
            <input type="date" value={date}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 transition" 
              onChange={e => setDate(e.target.value)} required />
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg">Submit Entry</button>
          </form>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl overflow-hidden relative">
          <h2 className="text-xl font-bold mb-8">Rolling 5 Performance</h2>
          {scores.length === 0 ? <p className="text-slate-500 italic">No entries yet.</p> : (
            <div className="space-y-4 relative z-10">
              {scores.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-800 last:border-0">
                  <span className="text-slate-400 font-mono uppercase text-sm">{s.entry_date}</span>
                  <span className="text-3xl font-black text-indigo-400">{s.score} <span className="text-xs font-normal text-slate-600">PTS</span></span>
                </div>
              ))}
            </div>
          )}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}