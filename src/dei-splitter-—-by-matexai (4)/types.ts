
export interface BillItem {
  name: string;
  amount: number;
  type: 'kwh' | 'sqm' | 'katerina100' | 'equal50';
}

export interface CalculationResult {
  matinaTotal: number;
  katerinaTotal: number;
  totalBill: number;
  breakdown: {
    item: string;
    matina: number;
    katerina: number;
  }[];
}

export interface BillData {
  id: string;
  date: string;
  totalKwh: number;
  matinaKwh: number;
  katerinaKwh: number;
  items: BillItem[];
  timestamp: number;
}

export interface Tariff {
  provider: string;
  rate: number;
  validFrom: string;
}
