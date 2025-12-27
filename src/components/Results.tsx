
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Download, Share2, FileSpreadsheet, FileJson, ArrowLeft } from 'lucide-react';
import { CalculationResult, BillData } from '../types';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface ResultsProps {
  result: CalculationResult;
  data: BillData;
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, data, onBack }) => {
  const chartData = [
    { name: 'Ματίνα', value: result.matinaTotal },
    { name: 'Κατερίνα', value: result.katerinaTotal },
  ];

  const COLORS = ['#00529B', '#E30613'];

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('DEI Splitter Report — by MatExAi', 20, 20);
    doc.setFontSize(14);
    doc.text(`Ημερομηνία: ${data.date}`, 20, 30);
    doc.text(`Σύνολο: ${result.totalBill.toFixed(2)} €`, 20, 40);
    doc.line(20, 45, 190, 45);
    
    doc.text(`Μερίδιο Ματίνας: ${result.matinaTotal.toFixed(2)} €`, 20, 55);
    doc.text(`Μερίδιο Κατερίνας: ${result.katerinaTotal.toFixed(2)} €`, 20, 65);
    
    doc.setFontSize(10);
    let y = 80;
    result.breakdown.forEach(item => {
      doc.text(`${item.item}: M: ${item.matina.toFixed(2)}€, K: ${item.katerina.toFixed(2)}€`, 20, y);
      y += 7;
    });

    doc.save(`DEI_Split_${data.date}.pdf`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(result.breakdown);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Split");
    XLSX.writeFile(wb, `DEI_Split_${data.date}.xlsx`);
  };

  return (
    <div className="space-y-8 animate-in zoom-in duration-500">
      <button onClick={onBack} className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Νέος Υπολογισμός</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Αποτελέσματα Επιμερισμού</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <span className="text-dei-blue text-sm font-bold uppercase tracking-widest">Ματίνα</span>
                <div className="text-4xl font-black text-slate-900 mt-2">{result.matinaTotal.toFixed(2)}€</div>
                <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-dei-blue" 
                    style={{ width: `${(result.matinaTotal / result.totalBill) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <span className="text-dei-red text-sm font-bold uppercase tracking-widest">Κατερίνα</span>
                <div className="text-4xl font-black text-slate-900 mt-2">{result.katerinaTotal.toFixed(2)}€</div>
                <div className="mt-4 h-2 bg-red-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-dei-red" 
                    style={{ width: `${(result.katerinaTotal / result.totalBill) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Αναλυτική Κατανομή</h3>
              <div className="space-y-4">
                {result.breakdown.map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="text-slate-700 font-medium">{row.item}</span>
                    <div className="flex space-x-8">
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Ματίνα</span>
                        <span className="text-slate-900 font-bold">{row.matina.toFixed(2)}€</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Κατερίνα</span>
                        <span className="text-slate-900 font-bold">{row.katerina.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Οπτικοποίηση</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)}€`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold">Εξαγωγή & Κοινή Χρήση</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={exportPdf} className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group">
                <Download className="h-6 w-6 mb-2 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">PDF Report</span>
              </button>
              <button onClick={exportExcel} className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group">
                <FileSpreadsheet className="h-6 w-6 mb-2 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Excel .xlsx</span>
              </button>
              <button onClick={() => alert('Coming soon: Image Export')} className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group">
                <Share2 className="h-6 w-6 mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Mobile Image</span>
              </button>
              <button onClick={() => {
                const blob = new Blob([JSON.stringify({data, result}, null, 2)], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `split_${data.date}.json`;
                a.click();
              }} className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all group">
                <FileJson className="h-6 w-6 mb-2 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Raw JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
