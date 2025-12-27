
import React, { useState, useEffect } from 'react';
import { Activity, Search, ExternalLink, RefreshCcw } from 'lucide-react';
import { fetchLatestTariffs } from '../services/geminiService';

const TariffWatch: React.FC = () => {
  const [data, setData] = useState<{ text: string; sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTariffs = async () => {
    setLoading(true);
    try {
      const res = await fetchLatestTariffs();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTariffs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-dei-red p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Tariff Watch</h2>
          </div>
          <button 
            onClick={loadTariffs}
            disabled={loading}
            className="flex items-center space-x-2 text-slate-500 hover:text-dei-blue transition-colors disabled:opacity-50"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-bold">Ανανέωση</span>
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
          </div>
        ) : data ? (
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
              {data.text}
            </div>
            
            {data.sources.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-50">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Πηγές & Σύνδεσμοι</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.sources.map((chunk, idx) => (
                    chunk.web && (
                      <a 
                        key={idx}
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <span className="truncate mr-2">{chunk.web.title || chunk.web.uri}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-500 italic">Δεν βρέθηκαν δεδομένα. Δοκιμάστε ξανά σε λίγο.</p>
        )}
      </div>

      <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Θέλετε να αλλάξετε πάροχο;</h3>
          <p className="text-blue-100 text-sm">Το MatExAi μπορεί να αναλύσει την κατανάλωσή σας και να προτείνει το οικονομικότερο πρόγραμμα.</p>
        </div>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
          Σύγκριση Προγραμμάτων
        </button>
      </div>
    </div>
  );
};

export default TariffWatch;
