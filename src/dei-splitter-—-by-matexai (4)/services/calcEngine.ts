
import { BillData, CalculationResult, BillItem } from '../types';
import { SQM_MATINA, SQM_KATERINA, SQM_TOTAL } from '../constants';

export const calculateSplit = (data: BillData): CalculationResult => {
  let matinaTotal = 0;
  let katerinaTotal = 0;
  const breakdown: CalculationResult['breakdown'] = [];

  const totalKwh = data.matinaKwh + data.katerinaKwh;
  const matinaKwhRatio = totalKwh > 0 ? data.matinaKwh / totalKwh : 0.5;
  const katerinaKwhRatio = totalKwh > 0 ? data.katerinaKwh / totalKwh : 0.5;

  data.items.forEach((item) => {
    let m = 0;
    let k = 0;

    switch (item.type) {
      case 'kwh':
        m = item.amount * matinaKwhRatio;
        k = item.amount * katerinaKwhRatio;
        break;
      case 'sqm':
        m = (SQM_MATINA / SQM_TOTAL) * item.amount;
        k = (SQM_KATERINA / SQM_TOTAL) * item.amount;
        break;
      case 'katerina100':
        m = 0;
        k = item.amount;
        break;
      case 'equal50':
        m = item.amount / 2;
        k = item.amount / 2;
        break;
    }

    matinaTotal += m;
    katerinaTotal += k;
    breakdown.push({
      item: item.name,
      matina: m,
      katerina: k
    });
  });

  return {
    matinaTotal: Number(matinaTotal.toFixed(2)),
    katerinaTotal: Number(katerinaTotal.toFixed(2)),
    totalBill: Number((matinaTotal + katerinaTotal).toFixed(2)),
    breakdown
  };
};
