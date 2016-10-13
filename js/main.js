// Sistema Original
// a  + 3b + c  = 2
// 5a + 2b + 2c = 3
// 0  + 6b + 8c = -6

// Sistema após Teste de Convergência
// 3b + a  + c   = 2
// 2b + 5a + 2c = 3
// 6b + 0  + 8c  = -6

// eqB  = (-a - c + 2) / 3,
// eqA  = (-2 * b - 2 * c + 3) / 5,
// eqC  = (-6 * b - 6) / 8;

var deltaSeidel = 100, //Gambeta
    precisao    = 0.05,
    iSeidel     = math.matrix(), //Tabela de iterações.
    original    = math.matrix(),
    matriz      = math.matrix(),
    auxiliar    = [],
    beta        = [],
    tentativa,
    recomecar = false,
    eqA, eqB, eqC, //Equações com variáveis isoladas.
    linha, coluna,
    html = '',
    $tabela = $('.tabela-seidel tbody');

$(document).on('ready', function(){
  testeConvergencia();
  gaussSeidel();
});

function copiaOriginal() {
  //Definição da matriz original.
  original[0] = [1, 3, 1, 2];
  original[1] = [5, 2, 2, 3];
  original[2] = [0, 6, 8, -6];

  // original[0] = [3, 1, 1, 2];
  // original[1] = [2, 5, 2, 3];
  // original[2] = [6, 0, 8, -6];

  //Matriz copia a original para poder realizar alterações.
  for(i = 0; i < 3; i++) { matriz[i] = original[i].slice(0, 4); }
}

function printaVetor(teste) {
  for(linha = 0; linha < 3; linha++) {
    console.log(teste[linha]);
  }
}

function printaMatriz(teste) {
  for(linha = 0; linha < 3; linha++) {
    for(coluna = 0; coluna < 4; coluna++) {
      console.log(teste[linha][coluna]);
    }
    console.log('---');
  }
}

function testeConvergencia() {

  copiaOriginal();
  printaMatriz(matriz);

  //Zera beta.
  for(i = 0; i < 3; i++) { beta[i] = 0; }

  tentativa = 1;

  for(linha = 0; linha < 3; linha++) {
    //Se a matriz tiver sido modificada, o processo recomeça.
    if(recomecar) { linha = 0; }
    recomecar = false;

    //Cálculo de beta da linha em questão.
    for(coluna = 0; coluna < 3; coluna++) {
      if(coluna < linha) {
        beta[linha] += Math.abs(matriz[linha][coluna] * beta[coluna]);
      } else if (coluna > linha) {
        beta[linha] += Math.abs(matriz[linha][coluna]);
      }
    }

    beta[linha] /= Math.abs(matriz[linha][linha]);

    if(beta[linha] >= 1) {
      // console.log(beta);

      console.log('Tentativa: ' + tentativa);

      if(tentativa == 1) {
        auxiliar  = matriz[0].slice(0, 4);
        matriz[0] = matriz[1].slice(0, 4);
        matriz[1] = auxiliar.slice(0, 4);
      } else if(tentativa == 2) {
        copiaOriginal();

        auxiliar  = matriz[0].slice(0, 4);
        matriz[0] = matriz[2].slice(0, 4);
        matriz[2] = auxiliar.slice(0, 4);
      } else if(tentativa == 3) {
        copiaOriginal();

        auxiliar  = matriz[1].slice(0, 4);
        matriz[1] = matriz[2].slice(0, 4);
        matriz[2] = auxiliar.slice(0, 4);
      }else if(tentativa == 4) {
        copiaOriginal();

        for(i = 0; i < 3; i++) {
          matriz[i] = (matriz[i].slice(0, 2).reverse()).concat(matriz[i].slice(2, 4));
        }
      } else if(tentativa == 5) {
        break; //Gambiarra pra não explodir o browser. Tira.
      }

      printaMatriz(matriz);

      recomecar = true;
      tentativa++;
      console.log(beta);
    }
  }
}

function gaussSeidel() {
  //Inicia tabela.
  iSeidel[0] = [0, 0, 0, 0, 'x'];

  //Iterações: calcula a, b, c e delta até que delta seja menor que a precisão (0.05).
  for(var i = 1; deltaSeidel >= precisao; i++) {
    //Cálculos de a, b, e c.
    eqB = (-1 * iSeidel[i-1][2] -1 * iSeidel[i-1][3] + 2) / 3;
    eqA = (-2 * eqB - 2 * iSeidel[i-1][3] + 3) / 5;
    eqC = (-6 * eqB - 6) / 8;

    //Cálculo de delta.
    deltaSeidel = math.sqrt(math.pow((eqB - iSeidel[i-1][1]), 2) + math.pow((eqA - iSeidel[i-1][2]), 2) + math.pow((eqC - iSeidel[i-1][3]), 2));

    iSeidel[i] = [i, eqB, eqA, eqC, deltaSeidel];

    html += '<tr>';
  	html += '<td>' + i + '</td><td>' + eqB.toFixed(4) + '</td><td>' + eqA.toFixed(4) + '</td><td>' + eqC.toFixed(4) + '</td><td>' + deltaSeidel.toFixed(4) + '</td>';
  	html += '</tr>';
  }

  $tabela.append(html);
  //console.log(iSeidel);
}
