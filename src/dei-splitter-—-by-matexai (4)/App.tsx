
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BillWizard from './components/BillWizard';
import Results from './components/Results';
import History from './components/History';
import TariffWatch from './components/TariffWatch';
import { BillData, CalculationResult } from './types';
import { calculateSplit } from './services/calcEngine';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('split');
  const [currentBill, setCurrentBill] = useState<BillData | null>(null);
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useState<BillData[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dei_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("History parse failed", e);
      }
    }
  }, []);

  const handleCalculate = (data: BillData) => {
    const res = calculateSplit(data);
    setCurrentBill(data);
    setCalculation(res);
    
    // Save to history
    const updatedHistory = [data, ...history.filter(h => h.id !== data.id)].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('dei_history', JSON.stringify(updatedHistory));
  };

  const handleHistorySelect = (data: BillData) => {
    const res = calculateSplit(data);
    setCurrentBill(data);
    setCalculation(res);
    setActiveTab('split');
  };

  const handleDeleteHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('dei_history', JSON.stringify(updated));
  };

  const renderContent = () => {
    if (activeTab === 'split') {
      if (calculation && currentBill) {
        return (
          <Results 
            result={calculation} 
            data={currentBill} 
            onBack={() => {
              setCalculation(null);
              setCurrentBill(null);
            }} 
          />
        );
      }
      return <BillWizard onCalculate={handleCalculate} />;
    }

    if (activeTab === 'history') {
      return (
        <History 
          history={history} 
          onSelect={handleHistorySelect} 
          onDelete={handleDeleteHistory}
          onClear={() => {
            setHistory([]);
            localStorage.removeItem('dei_history');
          }}
        />
      );
    }

    if (activeTab === 'tariffs') {
      return <TariffWatch />;
    }

    if (activeTab === 'about') {
      return (
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-6">Σχετικά με το DEI Splitter</h2>
          <div className="prose prose-slate">
            <p className="text-lg text-slate-600 leading-relaxed">
              Το <strong>DEI Splitter</strong> είναι ένα εξειδικευμένο εργαλείο που δημιουργήθηκε από την 
              <span className="text-dei-blue font-bold"> MatExAi</span> για να λύσει το πρόβλημα του δίκαιου επιμερισμού των 
              λογαριασμών ρεύματος μεταξύ συγκάτοικων.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl">
                <h4 className="font-bold text-slate-800 mb-2">Κανόνες Επιμερισμού</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• <strong>Ενέργεια/ΦΠΑ:</strong> Με βάση τις kWh.</li>
                  <li>• <strong>ΔΤ/ΔΦ:</strong> Με βάση τα τ.μ. (53 vs 207).</li>
                  <li>• <strong>ΤΑΠ:</strong> 100% Κατερίνα.</li>
                  <li>• <strong>ΕΡΤ:</strong> 50/50 split.</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h4 className="font-bold text-slate-800 mb-2">Τεχνολογία AI</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Χρησιμοποιούμε το μοντέλο <strong>Gemini 3 Flash</strong> για να αναλύουμε 
                  τα PDF της ΔΕΗ και να εξάγουμε αυτόματα τα ποσά, εξοικονομώντας σας χρόνο.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
