const form = document.getElementById('form-atividade');
let linhas = [];
let nomesCadastrados = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionaLinha();
});

function adicionaLinha() {
    const inputnomeContato = document.getElementById('nome-contato');
    const inputtelefoneContato = document.getElementById('telefone-contato');

    const nomeCompleto = inputnomeContato.value.trim();
    const [nome, sobrenome] = nomeCompleto.split(' ');

    // Redefinir a lista de nomes cadastrados
    nomesCadastrados = [];

    if (nome && sobrenome) {
        if (/^[A-Za-z]+$/.test(nome) && /^[A-Za-z]+$/.test(sobrenome)) { // Verifica se contém apenas letras
            if (!verificarNomeDuplicado(nomeCompleto)) {
                const telefone = formatarTelefone(inputtelefoneContato.value);

                if (telefone) {
                    let linha = `<tr>`;
                    linha += `<td class="centralizado">${nomeCompleto}</td>`;
                    linha += `<td class="centralizado">${telefone}</td>`;
                    linha += `</tr>`;

                    linhas.push(linha);
                    nomesCadastrados.push(nomeCompleto);

                    inputnomeContato.value = '';
                    inputtelefoneContato.value = '';

                    atualizaTabela(); // Atualiza a tabela com a nova linha adicionada
                } else {
                    alert('Número de telefone inválido. Insira um número válido com DDD e 9 dígitos.');
                }
            } else {
                alert('Nome já cadastrado. Por favor, insira um nome diferente.');
            }
        } else {
            alert('O nome deve conter apenas letras.');
        }
    } else {
        alert('Informe o nome completo (nome e sobrenome)!');
    }
}

function verificarNomeDuplicado(nomeCompleto) {
    return nomesCadastrados.includes(nomeCompleto);
}

function formatarTelefone(telefone) {
    // Remover caracteres não numéricos do telefone
    const telefoneNumerico = telefone.replace(/\D/g, '');

    // Verificar se o telefone numérico possui 11 dígitos (considerando DDD)
    if (telefoneNumerico.length === 11) {
        const ddd = telefoneNumerico.slice(0, 2);
        const numeroPrincipal = telefoneNumerico.slice(2, 7);
        const parteFinal = telefoneNumerico.slice(7);

        // Formatar o telefone com a máscara desejada
        const telefoneFormatado = `(${ddd}) ${numeroPrincipal}-${parteFinal}`;

        return telefoneFormatado;
    }

    return null;
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas.join('');
}
