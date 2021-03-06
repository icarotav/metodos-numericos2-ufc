function funcaoGrauZero (funcao, limiteInferior, limiteSuperior) {
  const h = (limiteInferior + limiteSuperior) / 2.0;
  return (limiteSuperior - limiteInferior) * funcao(h);
}

function funcaoGrauUm (funcao, limiteInferior, limiteSuperior) {
  const h = (limiteSuperior - limiteInferior) / 3.0;
  return (limiteSuperior - limiteInferior) / 2.0 * (
    funcao(limiteInferior + h)
    + funcao(limiteInferior + 2.0 * h)
  );
}

function funcaoGrauDois (funcao, limiteInferior, limiteSuperior) {
  const h = (limiteSuperior - limiteInferior) / 4.0;
  return (limiteSuperior - limiteInferior) / 3.0 * (
    2.0 * funcao(limiteInferior + h)
    - funcao(limiteInferior + 2.0 * h)
    + 2.0 * funcao(limiteInferior + 3.0 * h)
  );
}

function funcaoGrauTres (funcao, limiteInferior, limiteSuperior) {
  const h = (limiteSuperior - limiteInferior) / 5.0;
  return (limiteSuperior - limiteInferior) / 24.0 * (
    11 * funcao(limiteInferior + h) + funcao(limiteInferior + 2.0 * h)
    + funcao(limiteInferior + 3.0 * h) + 11 * funcao(limiteInferior + 4.0 * h)
  );
}

function funcaoGrauQuatro (funcao, limiteInferior, limiteSuperior) {
  const h = (limiteSuperior - limiteInferior) / 6.0;
  return (limiteSuperior - limiteInferior) / 20 * (
    11 * funcao(limiteInferior + h)
    - 14 * funcao(limiteInferior + 2.0 * h)
    + 26 * funcao(limiteInferior + 3.0 * h)
    - 14 * funcao(limiteInferior + 4.0 * h)
    + 11 * funcao(limiteInferior + 5.0 * h)
  );
}

module.exports = {
  funcaoGrauZero,
  funcaoGrauUm,
  funcaoGrauDois,
  funcaoGrauTres,
  funcaoGrauQuatro,
};
