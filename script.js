let clientes = [];

function atualizarTabela() {
    const tabelaBody = document.getElementById("tabela-body");
    tabelaBody.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {
        const cliente = clientes[i];
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.innerHTML = cliente.nome;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        const produtos = cliente.produtos.map(p => p.nome).join(", ");
        cell2.innerHTML = produtos;
        row.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.innerHTML = formatarValor(cliente.valorTotal);
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        cell4.appendChild(checkbox);
        row.appendChild(cell4);

        const cell5 = document.createElement("td");
        const valorTotalComTaxa = checkbox.checked ? calcularValorTotalComTaxa(cliente.valorTotal) : cliente.valorTotal;
        cell5.innerHTML = formatarValor(valorTotalComTaxa);
        row.appendChild(cell5);

        tabelaBody.appendChild(row);
    }
}

function adicionarProduto() {
    const nome = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;
    const valor = parseFloat(document.getElementById("valor").value);

    let cliente = clientes.find(c => c.nome === nome);
    if (!cliente) {
        cliente = { nome: nome, produtos: [], valorTotal: 0 };
        clientes.push(cliente);
    }

    cliente.produtos.push({ nome: produto, valor: valor });
    cliente.valorTotal += valor;

    document.getElementById("cliente").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("valor").value = "";

    atualizarTabela();
}

function formatarValor(valor) {
    return "R$ " + valor.toFixed(2);
}

function calcularValorTotalComTaxa(valorTotal) {
    return valorTotal * 1.1;
}

function calcular() {
    const tabelaBody = document.getElementById("tabela-body");

    for (let i = 0; i < tabelaBody.rows.length; i++) {
        const row = tabelaBody.rows[i];
        const checkbox = row.cells[3].querySelector("input[type=checkbox]");
        const valorTotal = parseFloat(row.cells[2].innerHTML.replace("R$ ", ""));
        const valorTotalComTaxa = checkbox.checked ? calcularValorTotalComTaxa(valorTotal) : valorTotal;
        row.cells[4].innerHTML = formatarValor(valorTotalComTaxa);
    }
}
