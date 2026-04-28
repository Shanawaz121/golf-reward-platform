'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function UserDashboard() {
  const [scores, setScores] = useState([]);
  const [scoreVal, setScoreVal] = useState('');
  const [date, setDate] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // PRD: Only latest 5 scores retained logic
  const loadData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      setUserEmail(user.email);
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', user.id)
        .order('entry_date', { ascending: false })
        .limit(5); // Rolling 5 logic here

      if (!error) setScores(data || []);
    }
    setLoading(false);
  };

  const submitScore = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return alert("Please login first");

    // PRD: Score Range Check (1-45)
    const numericScore = parseInt(scoreVal);
    if (numericScore < 1 || numericScore > 45) {
      return alert("Score must be between 1 and 45 as per PRD.");
    }

    // PRD: No duplicate scores for same date
    const { data: dup } = await supabase
      .from('scores')
      .select('id')
      .eq('user_id', user.id)
      .eq('entry_date', date);
    
    if (dup?.length > 0) {
      return alert("A score for this date already exists! Duplicate entries are blocked.");
    }

    const { error } = await supabase.from('scores').insert([{ 
      user_id: user.id, 
      score: numericScore, 
      entry_date: date 
    }]);

    if (error) {
      alert("Error saving score: " + error.message);
    } else {
      setScoreVal('');
      setDate('');
      loadData(); // Refresh list to show rolling update
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 font-sans min-h-screen bg-slate-50">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Dashboard</h1>
          <p className="text-slate-500 font-medium">{userEmail}</p>
        </div>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold">
          Active Member
        </div>
      </header>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Score Input Card */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Add Performance Score</h2>
          <form onSubmit={submitScore} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Stableford Points (1-45)</label>
              <input 
                type="number" 
                min="1" 
                max="45" 
                value={scoreVal}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-indigo-500 transition" 
                placeholder="Enter Score" 
                onChange={e => setScoreVal(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Date of Play</label>
              <input 
                type="date" 
                value={date}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-indigo-500 transition" 
                onChange={e => setDate(e.target.value)} 
                required 
              />
            </div>
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
              Submit Score
            </button>
          </form>
        </div>

        {/* Rolling Scores Display */}
        <div className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Latest 5 Rolling Scores</h2>
            <p className="text-slate-400 text-sm mb-8">System automatically retains only your 5 most recent entries.</p>
            
            {loading ? (
              <p className="text-slate-500 italic">Updating scores...</p>
            ) : scores.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-500">No scores recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {scores.map((s, idx) => (
                  <div key={s.id || idx} className="flex justify-between items-center p-5 bg-slate-800/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Entry Date</span>
                      <span className="font-medium">{new Date(s.entry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-indigo-400">{s.score}</span>
                      <span className="ml-1 text-sm font-bold text-slate-500 uppercase">Pts</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Subtle decoration */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}