const fs = require('fs')

function csvToJson(csvPath, jsonFiles){
    // essa função guarda toda a lógica de conversão de arquivo csv para json
    // utilizei o método readFileSync que lê todos os arquivos de dentro de uma pasta csv
    // e retorna esses arquivos convertidos para json numa pasta json

    const csv = fs.readFileSync(csvPath, {encoding: 'utf-8'})

    // todas as linhas vão se tornar um objeto JSON e vão ser adicionadas nesse array
    let result = []

    // criamos um array que recebe o dado do csv até a quebra de linha 
    // (no caso define um array de dados por linha)
    var line = csv.split("\n");

    // o primeiro indice do array contém todos os cabeçalhos das colunas, então a gente guarda
    // ele num array de dados da linha (indice 0 = dado de nome, indice 1 = dado de stack)
    let lineData = line[0].split(',')

    // separamos os cabeçalhos e vamos passar por todas as linhas do csv utilizando esse laço
    for (let i = 1; i < line.length; i++){
        // um objeto vazio que vai guardar todos os dados convertidos e definidos
        let obj = {}

        // esse array passa pela linha correspondente ao indice
        // e guarda o dado até bater no split
        var currentData = line[i].split(",")

        // esse laço percorre pelo dado de linha (nome ou stack) e cria 
        //um objeto com o dado corrspondente da linha, até percorrer por todos os dados
        for(var j=0; j<lineData.length; j++){
            obj[lineData[j]] = currentData[j]
        }

    result.push(obj)
}
    // essa função altera a codificação resultado do csv a ser gerado pelo writefile
    let json = JSON.stringify(result)

    // writeFileSync gera um arquivo passando como parâmetro o caminho do novo arquivo
    // e também o resultado do arquivo convertido
    fs.writeFileSync(jsonFiles,json)
    return result;
}

// essa função lê os arquivos na pasta de csv
function csvDirectoryFiles(csvPath) {
    // console.log('csv Path => ', csvPath)
    let csvFiles = fs.readdirSync(csvPath)
    return csvFiles
  }
  
  // essa constante executa a função que lê os arquivos do diretório e guarda nela os dados
  const directory = csvDirectoryFiles('./csv')
  
  // essa função executa o método de conversão de csv e 
  // cria os novos arquivos com base nos arquivos originários
  function convertCsvToJson(jsonDirectory) {
    // o método .map vai buscar e setar dentro da pasta de diretório csv
    // os arquivos utilizados  e vai buscar os nomes dos arquivos para
    // usá-los para nomear os novos arquivos

   const allConvertedFiles = jsonDirectory.map((archive) =>
      csvToJson(`./csv/${archive}`, 
      `./json/${archive.split('.')[0]}.json`)
    )

    // esse log retorna pro usuário os arquivos convertidos, para retornar
    // um arquivo específico é basta definir um endereço no indice, 
    // já que o retorno são vários arrays
    console.log(allConvertedFiles)
  }
  
  // executa a função que converte csv pra json passando como parâmetro o diretório
  // de csv
  convertCsvToJson(directory)