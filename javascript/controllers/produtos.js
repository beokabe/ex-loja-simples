const URL = 'http://localhost:8081/albus/produto/';

var gerarTabela = function (response) {

    let $tbody = document.querySelector('tbody');

    for (let i = 0; i < response.data.length; i++) {

        let arrItens = [];

        let rowElement = document.createElement('tr');

        for (let j = 0; j < 8; j++) {
            arrItens.push(document.createElement('td'));
            rowElement.appendChild(arrItens[j]);
        }

        let id = arrItens[0];
        let nome = arrItens[1];
        let categoriaId = arrItens[2];
        let quantidade = arrItens[3];
        let descricao = arrItens[4];
        let custo = arrItens[5];
        let valorDeVenda = arrItens[6];
        let urlImg = arrItens[7];

        let tabelaDeAcao = getTabelaDeAcoes();
        rowElement.appendChild(tabelaDeAcao);

        descricao.setAttribute("class", "tabela-item-descricao");
        urlImg.setAttribute("class", "url-img")

        id.textContent = response.data[i].id;
        nome.textContent = response.data[i].nome;
        categoriaId.textContent = response.data[i].categoria.id;
        quantidade.textContent = response.data[i].quantidade;
        descricao.textContent = response.data[i].descricao;
        custo.textContent = response.data[i].custo;
        valorDeVenda.textContent = response.data[i].valorDeVenda;
        urlImg.textContent = response.data[i].urlImg;

        $tbody.appendChild(rowElement);
    }
}

var post = function (e) {

    let tr = e.parentNode.parentElement;

    let prodNome = tr.children[1].textContent;
    let prodCategoriaId = tr.children[2].textContent;
    let prodQuantidade = tr.children[3].textContent;
    let prodDescricao = tr.children[4].textContent;
    let prodCusto = tr.children[5].textContent;
    let prodValorDeVenda = tr.children[6].textContent;
    let prodUrlImg = tr.children[7].textContent;

    axios.post(URL, {
        nome: prodNome,
        categoria: {
            id: prodCategoriaId,
        },
        quantidade: prodQuantidade,
        descricao: prodDescricao,
        custo: prodCusto,
        valorDeVenda: prodValorDeVenda,
        urlImg: prodUrlImg
    })
        .then(function (response) {
            console.log('Produto foi adicionado!');
        })
        .catch(function (error) {
            console.log(error);
        });
}

var put = function (e) {

    let tr = e.parentNode.parentElement;

    let prodId = tr.children[0].textContent;
    let prodNome = tr.children[1].textContent;
    let prodCategoriaId = tr.children[2].textContent;
    let prodQuantidade = tr.children[3].textContent;
    let prodDescricao = tr.children[4].textContent;
    let prodCusto = tr.children[5].textContent;
    let prodValorDeVenda = tr.children[6].textContent;
    let prodUrlImg = tr.children[7].textContent;

    axios.put(URL + prodId, {
        id: prodId,
        nome: prodNome,
        categoria: {
            id: prodCategoriaId,
        },
        quantidade: prodQuantidade,
        descricao: prodDescricao,
        custo: prodCusto,
        valorDeVenda: prodValorDeVenda,
        urlImg: prodUrlImg
    })
        .then(function (response) {
            console.log('Produto foi modificado!');
        })
        .catch(function (error) {
            console.log(error);
        });
}

var gerarLinha = function () {
    return '<tr>' +
        '<td><input type="text" class="form-control" name="id" id="id" placeholder="AUTO" disabled></td>' +
        '<td><input type="text" class="form-control" name="nome" id="nome"></td>' +
        '<td><input type="text" class="form-control" name="categoria" id="categoria"></td>' +
        '<td><input type="text" class="form-control" name="quantidade" id="quantidade"></td>' +
        '<td class="tabela-item-descricao"><input type="text" class="form-control" name="descricao" id="descricao"></td>' +
        '<td><input type="text" class="form-control" name="custo" id="custo"></td>' +
        '<td><input type="text" class="form-control" name="valorDeVenda" id="valorDeVenda"></td>' +
        '<td class="url-img"><input type="text" class="form-control" name="urlImg" id="urlImg"></td>' +
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