const form = document.getElementById('form-agenda');
const nomesArray = [];
const telefonesArray = [];
let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault(); //não deixa fazer reload na tela

    adicionaLinha();
    atualizaTabela();
    contadorContatos();
});

function adicionaLinha() {
    const inputNome = document.getElementById('nome-contato');
    const inputTelefone = document.getElementById('telefone-contato');

     // verificando se existe dois contatos com o mesmo nome
    if (nomesArray.includes(inputNome.value)) {
        alert(`Já existe um contato com o nome: ${inputNome.value}!`);
        return;
    }

    const telefoneFormato = formatarTelefone(inputTelefone.value);

    if (telefoneFormato.length !== 15) {
        alert('O telefone deve conter 11 dígitos (xx) xxxxx-xxxx');
        return;
    }

    if (telefonesArray.includes(telefoneFormato)) {
        alert('Este número já está cadastrado em outro contato.');
        return;
    }

    
    // guardando as informçoes de nome e telefone recebidas dentro do array
    nomesArray.push(inputNome.value);
    telefonesArray.push(telefoneFormato);

    // adicionando o contato na tabela e criando uma linha nova junto a isso
    let linha = '<tr>';
    linha += `<td>${inputNome.value}</td>`;
    linha += `<td>${telefoneFormato}</td>`;
    linha += '</tr>';

     // criando nova linha
     linhas += linha;

    // limpando campos
    inputNome.value = '';
    inputTelefone.value = ''; 
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function contadorContatos() {
    const contador = document.getElementById('contador-contatos');
    contador.textContent = nomesArray.length;
}

function formatarTelefone(telefone) {        //Máscara para estilização das informações inseridas pelo usuário no input.
    telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Formata os primeiros dígitos
    telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); // Formata os últimos dígitos
    return telefone;
}