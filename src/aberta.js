const {
  chain,
  add,
  divide,
  multiply,
} = require('mathjs');

function funcaoGrauZero (funcao, limiteInferior, limiteSuperior) {
  return chain(limiteSuperior)
    .subtract(limiteInferior)
    .multiply(funcao(divide(
      add(limiteInferior, limiteSuperior),
      2.0
    )))
    .done();
}

function funcaoGrauUm (funcao, limiteInferior, limiteSuperior) {
  const h = chain(limiteSuperior)
    .subtract(limiteInferior)
    .divide(3.0)
    .done();
  return chain(limiteSuperior)
    .subtract(limiteInferior)
    .divide(2.0)
    .multiply(add(
      funcao(add(limiteInferior, h)),
      funcao(chain(limiteInferior)
        .add(2)
        .multiply(h)
        .done())
    ))
    .done();
}

function funcaoGrauDois (funcao, limiteInferior, limiteSuperior) {
  const h = chain(limiteSuperior)
    .subtract(limiteInferior)
    .divide(4.0)
    .done();
  return multiply(
    chain(4)
      .multiply(h)
      .divide(3.0)
      .done(),
    chain(2)
      .multiply(funcao(add(limiteInferior, h)))
      .subtract(funcao(add(
        limiteInferior,
        multiply(2.0, h)
      )))
      .add(multiply(
        2,
        funcao(add(
          limiteInferior,
          multiply(3.0, h)
        ))
      ))
      .done()
  );
}

function funcaoGrauTres (funcao, limiteInferior, limiteSuperior) {
  const h = chain(limiteSuperior)
    .subtract(limiteInferior)
    .divide(5.0)
    .done();
  return multiply(
    chain(h)
      .multiply(5.0)
      .divide(24.0)
      .done(),
    add(
      multiply(
        11,
        funcao(add(limiteInferior, h))
      ),
      funcao(add(
        limiteInferior,
        multiply(2.0, h)
      )),
      funcao(add(
        limiteInferior,
        multiply(3.0, h)
      )),
      multiply(
        11,
        funcao(add(
          limiteInferior,
          multiply(4.0, h)
        ))
      )
    )
  );
}

function funcaoGrauQuatro (funcao, limiteInferior, limiteSuperior) {
  const h = (limiteSuperior - limiteInferior) / 6.0;
  return (h / 30) * (
    99 * funcao(limiteInferior + h)
    - 126 * funcao(limiteInferior + 2.0 * h)
    + 234 * funcao(limiteInferior + 3.0 * h)
    - 126 * funcao(limiteInferior + 4.0 * h)
    + 99 * funcao(limiteInferior + 5.0 * h)
  );
}

module.exports = {
  funcaoGrauZero,
  funcaoGrauUm,
  funcaoGrauDois,
  funcaoGrauTres,
  funcaoGrauQuatro,
};
