import { AmbienteEnum } from '../../shared/interfaces/ambiente.enum';
import { RegimeICMSEnum } from '../../shared/interfaces/regime-icms.enum';

interface EmpresaDadosFiscais {
  // Dados Cadastrais Básicos
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  regimeTributario: 'Simples Nacional' | 'Lucro Presumido' | 'Lucro Real';
  cnae: string;

  // Endereço

  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  municipio: string;
  codigoMunicipio: string; // Código IBGE
  uf: string; // Unidade Federativa
  cep: string;

  // Contatos

  email: string;
  telefone?: string;

  // Certificação Digital
  certificadoDigital?: {
    tipo: 'A1' | 'A3';
    arquivoCertificado?: string; // Caminho para o arquivo (A1) ou Serial (A3)
    senha: string;
  };

  // Informações Adicionais para NFSe

  aliquotaIssqn: number; // Percentual de ISS aplicado
  naturezaOperacao: string; // Tipo de serviço prestado
  tokenPrefeitura?: string; // Token ou senha da prefeitura

  // Informações Fiscais Específicas

  serieNota: string; // Série da nota
  ambiente: AmbienteEnum;
  regimeIcms: RegimeICMSEnum;
  // Dados Bancários (se aplicável)
  dadosBancarios?: {
    banco: string;
    agencia: string;
    conta: string;
    tipoConta: 'Corrente' | 'Poupanca';
  };
}

export class CompanyModel implements EmpresaDadosFiscais {
  razaoSocial: string = '';
  nomeFantasia?: string | undefined = '';
  cnpj: string = '';
  inscricaoEstadual?: string | undefined = '';
  inscricaoMunicipal?: string | undefined = '';
  regimeTributario: 'Simples Nacional' | 'Lucro Presumido' | 'Lucro Real' =
    'Simples Nacional';
  cnae: string = '';

  logradouro: string = '';
  numero: string = '';
  complemento?: string = '';
  bairro: string = '';
  municipio: string = '';
  codigoMunicipio: string = ''; // Código IBGE
  // Código IBGE
  uf: string = ''; // Unidade Federativa
  // Unidade Federativa
  cep: string = '';

  email: string = '';
  telefone?: string = '';

  /* certificadoDigital: {
    tipo: 'A1' | 'A3';
    arquivoCertificado?: string; // Caminho para o arquivo (A1) ou Serial (A3)
    // Caminho para o arquivo (A1) ou Serial (A3)
    senha: string;
  }; */

  aliquotaIssqn: number = 0; // Percentual de ISS aplicado
  // Percentual de ISS aplicado
  naturezaOperacao: string = ''; // Tipo de serviço prestado
  // Tipo de serviço prestado
  tokenPrefeitura?: string = ''; // Token ou senha da prefeitura

  serieNota: string = ''; // Série da nota

  ambiente: AmbienteEnum = AmbienteEnum.HOMOLOGACAO;
  regimeIcms: RegimeICMSEnum = RegimeICMSEnum.SIMPLES_NACIONAL;

  /* dadosBancarios?:
    | {
        banco: string;
        agencia: string;
        conta: string;
        tipoConta: 'Corrente' | 'Poupanca';
      }
    | undefined; */
}
