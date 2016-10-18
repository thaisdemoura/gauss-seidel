// Sistema Original
// a  + 3b + c  = 2
// 5a + 2b + 2c = 3
// 0  + 6b + 8c = -6

// Sistema após Teste de Convergência
// 5a + 2b + 2c = 3
// a  + 3b + c  = 2
// 0  + 6b + 8c = -6

// eqA = (3 - 2 * b - 2 * c) / 5,
// eqB = (2 - a - c) / 3
// eqC = (-6 - 6 * b) / 8

var deltaSeidel = 100,
    precisao    = 0.05,
    iSeidel     = math.matrix(),
    original    = math.matrix(),
    matriz      = math.matrix(),
    auxiliar    = math.matrix(),
    beta        = [],
    tentativa,
    recomecar = false,
    eqA, eqB, eqC,
    linha, coluna,
    htmlSistema = '',
    htmlTabela = '',
    $sistema = $('.sistema');
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

  //Matriz copia a original para poder realizar alterações.
  for(var i = 0; i < 3; i++) { matriz[i] = original[i].slice(0, 4); }
}

function testeConvergencia() {
  //Inicia com a matriz original.
  copiaOriginal();

  //Inicia variáveis.
  for(var i = 0; i < 3; i++) { beta[i] = 0; }
  tentativa = 1;

  htmlSistema += '<div class="sistema original">';
  htmlSistema += '<h1>Sistema original</h1>';
  htmlSistema += '<span class="cinza">Tentativa ' + tentativa + '</span>';
  htmlSistema += '<p>1a + 3b + 1c = 2</p>';
  htmlSistema += '<p>5a + 2b + 2c = 3</p>';
  htmlSistema += '<p>0a + 6b + 8c = -6</p>';

  for(var linha = 0; linha < 3; linha++) {
    //Se a matriz tiver sido modificada, o processo recomeça.
    if(recomecar) { linha = 0; for(var i = 0; i < 3; i++) { beta[i] = 0; } }
    recomecar = false;

    //Cálculo de beta da linha em questão.
    for(var coluna = 0; coluna < 3; coluna++) {
      if(coluna < linha) {
        beta[linha] += Math.abs(matriz[linha][coluna] * beta[coluna]);
      } else if (coluna > linha) {
        beta[linha] += Math.abs(matriz[linha][coluna]);
      }
    }

    if(Math.abs(matriz[linha][linha]) != 0) {
      beta[linha] /= Math.abs(matriz[linha][linha]);
    }

    if(tentativa == 1) {
      htmlSistema += '<p class="beta">Beta</p>';
      htmlSistema += '<p class="cinza">Equação 1: ' + beta[0] + '</p>';
      htmlSistema += '<p class="cinza">Equação 2: ' + beta[1] + '</p>';
      htmlSistema += '<p class="cinza">Equação 3: ' + beta[2] + '</p>';
      htmlSistema += '</div>';
    }

    if(beta[linha] >= 1) {
      tentativa++;

      if(tentativa == 2) {
        //Inverte linhas 1 e 2.
        auxiliar  = matriz[0].slice(0, 4);
        matriz[0] = matriz[1].slice(0, 4);
        matriz[1] = auxiliar.slice(0, 4);
      } else if(tentativa == 3) {
        copiaOriginal();

        //Inverte linhas 1 e 3.
        auxiliar  = matriz[0].slice(0, 4);
        matriz[0] = matriz[2].slice(0, 4);
        matriz[2] = auxiliar.slice(0, 4);
      } else if(tentativa == 4) {
        copiaOriginal();

        //Inverte linhas 2 e 3.
        auxiliar  = matriz[1].slice(0, 4);
        matriz[1] = matriz[2].slice(0, 4);
        matriz[2] = auxiliar.slice(0, 4);
      }else if(tentativa == 5) {
        copiaOriginal();

        //Inverte as colunas 1 e 2.
        for(var i = 0; i < 3; i++) {
          matriz[i] = (matriz[i].slice(0, 2).reverse()).concat(matriz[i].slice(2, 4));
        }
      } else if(tentativa == 6) {
        copiaOriginal();

        //Inverte as colunas 2 e 3.
        for(var i = 0; i < 3; i++) {
          matriz[i] = matriz[i].slice(0, 1).concat((matriz[i].slice(1, 3).reverse())).concat(matriz[i].slice(3, 4));
        }

      } else if(tentativa == 7) {
        copiaOriginal();

        //Inverte as colunas 1 e 3.
        for(var i = 0; i < 3; i++) {
          auxiliar[i] = matriz[i].slice(2, 3).concat(matriz[i].slice(1, 2)).concat(matriz[i].slice(0, 1)).concat(matriz[i].slice(3, 4));

          matriz[i] = auxiliar[i].slice(0, 4);
        }
      } else {
        break;
      }

      recomecar = true;
    }
  }

  //Imprime o sistema que passou no teste de convergência.
  if((beta[0] < 1) && (beta[1] < 1) && (beta[2] < 1)) {
    htmlSistema += '<div class="sistema teste">';
    htmlSistema += '<h1>Após teste</h1>';
    htmlSistema += '<span class="cinza">Tentativa ' + tentativa + '</span>';
    htmlSistema += '<p>' + matriz[0][0] + 'a + ' + matriz[0][1] + 'b + ' + matriz[0][2] + 'c = ' + matriz[0][3] + '</p>';
    htmlSistema += '<p>' + matriz[1][0] + 'a  + ' + matriz[1][1] + 'b + ' + matriz[1][2] + 'c  = ' + matriz[1][3] + '</p>';
    htmlSistema += '<p>' + matriz[2][0] + 'a  + ' + matriz[2][1] + 'b + ' + matriz[2][2] + 'c = ' + matriz[2][3] + '</p>';

    htmlSistema += '<p class="beta">Beta</p>';
    htmlSistema += '<p class="cinza">Equação 1: ' + beta[0].toFixed(4) + '</p>';
    htmlSistema += '<p class="cinza">Equação 2: ' + beta[1].toFixed(4) + '</p>';
    htmlSistema += '<p class="cinza">Equação 3: ' + beta[2].toFixed(4) + '</p>';
    htmlSistema += '</div>';
  }

  $sistema.append(htmlSistema);
}

function gaussSeidel() {
  //Inicia tabela.
  iSeidel[0] = [0, 0, 0, 0, 'x'];

  //Iterações: calcula a, b, c e delta até que delta seja menor que a precisão (0.05).
  for(var i = 1; deltaSeidel >= precisao; i++) {
    //Cálculos de a, b, e c.
    eqA = (3 - 2 * iSeidel[i-1][2] - 2 * iSeidel[i-1][3]) / 5;
    eqB = (2 - eqA - iSeidel[i-1][3]) / 3;
    eqC = (-6 - 6 * eqB) / 8;

    //Cálculo de delta.
    deltaSeidel = math.sqrt(math.pow((eqA - iSeidel[i-1][1]), 2) + math.pow((eqB - iSeidel[i-1][2]), 2) + math.pow((eqC - iSeidel[i-1][3]), 2));

    iSeidel[i] = [i, eqA, eqB, eqC, deltaSeidel];

    htmlTabela += '<tr>';
  	htmlTabela += '<td>' + i + '</td><td>' + eqA.toFixed(4) + '</td><td>' + eqB.toFixed(4) + '</td><td>' + eqC.toFixed(4) + '</td><td>' + deltaSeidel.toFixed(4) + '</td>';
  	htmlTabela += '</tr>';
  }

  $tabela.append(htmlTabela);
}
