// aqui fazemos a importação do fs direto do npm
const fs = require('fs')
// utilizamos o método readFileSync que lê o arquivo setado 
// e retorna o conteúdo dele de forma síncrona
// e setamos um caminho cujo arquivo csv para ser convertido se encontra

csv = fs.readFileSync("./csv/exemplo.csv", {encoding: 'utf-8'})

// todas as linhas vão se tornar um objeto JSON e vão ser adicionadas nesse array
let result = []

// criamos um array que recebe o dado do csv até a quebra de linha 
// (no caso define um array de  dados por linha)
var line = csv.split("\n");

// o primeiro indice do array contém todos os cabeçalhos das colunas, então a gente guarda
// ele num array de dados da linha (indice 0 = dado de nome, indice 1 = dado de stack)
let lineData = line[0].split(',')

// separamos os cabeçalhos e vamos passar por todas as linhas do csv utilizando esse laço
for (let i = 1; i < line.length; i++){
    // um objeto vazio que vai guardar todos os dados convertidos e definidos
    let obj = {}

    // esse array passa pela linha atual e divide o dado quando percorrer ela
    var currentData = line[i].split(",")

    // esse laço percorre pelos headers e cria um objeto da com o conteúdo da linha,
    // até percorrer por todos os headers
    for(var j=0; j<lineData.length; j++){
        obj[lineData[j]] = currentData[j]
    }
    result.push(obj)
}
// essa função altera a codificação resultado do csv a ser gerado pelo writefile
let json = JSON.stringify(result)

// writeFileSync gera um arquivo passando como parâmetro o caminho do novo arquivo
// e o dado a ser gerado 
fs.writeFileSync('./json/output.json',json)

// console.log(result);