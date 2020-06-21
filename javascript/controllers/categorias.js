//const URL = 'http://localhost:8081/albus/categoria/';
const URL = 'http://192.168.2.106:8081/albus/categoria/';

var gerarTabela = function (response) {

    let $tbody = document.querySelector('tbody');

    for (let i = 0; i < response.data.length; i++) {

        let arrItens = [];

        let rowElement = document.createElement('tr');

        for (let j = 0; j < 4; j++) {
            arrItens.push(document.createElement('td'));
            rowElement.appendChild(arrItens[j]);
        }

        let id = arrItens[0];
        let tipoCategoria = arrItens[1];
        let nome = arrItens[2];
        let descricao = arrItens[3];

        let tabelaDeAcao = getTabelaDeAcoes();
        rowElement.appendChild(tabelaDeAcao);

        id.textContent = response.data[i].id;
        tipoCategoria.textContent = response.data[i].tipoCategoria;
        nome.textContent = response.data[i].nome;
        descricao.textContent = response.data[i].descricao;

        $tbody.appendChild(rowElement);
    }
}

var post = function (e) {

    let tr = e.parentNode.parentElement;
    let catTipo = tr.children[1].textContent;
    let catNome = tr.children[2].textContent;
    let catDescricao = tr.children[3].textContent;

    axios.post(URL, {
        tipoCategoria: catTipo,
        nome: catNome,
        descricao: catDescricao
    })
        .then(function (response) {
            console.log('Produto foi adicionado!');
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

var put = function (e) {

    let tr = e.parentNode.parentElement;

    let catId = tr.children[0].textContent;
    let catTipo = tr.children[1].textContent;
    let catNome = tr.children[2].textContent;
    let catDescricao = tr.children[3].textContent;

    axios.put(URL + catId, {
        id: catId,
        tipoCategoria: catTipo,
        nome: catNome,
        descricao: catDescricao
    })
        .then(function (response) {
            console.log('Produto foi modificado!');
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

var gerarLinha = function () {
    return '<tr>' +
        '<td><input type="number" class="form-control" name="id" id="id" placeholder="AUTO" disabled></td>' +
        '<td><input type="text" class="form-control" name="tipoCategoria" id="tipoCategoria"></td>' +
        '<td><input type="text" class="form-control" name="nome" id="nome"></td>' +
        '<td><input type="text" class="form-control" name="descricao" id="descricao"></td>' +
        '<td><a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>\n' +
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>\n' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>' +
        '</tr>';
}

var getTabelaDeAcoes = function () {

    let acoes = document.createElement('td');
    let arrAcoes = [];
    let arrIcons = [];

    let i = 0;
    while (i < 3) {
        arrAcoes.push(document.createElement('a'));
        arrIcons.push(document.createElement('i'));

        arrIcons[i].setAttribute("class", "material-icons");

        arrAcoes[i].appendChild(arrIcons[i]);
        acoes.appendChild(arrAcoes[i]);

        i++;
    }

    arrAcoes[0].setAttribute("class", "add");
    arrAcoes[0].setAttribute("title", "Add");
    arrAcoes[0].setAttribute("data-toggle", "tooltip");

    arrAcoes[1].setAttribute("class", "edit");
    arrAcoes[1].setAttribute("title", "Edit");
    arrAcoes[1].setAttribute("data-toggle", "tooltip");

    arrAcoes[2].setAttribute("class", "delete");
    arrAcoes[2].setAttribute("title", "Delete");
    arrAcoes[2].setAttribute("data-toggle", "tooltip");

    arrIcons[0].innerHTML = "&#xE03B;";
    arrIcons[1].innerHTML = "&#xE254;";
    arrIcons[2].innerHTML = "&#xE872;";

    return acoes;
}

export default {URL, gerarTabela, post, put, gerarLinha};