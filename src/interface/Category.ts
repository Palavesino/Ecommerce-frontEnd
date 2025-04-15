export interface Category {
  id: string;
  denomination: string;
  availability: boolean;
  type: string;
  categoryFatherId?: string;
  categoryFatherDenomination: string;
}
