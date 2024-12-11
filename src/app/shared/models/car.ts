export default class Car {
  id: number;
  idCustomer: number;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  chassi: string;
  nroMotor: string;
  placa: string;
  tipoCombustivel: string;
  idProprietario: number | null;

  constructor() {
    this.id = 0;
    this.idCustomer = 0;
    this.marca = '';
    this.placa = '';
    this.modelo = '';
    this.ano = '';
    this.cor = '';
    this.chassi = '';
    this.nroMotor = '';
    this.tipoCombustivel = '';
    this.idProprietario = null;
  }
}

// Informações básicas:
// Placa (obrigatório)
// Marca (ex: Ford, Toyota)
// Modelo (ex: Corolla, Fiesta)
// Ano de fabricação
// Cor do veículo
// Número do chassi (para identificação única)
// Número do motor (opcional, mas útil)
// Informações técnicas:
// Tipo de combustível (ex: Gasolina, Diesel, Elétrico)
// Cilindrada do motor (ex: 1.6, 2.0)
// Quilometragem atual
// Tipo de câmbio (Manual ou Automático)
// Dados do proprietário:
// Nome do proprietário
// CPF/CNPJ do proprietário
// Telefone de contato
// Endereço
// Histórico e Observações:
// Data de cadastro
// Histórico de manutenções anteriores
// Observações gerais (para detalhes importantes ou problemas recorrentes)
// Detalhes opcionais:
// Seguradora (em caso de veículos assegurados)
// Data da última manutenção
// Número do documento RENAVAM (Registro Nacional de Veículos Automotores)
