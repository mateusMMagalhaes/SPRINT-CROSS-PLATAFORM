// LeafSense - Interfaces TypeScript

export interface Manutencao {
  data: string;
  tipo: string;
  equipe: string;
}

export interface Trecho {
  id: string;
  rodovia: string;
  kmInicio: number;
  kmFim: number;
  status: 'coletado' | 'pendente' | 'critico';
  risco: 'baixo' | 'medio' | 'alto';
  fotosColetadas: number;
  fotosTotal: number;
  latitude: number;
  longitude: number;
  ultimaManutencao: string;
  historicoManutencoes: Manutencao[];
  alturaVegetacao?: number; // em cm
}

export interface Operador {
  matricula: string;
  nome: string;
  viatura: string;
}

export type RootStackParamList = {
  Login: undefined;
  Trechos: { operador: Operador };
  TrechoDetail: { trecho: Trecho; operador: Operador };
};
