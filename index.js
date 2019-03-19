/* eslint-disable no-param-reassign, no-shadow */
const math = require('mathjs');
const Promise = require('bluebird');
const readlineSync = require('readline-sync');
const fechada = require('./fechada');

const input = {};

const FA = {
  FILOSOFIA_FECHADA: 0,
  FILOSOFIA_ABERTA: 1,
};

function askForInputs (input) {
  function askAndReturnFilosofia () {
    const filosofias = ['Fechada', 'Aberta'];
    return readlineSync.keyInSelect(filosofias, 'Qual filosofia? ');
  }

  function askAndReturnGrau (filosofia) {
    const graus = filosofia === FA.FILOSOFIA_FECHADA ? [1, 2, 3, 4] : [0, 1, 2, 3, 4];
    return readlineSync.keyInSelect(graus, 'Qual grau? ');
  }

  input.limiteInferior = readlineSync.questionFloat('Qual é o limite inferior? ');
  input.limiteSuperior = readlineSync.questionFloat('Qual é o limite superior? ');
  input.fa = askAndReturnFilosofia();
  input.grau = askAndReturnGrau(input.fa);
  input.tolerancia = readlineSync.questionFloat('Qual é a tolerância? ');
  input.funcao = x => x * x;

  return input;
}

/** Função para integração
    @name functionToIntegrate
    @function
    @param {Number} value Valor a ser calculado
*/

/**
 * Calcula a integral
 * @param {Object} input Input do usuário
 * @param {Number} input.limiteInferior Limite inferior da integral
 * @param {Number} input.limiteSuperior Limite superior da integral
 * @param {Number} input.fa Filosofia
 * @param {Number} input.grau Grau da filosofia
 * @param {Number} input.tolerancia Tolerância do erro
 * @param {functionToIntegrate} input.funcao
 */
function integrate (input) {
  let particao = 1;
  let integralAntiga = 0;
  while (true) {
    const deltax = (input.limiteSuperior - input.limiteInferior) / particao;
    let integralAtual = 0;
    for (let i = 0; i < particao; i += 1) {
      const xInicial = input.limiteInferior + (i * deltax);
      const xFinal = xInicial + deltax;
      switch (input.fa) {
        case FA.FILOSOFIA_FECHADA:
          switch (input.grau + 1) {
            case 1:
              integralAtual += fechada.funcaoGrauUm(input.funcao, xInicial, xFinal);
              break;
            case 2:
              break;
            default:
              break;
          }
          break;
        case FA.FILOSOFIA_ABERTA:
          break;
        default:
          break;
      }
    }
    const erro = math.abs(integralAtual - integralAntiga);
    if (erro <= input.tolerancia) {
      const resultado = {
        resultado: integralAtual,
        erro,
      };
      return resultado;
    }

    integralAntiga = integralAtual;
    particao *= 2;
  }
}

/**
 * Imprime o resultado
 * @param {Object} resultado
 * @param {Number} resultado.resultado Resultado da integral
 * @param {Number} resultado.erro Último erro obtido
 */
function finish (resultado) {
  console.log('\n\n');
  console.log('Resultado: ', resultado.resultado);
  console.log('Erro: ', resultado.erro);
}

Promise.resolve(input)
  .then(askForInputs)
  .then(integrate)
  .then(finish);
