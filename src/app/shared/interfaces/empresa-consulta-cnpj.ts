export interface EmpresaConsultaCnpj {
  abertura: string;
  situacao: string;
  tipo: string;
  nome: string;
  fantasia: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: AtividadeConsultaCnpj[];
  atividades_secundarias: AtividadeConsultaCnpj[];
  qsa: SocioConsultaCnpj[];
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  telefone: string;
  data_situacao: string;
  cnpj: string;
  ultima_atualizacao: string;
  status: string;
  complemento: string;
  email: string;
  efr: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  capital_social: string;
  simples: SimplesConsultaCnpj;
  simei: SimplesConsultaCnpj;
  extra: Record<string, unknown>;
  billing: BillingConsultaCnpj;
}

export interface AtividadeConsultaCnpj {
  code: string;
  text: string;
}

export interface SocioConsultaCnpj {
  nome: string;
  qual: string;
  nome_rep_legal?: string;
  qual_rep_legal?: string;
}

export interface SimplesConsultaCnpj {
  optante: boolean;
  data_opcao: string | null;
  data_exclusao: string | null;
  ultima_atualizacao: string;
}

export interface BillingConsultaCnpj {
  free: boolean;
  database: boolean;
}
