
import React, { useState } from 'react';
import { FileText, Upload, Plus, Trash2, Calculator, CheckCircle2 } from 'lucide-react';
import { BillData, BillItem } from '../types';
import { extractTextFromPdf } from '../services/pdfService';
import { parseBillText } from '../services/geminiService';
import { INITIAL_BILL_ITEMS } from '../constants';

interface BillWizardProps {
  onCalculate: (data: BillData) => void;
}

const BillWizard: React.FC<BillWizardProps> = ({ onCalculate }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [matinaKwh, setMatinaKwh] = useState(0);
  const [katerinaKwh, setKaterinaKwh] = useState(0);
  const [items, setItems] = useState<BillItem[]>(
    INITIAL_BILL_ITEMS.map(name => ({
      name,
      amount: 0,
      type: name.includes('ΔΤ') || name.includes('ΔΦ') ? 'sqm' : 
            name.includes('ΤΑΠ') ? 'katerina100' :
            name.includes('ΕΡΤ') ? 'equal50' : 'kwh'
    }))
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    try {
      const text = await extractTextFromPdf(file);
      const parsed = await parseBillText(text);
      if (parsed.items) {
        setItems(parsed.items);
      }
      setStep(2);
    } catch (err) {
      setError("Αποτυχία ανάλυσης του αρχείου. Δοκιμάστε χειροκίνητη εισαγωγή.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    setItems([...items, { name: 'Νέα Χρέωση', amount: 0, type: 'kwh' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updates: Partial<BillItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      id: crypto.randomUUID(),
      date: billDate,
      totalKwh: matinaKwh + katerinaKwh,
      matinaKwh,
      katerinaKwh,
      items,
      timestamp: Date.now()
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Wizard Header */}
      <div className="bg-slate-50 border-b p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-dei-blue text-white' : 'bg-green-500 text-white'}`}>
            {step === 1 ? '1' : <CheckCircle2 className="h-6 w-6" />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 uppercase">Βήμα 1</span>
            <span className="font-bold text-slate-800">Στοιχεία Λογαριασμού</span>
          </div>
        </div>
        <div className="w-12 h-[2px] bg-slate-200 hidden sm:block"></div>
        <div className="flex items-center space-x-4 opacity-50 sm:opacity-100">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-dei-blue text-white' : 'bg-slate-200 text-slate-400'}`}>
            2
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 uppercase">Βήμα 2</span>
            <span className="font-bold text-slate-800">Ανάλυση Χρεώσεων</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">Ημερομηνία Λογαριασμού</label>
                <input 
                  type="date" 
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-dei-blue focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">Συνολική Κατανάλωση (kWh)</label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold">Ματίνα</p>
                    <input 
                      type="number" 
                      placeholder="kWh"
                      value={matinaKwh || ''}
                      onChange={(e) => setMatinaKwh(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-dei-blue outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold">Κατερίνα</p>
                    <input 
                      type="number" 
                      placeholder="kWh"
                      value={katerinaKwh || ''}
                      onChange={(e) => setKaterinaKwh(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-dei-blue outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-dei-blue transition-colors group cursor-pointer">
              <input 
                type="file" 
                accept="application/pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dei-blue mb-4"></div>
                  <p className="text-slate-600 font-medium">Ανάλυση Λογαριασμού από το AI...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-slate-400 group-hover:text-dei-blue mb-4 transition-colors" />
                  <p className="text-lg font-bold text-slate-800">Ανεβάστε το PDF της ΔΕΗ</p>
                  <p className="text-slate-500 text-sm mt-1">Η Ματίνα-AI θα αναλάβει την αυτόματη συμπλήρωση</p>
                </div>
              )}
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center"><span>{error}</span></div>}

            <div className="flex justify-end">
              <button 
                onClick={() => setStep(2)}
                className="flex items-center space-x-2 bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-700 transition-colors"
              >
                <span>Χειροκίνητη Συνέχεια</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider border-b">
                    <th className="pb-4 font-bold">Χρέωση / Φόρος</th>
                    <th className="pb-4 font-bold">Ποσό (€)</th>
                    <th className="pb-4 font-bold">Τρόπος Επιμερισμού</th>
                    <th className="pb-4 font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={idx} className="group">
                      <td className="py-4">
                        <input 
                          type="text" 
                          value={item.name}
                          onChange={(e) => updateItem(idx, { name: e.target.value })}
                          className="w-full bg-transparent font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-dei-blue/30 rounded"
                        />
                      </td>
                      <td className="py-4">
                        <input 
                          type="number" 
                          step="0.01"
                          value={item.amount || ''}
                          onChange={(e) => updateItem(idx, { amount: Number(e.target.value) })}
                          className="w-24 px-2 py-1 border rounded focus:ring-2 focus:ring-dei-blue outline-none"
                        />
                      </td>
                      <td className="py-4">
                        <select 
                          value={item.type}
                          onChange={(e) => updateItem(idx, { type: e.target.value as any })}
                          className="text-sm border rounded px-2 py-1 bg-white focus:ring-2 focus:ring-dei-blue outline-none"
                        >
                          <option value="kwh">Βάσει kWh</option>
                          <option value="sqm">Βάσει τ.μ.</option>
                          <option value="katerina100">100% Κατερίνα</option>
                          <option value="equal50">50 / 50</option>
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
              <button 
                type="button"
                onClick={addItem}
                className="flex items-center space-x-2 text-dei-blue font-bold hover:text-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Προσθήκη Χρέωσης</span>
              </button>

              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800"
                >
                  Πίσω
                </button>
                <button 
                  type="submit"
                  className="flex items-center space-x-2 bg-dei-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 shadow-lg shadow-blue-200 transition-all"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Υπολογισμός</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BillWizard;
