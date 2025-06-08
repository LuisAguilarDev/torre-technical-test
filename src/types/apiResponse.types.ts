export interface HistoryResponse {
  ardaId: number;
  ggId: string;
  name: string;
  comparableName: string;
  username: string;
  professionalHeadline: null | string;
  imageUrl: null | string;
  completion: number;
  grammar: number;
  weight: number;
  verified: boolean;
  totalStrength: number;
  pageRank: number;
  relationDegree: number;
  isSearchable: boolean;
  contact: boolean;
}
