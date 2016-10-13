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

var deltaSeidel = 100,
    deltaJacobi = 100,
    precisao    = 0.05,
    iSeidel     = math.matrix(),
    iJacobi     = math.matrix(),
    eqsA, eqjA,
    eqsB, eqjB,
    eqsC, eqjC,
    html = '',
    $table = $('.table-seidel tbody');

$(document).on('ready', function(){
  gaussSeidel();
  //gaussJacobi();
});

function gaussSeidel() {
  //Inicia tabela.
  iSeidel[0] = [0, 0, 0, 0, 'x'];

  //Iterações: calcula a, b, c e delta até que delta seja menor que a precisão (0.05).
  for(var i = 1; deltaSeidel >= precisao; i++) {
    //Cálculos de a, b, e c.
    eqsB = (-1 * iSeidel[i-1][2] -1 * iSeidel[i-1][3] + 2) / 3;
    eqsA = (-2 * eqsB - 2 * iSeidel[i-1][3] + 3) / 5;
    eqsC = (-6 * eqsB - 6) / 8;

    //Cálculo de delta.
    deltaSeidel = math.sqrt(math.pow((eqsB - iSeidel[i-1][1]), 2) + math.pow((eqsA - iSeidel[i-1][2]), 2) + math.pow((eqsC - iSeidel[i-1][3]), 2));

    iSeidel[i] = [i, eqsB, eqsA, eqsC, deltaSeidel];
    html += '<tr>';
	html += '<td>' + i + '</td><td>' + eqsB.toFixed(4) + '</td><td>' + eqsA.toFixed(4) + '</td><td>' + eqsC.toFixed(4) + '</td><td>' + deltaSeidel.toFixed(4) + '</td>';
	html += '</tr>';
  }
  
  $table.append(html);
  //console.log(iSeidel);
}

/*function gaussJacobi(){
  //Inicia tabela.
  iJacobi[0] = [0, 0, 0, 0, 'x'];

  //Iterações: calcula a, b, c e delta até que delta seja menor que a precisão (0.05).
  for(var i = 1; deltaJacobi >= precisao; i++) {
    //Cálculos de a, b, e c.
    eqjB = (-1 * iJacobi[i-1][2] - 1 * iJacobi[i-1][3] + 2) / 3;
    eqjA = (-2 * iJacobi[i-1][1] - 2 * iJacobi[i-1][3] + 3) / 5;
    eqjC = (-6 * iJacobi[i-1][1] - 6) / 8;

    //Cálculo de delta.
    deltaJacobi = math.sqrt(math.pow((eqjB - iJacobi[i-1][1]), 2) + math.pow((eqjA - iJacobi[i-1][2]), 2) + math.pow((eqjC - iJacobi[i-1][3]), 2));

    iJacobi[i] = [i, eqjB, eqjA, eqjC, deltaJacobi];
  }

  console.log(iJacobi);
}*/
