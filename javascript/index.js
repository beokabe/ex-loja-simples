const URL = 'http://localhost:8081/albus/produto';

init();

function init() {
    getṔrodutosNaLoja();
}

function getṔrodutosNaLoja() {

    axios.get(URL)
        .then(function (response) {

            if (!response.data.length) {
                const $verificaProdutos = document.querySelector('#verifica-produtos');
                $verificaProdutos.style.display = "block";
            }

            for (let i = 0; i < response.data.length; i++) {

                if (response.data[i].quantidade > 0) {
                    let divCard = document.createElement("li");

                    let paragrafoId = document.createElement("p");

                    let imagemProduto = document.createElement("img");

                    let divProdutoNome = document.createElement("div");
                    let h3Nome = document.createElement("h3");

                    let divProdutoCategoria = document.createElement("div");
                    let h4Categoria = document.createElement("h4");

                    let divProdutoQuantidade = document.createElement("div");
                    let h4Quantidade = document.createElement("h4");

                    let divProdutoDescricao = document.createElement("div");
                    let paragrafoDescricao = document.createElement("p");

                    let divProdutoPreco = document.createElement("div");
                    let paragrafoPreco = document.createElement("p");

                    let botaoCompra = document.createElement("div");

                    divCard.classList.add("card");
                    paragrafoId.classList.add("produto-id");
                    divProdutoNome.classList.add("produto-nome");
                    divProdutoCategoria.classList.add("produto-categoria");
                    divProdutoQuantidade.classList.add("produto-quantidade");
                    divProdutoDescricao.classList.add("produto-descricao");
                    divProdutoPreco.classList.add("produto-preco");
                    botaoCompra.classList.add("produto-botao");

                    paragrafoId.textContent = response.data[i].id;
                    h3Nome.textContent = response.data[i].nome;
                    h4Categoria.textContent = response.data[i].categoria.nome;
                    h4Quantidade.textContent = response.data[i].quantidade;
                    paragrafoDescricao.textContent = response.data[i].descricao;
                    imagemProduto.src = response.data[i].urlImg;

                    paragrafoPreco.textContent = "R$ " + response.data[i].valorDeVenda;

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

                    divCard.appendChild(divProdutoQuantidade);
                    divProdutoQuantidade.appendChild(h4Quantidade);

                    divCard.appendChild(divProdutoDescricao);
                    divProdutoDescricao.appendChild(paragrafoDescricao);

                    divCard.appendChild(divProdutoPreco);
                    divProdutoPreco.appendChild(paragrafoPreco);

                    divCard.appendChild(botaoCompra);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function comprarProduto(elementoCapturado) {

}