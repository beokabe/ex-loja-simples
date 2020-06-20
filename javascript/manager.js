import produtos from './controllers/produtos.js';
import categorias from './controllers/categorias.js';

let verificaERetornaTipoDeGerenciador = () => document.querySelector('title').textContent === "Categorias" ? "Categorias" : "Produtos";
let tipo = verificaERetornaTipoDeGerenciador() === "Produtos" ? produtos : categorias;

init();

function init() {
    getIndex();
}

function getIndex() {

    let $tbody = document.querySelector('tbody');

    axios.get(tipo.URL)
        .then(function (response) {
            tipo.gerarTabela(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

$(document).ready(function () {

    let row;

    $(".add-new").click(function () {

        $(this).attr("disabled", "disabled");
        let index = $("table tbody tr:last-child").index();

        row = tipo.gerarLinha();

        $("table").append(row);
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
    });

    $(document).on("click", ".add", function () {
        let empty = false;
        let input;
        this.parentNode.parentElement.firstElementChild.firstElementChild.hasAttribute('disabled') ?
            input = $(this).parents("tr").find('input[type="text"]:not(#id)') :
            input = $(this).parents("tr").find('input[type="text"]');

        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if(!empty){
            input.each(function(){
                $(this).parent("td").html($(this).val());
            });
            adicionarItem(this);
            setInterval(location.reload(), 100);
        }
    });

    function adicionarItem(item) {
        let inputId = item.parentNode.parentElement.firstElementChild.firstElementChild;
        inputId !== null ? tipo.post(item) : tipo.put(item);
    }

    $(document).on("click", ".edit", function () {
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });

    $(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });

    $(document).on("click", ".delete", function () {

        let id = this.parentNode.parentElement.firstElementChild.textContent;

        axios.delete(tipo.URL + id)
            .then(function (response) {
                console.log('Item foi deletado');
            })
            .catch(function (error) {
                console.log(error);
            })
    });
});

