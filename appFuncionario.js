class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this._id = id;
        this._nome = nome;
        this._idade = parseInt(idade);
        this._cargo = cargo;
        this._salario = parseFloat(salario);
    }

    get id() { return this._id; }
    get nome() { return this._nome; }
    set nome(novoNome) { this._nome = novoNome; }

    get idade() { return this._idade; }
    set idade(novaIdade) { this._idade = parseInt(novaIdade); }

    get cargo() { return this._cargo; }
    set cargo(novoCargo) { this._cargo = novoCargo; }

    get salario() { return this._salario; }
    set salario(novoSalario) { this._salario = parseFloat(novoSalario); }

    toString() {
        return `ID: ${this._id} | Nome: ${this._nome} | Idade: ${this._idade} | Cargo: ${this._cargo} | Salário: R$ ${this._salario.toFixed(2)}`;
    }
}

let funcionarios = [];
let idContador = 1;
let idEditando = null;

const renderizarTabela = () => {
    const tbody = document.querySelector('#tabelaFuncionarios tbody');
    tbody.innerHTML = '';
    funcionarios.forEach(func => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${func.id}</td>
            <td>${func.nome}</td>
            <td>${func.idade}</td>
            <td>${func.cargo}</td>
            <td>R$ ${func.salario.toFixed(2)}</td>
            <td>
                <button onclick="carregarEdicao(${func.id})">Editar</button>
                <button onclick="excluirFuncionario(${func.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

const buscarPorId = (id) => funcionarios.find(f => f.id === id);

const excluirFuncionario = (id) => {
    funcionarios = funcionarios.filter(f => f.id !== id);
    alert('Funcionário excluído com sucesso.');
    renderizarTabela();
};

const carregarEdicao = (id) => {
    const func = buscarPorId(id);
    if (func) {
        document.getElementById('nome').value = func.nome;
        document.getElementById('idade').value = func.idade;
        document.getElementById('cargo').value = func.cargo;
        document.getElementById('salario').value = func.salario;
        idEditando = id;
        document.getElementById('btnCadastrar').innerText = 'Atualizar';
    }
};

document.getElementById('btnCadastrar').addEventListener('click', function() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    if (nome && idade && cargo && salario) {
        if (idEditando !== null) {
            const func = buscarPorId(idEditando);
            if (func) {
                func.nome = nome;
                func.idade = idade;
                func.cargo = cargo;
                func.salario = salario;
                alert('Funcionário atualizado com sucesso!');
            }
            idEditando = null;
            document.getElementById('btnCadastrar').innerText = 'Cadastrar';
        } else {
            const novoFuncionario = new Funcionario(idContador++, nome, idade, cargo, salario);
            funcionarios.push(novoFuncionario);
            alert('Funcionário cadastrado com sucesso!');
        }

        document.getElementById('formFuncionario').reset();
        renderizarTabela();
    }
});

const relatorios = {
    salarioMaior5000: () => {
        const resultado = funcionarios.filter(f => f.salario > 5000);
        resultado.forEach(f => console.log(f.toString()));
        return resultado;
    },

    mediaSalarial: () => {
        if (funcionarios.length === 0) return 0;
        const soma = funcionarios.reduce((acc, f) => acc + f.salario, 0);
        return (soma / funcionarios.length).toFixed(2);
    },

    cargosUnicos: () => {
        const cargos = funcionarios.map(f => f.cargo);
        return [...new Set(cargos)];
    },

    nomesMaiusculo: () => {
        return funcionarios.map(f => f.nome.toUpperCase());
    }
};