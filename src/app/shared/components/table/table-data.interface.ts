export interface CondicaoTable {
  type: string;
  vlrCondicao: number;
  resTrue: string;
  resFalse: string;
}

export interface TypeColumns {
  title: string;
  name: string;
  type?: string;
}

export interface TypeButtons {
  id: string;
  icon: string;
  label?: string;
  disabled?: boolean;
  showLabelActions?: boolean;
}
