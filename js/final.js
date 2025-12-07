let despesas = JSON.parse(localStorage.getItem("despesas")) || null;

if (!despesas) {
    despesas = [];
    localStorage.setItem("despesas", JSON.stringify(despesas));
}

document.addEventListener("DOMContentLoaded", function() {
    atualizarTabela();
    document.getElementById("btDespesa").addEventListener("click", guardarDespesa);
    document.getElementById("btSalario").addEventListener("click", guardarSalario);

    if (localStorage.getItem("salario")) {
        document.getElementById("inputSalario").value = parseFloat(localStorage.getItem("salario")).toFixed(2);
    }
});


function guardarSalario(){
    const salario = parseFloat(document.getElementById("inputSalario").value) || 0;
    localStorage.setItem("salario", salario);
    atualizarSaldo();
}

function guardarDespesa(){
    let despesas = JSON.parse(localStorage.getItem("despesas"));

    const nome = document.getElementById("inputNome").value;
    const data = document.getElementById("inputData").value;
    const valor = parseFloat(document.getElementById("inputValor").value) || 0;
    const id = document.getElementById("inputId").value;
    
    const despesa = {nome: nome, data:data, valor: valor};
    
    if (id) {
        despesas[id] = despesa;
        document.getElementById("inputId").value = "";
    }else{
        despesas.push(despesa);
    }

    localStorage.setItem("despesas", JSON.stringify(despesas));
    atualizarTabela();


}


function atualizarTabela(){
    let valorDespesas = 0;
    despesas = JSON.parse(localStorage.getItem("despesas") || "[]");
    const bodyDespesas = document.getElementById("bodyDespesas");
    bodyDespesas.innerHTML = "";

    despesas.forEach((despesa, i) => {
        valorDespesas += despesa.valor;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i}</td>
            <td>${despesa.nome}</td>
            <td>${despesa.data}</td>
            <td>${despesa.valor.toFixed(2)}</td>
            <td><button onclick="editarDespesa(${i})">Edit</button></td>
            <td><button onclick="deletarDespesa(${i})">X</button></td>
        `;
        bodyDespesas.appendChild(row);
    });
    localStorage.setItem("despesaTotal", valorDespesas);
    atualizarSaldo();
}

function editarDespesa(id){
    const despesas = JSON.parse(localStorage.getItem("despesas"));
    const despesa = despesas[id];
    document.getElementById("inputNome").value = despesa.nome;
    document.getElementById("inputData").value = despesa.data;
    document.getElementById("inputValor").value = despesa.valor;
    document.getElementById("inputId").value = id;
}

function deletarDespesa(id){
    let despesas = JSON.parse(localStorage.getItem("despesas"));
    despesas.splice(id, 1);
    localStorage.setItem("despesas", JSON.stringify(despesas));
    atualizarTabela();
}

function atualizarSaldo(){
    const salario = parseFloat(localStorage.getItem("salario")) || 0;
    const despesaTotal = parseFloat(localStorage.getItem("despesaTotal")) || 0;
    const saldo = salario - despesaTotal;

    document.getElementById("labelSalario").innerText = "R$" + salario.toFixed(2);
    document.getElementById("labelDespesa").innerText = "R$" + despesaTotal.toFixed(2);
    document.getElementById("labelSaldo").innerText = "R$" + saldo.toFixed(2);

    if (saldo >= 0) {
        document.getElementById("saldo").style.border = "8px solid #43854b";
    }else{
        document.getElementById("saldo").style.border = "8px solid #a83232"
    }

}