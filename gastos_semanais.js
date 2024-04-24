let readline = require('readline');

// criando uma interface de leitura
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// definindo um objeto para armazenar os gastos diários
let gastos = {
  segunda: 0,
  terca: 0,
  quarta: 0,
  quinta: 0,
  sexta: 0,
  sabado: 0,
  domingo: 0
};

// função para inserir os gastos
function inserirGastos(dia) {
  rl.question(`Insira os gastos para ${dia}: `, function(valor) {
    valor = parseFloat(valor);
    if (!isNaN(valor)) {
      gastos[dia.toLowerCase()] = valor;
      console.log(`Gastos para ${dia} registrados com sucesso.`);
      let proximoDia = proximoDiaSemana(dia);
      if (proximoDia) {
        inserirGastos(proximoDia);
      } else {
        // calcular e exibir o total e a média de gastos
        calcularTotalDeGastos();
        calcularMediaDiariaDeGastos();
        rl.close();
      }
    } else {
      console.log(`Valor inválido. Por favor, insira um número válido.`);
      inserirGastos(dia);
    }
  });
}

// calcular os próximos dias da semana
function proximoDiaSemana(dia) {
  switch (dia) {
    case 'segunda':
      return 'terca';
    case 'terca':
      return 'quarta';
    case 'quarta':
      return 'quinta';
    case 'quinta':
      return 'sexta';
    case 'sexta':
      return 'sabado';
    case 'sabado':
      return 'domingo';
    default:
      return null;
  }
}
// calcular e exibir o total de gastos da semana
function calcularTotalDeGastos() {
  let total = 0;
  for (let dia in gastos) {
    total += gastos[dia];
  }
  console.log(`O total de gastos da semana é R$ ${total.toFixed(2)}`);
}
// calcular e exibir a média diária de gastos
function calcularMediaDiariaDeGastos() {
  let total = 0;
  let diasComGastos = 0;
  for (let dia in gastos) {
    total += gastos[dia];
    if (gastos[dia] > 0) {
      diasComGastos++;
    }
  }
  let mediaDiaria = total / diasComGastos;
  console.log(`A média diária de gastos é R$ ${mediaDiaria.toFixed(2)}`);
}

// iniciar o programa
inserirGastos('segunda'); // Começar com a segunda-feira
