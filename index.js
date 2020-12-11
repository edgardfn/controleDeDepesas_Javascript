let arrDespesas = []
imprimirDespesas(arrDespesas)
imprimirExtrato()


function imprimirDespesas(despesas){
    let divDespesas = document.getElementById('despesas')
    divDespesas.innerHTML = '<p class="titulo-depesas"><u>Despesas Detalhadas</u></p>'
    divDespesas.innerHTML += '<button class="button-organiza" onclick="ordemDecrescente()">Ordem decrescente</button>'
    divDespesas.innerHTML += '<button class="button-organiza" onclick="ordemCrescente()">Ordem crescente</button>'

    despesas.forEach(( item ) => {
        divDespesas.innerHTML += `<p>valor: R$ ${item.valor} | tipo: ${item.tipo} | descrição: ${item.descricao} </p>`
    })
    
}

function imprimirExtrato(){
    let divExtrato = document.getElementById('extrato')
    let gastoTotal = 0
    let gastoAlimentacao = 0
    let gastoUtilidades = 0
    let gastoViagem = 0

    arrDespesas.forEach((item) => {

        // gastoTotal += item.valor

        if(item.tipo === "alimentação") {
            gastoAlimentacao += item.valor
        } else if(item.tipo === "utilidades") {
            gastoUtilidades += item.valor
        } else {
            gastoViagem += item.valor
        }
    })

    gastoTotal = calcularGastoTotal(arrDespesas)

    divExtrato.innerHTML = `<p>Extrato: Gasto Total: R$${gastoTotal} | Alimentação: R$${gastoAlimentacao} | 
                                        Utilidades: R$${gastoUtilidades} | Viagem: R$${gastoViagem}</p>`
}


function limparFiltros() {
    document.getElementById('tipoFiltro').value = ""
    document.getElementById('valorFiltroMin').value = ""
    document.getElementById('valorFiltroMax').value = ""
}



function adicionarDespesa(){
    let valorCdt = document.getElementById('valorCadastro')
    let tipoCtd = document.getElementById('tipoCadastro')
    let descricaoCtd = document.getElementById('descricaoCadastro')

    if(validarValor(valorCdt) && validarTipo(tipoCtd) && validarDescricao(descricaoCtd)){
        let novaDespesa = {
            valor: Number(valorCdt.value),
            tipo: tipoCtd.value,
            descricao: descricaoCtd.value,
        }

        arrDespesas.push(novaDespesa)
        
        valorCdt.value = ""
        tipoCtd.value = ""
        descricaoCtd.value = ""

        
        limparFiltros()
        imprimirDespesas(arrDespesas)
        imprimirExtrato()
    } else {
        alert("`Faltou algum valor ou algum valor é um número negativo`")
    }
}

function filtrarDespesas(){
    let tipoFiltro = document.getElementById('tipoFiltro').value
    let valorMin = Number(document.getElementById('valorFiltroMin').value)
    let valorMax = Number(document.getElementById('valorFiltroMax').value)

    if( ( validarPreenchimentoCampo(tipoFiltro) && validarPreenchimentoCampo(valorMin) && validarPreenchimentoCampo(valorMax) ) && (verificaValorPositivo(valorMin)&&verificaValorPositivo(valorMax)) && validarMinimo(valorMin, valorMax) ) {
        let despesasFiltradas =  arrDespesas.filter((item) => {
            if( item.tipo === tipoFiltro && (item.valor >= valorMin && item.valor <= valorMax)){
                return true
            }
            return false
        })

        imprimirDespesas(despesasFiltradas)
    } else {
        alert("Algum valor faltando ou algum número negativo ou valor minimo maior que valor maximo.")
    }


    
}


/* ==== FUNÇÕES DE VALIDAÇÃO DOS DADOS : ==== */

/* CADASTRO DE DESPESA: */
function validarValor(valor){
    if(valor.value.length > 0 && parseInt(valor.value) > 0){
        return true
    }
    return false
}

function validarTipo(tipo){
    if(tipo.value !== ""){
        return true
    }
    return false
}

function validarDescricao(texto){
    if(texto.value.replace(/ /g,"").length !== 0){  
        return true
    }
    return false
}


/* FILTRO DE DESPESAS: */
function validarPreenchimentoCampo(valor) {
    if(valor !== "") {
        return true
    }
    return false
}

function verificaValorPositivo(valor) {
    if( valor > 0) {
        return true
    }
    return false
}

function validarMinimo(minimo, maximo) {
    if(minimo < maximo) {
        return true
    }
    return false
}

function ordemDecrescente() {

    arrDespesas.sort(function(a, b){
        return b.valor - a.valor
    })

    imprimirDespesas(arrDespesas);
}

function ordemCrescente() {

    arrDespesas.sort(function(a, b){
        return a.valor - b.valor
    })

    imprimirDespesas(arrDespesas);
}


/* IMPRIMIR EXTRATO: */
function calcularGastoTotal(array) {

    let initialValue = 0
    let valorTotal = array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.valor
    }, initialValue)

    return valorTotal

}