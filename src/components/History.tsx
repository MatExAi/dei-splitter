
import React from 'react';
import { History as HistoryIcon, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { BillData } from '../types';

interface HistoryProps {
  history: BillData[];
  onSelect: (data: BillData) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect, onDelete, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-dashed border-slate-200 text-center">
        <HistoryIcon className="h-16 w-16 text-slate-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Κανένα Ιστορικό</h2>
        <p className="text-slate-500">Οι υπολογισμοί σας θα εμφανίζονται εδώ για εύκολη πρόσβαση.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
          <HistoryIcon className="h-6 w-6 text-dei-blue" />
          <span>Πρόσφατοι Επιμερισμοί</span>
        </h2>
        <button 
          onClick={onClear}
          className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
        >
          Εκκαθάριση όλων
        </button>
      </div>

      <div className="grid gap-4">
        {history.map((item) => (
          <div 
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex items-center justify-between hover:border-dei-blue transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{new Date(item.date).toLocaleDateString('el-GR', { month: 'long', year: 'numeric' })}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-tighter">
                  Σύνολο: {item.items.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}€ • {item.totalKwh} kWh
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => onDelete(item.id)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button 
                onClick={() => onSelect(item)}
                className="flex items-center space-x-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-bold group-hover:bg-dei-blue group-hover:text-white transition-all"
              >
                <span>Προβολή</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
