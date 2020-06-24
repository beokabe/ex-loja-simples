//const URL = 'http://localhost:8081/albus/produto/';
const URL = 'http://192.168.2.106:8081/albus/produto/'
init();

function init() {
    getṔrodutosNaLoja();
}

async function getṔrodutosNaLoja() {

     axios.get(URL)
        .then(function (response) {

            if (!response.data.length) {
                const $verificaProdutos = document.querySelector('#verifica-produtos');
                $verificaProdutos.style.display = "block";
            }

            var urlSearch = window.location.search.split("=")[1];

            for (let i = 0; i < response.data.length; i++) {
                if ((urlSearch === '' || urlSearch === undefined) || urlSearch.length > 20 &&
                    response.data[i].quantidade > 0) {
                    geraProdutoLoja(response, i)
                } else {
                    if(urlSearch.toLowerCase() !== (response.data[i].categoria.nome).toLowerCase()) {
                        break;
                    }
                    geraProdutoLoja(response, i)
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function geraProdutoLoja(response, i) {

    let divCard = document.createElement("li");

    let paragrafoId = document.createElement("p");

    let imagemProduto = document.createElement("img");

    let divProdutoNome = document.createElement("div");
    let h3Nome = document.createElement("h3");

    let divProdutoCategoria = document.createElement("div");
    let h4Categoria = document.createElement("h4");
    let paragrafoCategoriaNumero = document.createElement("p");

    let divProdutoQuantidade = document.createElement("div");
    let h4Quantidade = document.createElement("h4");

    let divProdutoDescricao = document.createElement("div");
    let paragrafoDescricao = document.createElement("p");

    let divProdutoPreco = document.createElement("div");
    let paragrafoPreco = document.createElement("p");

    let divProdutoCusto = document.createElement("div");
    let paragrafoCusto = document.createElement("p");

    let botaoCompra = document.createElement("div");

    divCard.classList.add("card");
    imagemProduto.classList.add('produto-img')
    paragrafoId.classList.add("produto-id", "hidden");
    divProdutoNome.classList.add("produto-nome");
    divProdutoCategoria.classList.add("produto-categoria");
    divProdutoQuantidade.classList.add("produto-quantidade");
    divProdutoDescricao.classList.add("produto-descricao");
    divProdutoPreco.classList.add("produto-preco");
    divProdutoCusto.classList.add("produto-custo", "hidden");
    paragrafoCategoriaNumero.classList.add("produto-categoriaId", "hidden");

    botaoCompra.classList.add("produto-botao");

    paragrafoId.textContent = response.data[i].id;
    h3Nome.textContent = response.data[i].nome;

    h4Categoria.textContent = response.data[i].categoria.nome;
    paragrafoCategoriaNumero.textContent = response.data[i].categoria.id;

    h4Quantidade.textContent = "Disponível: " + response.data[i].quantidade;
    paragrafoDescricao.textContent = response.data[i].descricao;
    imagemProduto.src = response.data[i].urlImg;

    paragrafoPreco.textContent = "R$ " + response.data[i].valorDeVenda;
    paragrafoCusto.textContent = response.data[i].custo;

    botaoCompra.value = "comprar";
    botaoCompra.textContent = "Comprar";
    botaoCompra.addEventListener("click", comprarProduto);

    document.querySelector('.produto-card-group').appendChild(divCard);

    divCard.appendChild(paragrafoId);

    divCard.appendChild(imagemProduto);

    divCard.appendChild(divProdutoNome);
    divProdutoNome.appendChild(h3Nome);

    divCard.appendChild(divProdutoCategoria);
    divProdutoCategoria.appendChild(h4Categoria);
    divProdutoCategoria.appendChild(paragrafoCategoriaNumero);

    divCard.appendChild(divProdutoQuantidade);
    divProdutoQuantidade.appendChild(h4Quantidade);

    divCard.appendChild(divProdutoDescricao);
    divProdutoDescricao.appendChild(paragrafoDescricao);

    divCard.appendChild(divProdutoPreco);
    divProdutoPreco.appendChild(paragrafoPreco);

    divCard.appendChild(divProdutoCusto);
    divProdutoCusto.appendChild(paragrafoCusto);

    divCard.appendChild(botaoCompra);
}

function comprarProduto() {

    if (confirm("Tem certeza que deseja comprar este produto?")) {

        var pai = this.parentElement;

        var _id = pai.children[0].textContent;
        var _urlImg = pai.children[1].src;
        var _nome = pai.children[2].firstElementChild.textContent;
        var _categoria = pai.children[3].lastElementChild.textContent;
        var _quantidade = pai.children[4].firstElementChild.textContent.split(" ")[1];
        var _descricao = pai.children[5].firstElementChild.textContent;
        var _valorDeVenda = pai.children[6].firstElementChild.textContent.split(" ")[1];
        var _custo = pai.children[7].firstElementChild.textContent;

        _quantidade = parseInt(_quantidade);
        _quantidade--;

        console.log(_id);

        axios.put(URL + _id, {
            id: _id,
            nome: _nome,
            categoria: {
                id: _categoria
            },
            quantidade: _quantidade--,
            valorDeVenda: _valorDeVenda,
            custo: _custo,
            descricao: _descricao,
            urlImg: _urlImg
        }).then(function (response) {
            location.reload();
        })
            .catch(function (error) {
                console.log(error);
            });
    }
}
