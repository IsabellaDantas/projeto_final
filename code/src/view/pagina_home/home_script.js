// scripts referentes ao funcionamento da sidebar e estilos da página
const cliente_menu = document.getElementById('cliente');
const administracao_menu = document.getElementById('administracao');

if (user.autenticado) {
    
    cliente_menu.style.display = 'none';
    administracao_menu.style.display = 'block';

} else {
    
    cliente_menu.style.display = 'block';
    administracao_menu.style.display = 'none';

}

function show_home() {

    const home = document.querySelector('.home');
    const list = document.querySelector('.lista_pratos');
    list.style.display = 'none';
    home.style.display = 'block';

}

function show_gerenciar_pratos() {

    const home = document.querySelector('.home');
    const list = document.querySelector('.lista_pratos');
    home.style.display = 'none';
    list.style.display = 'flex';

}

const selectBtn = document.querySelector(".select-btn");
const items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
    
    selectBtn.classList.toggle("open");

});

items.forEach(item => {
    
    item.addEventListener("click", () => {
        
        item.classList.toggle("checked");
        let checked = document.querySelectorAll(".checked");
        let btnText = document.querySelector(".btn-text");
        
        if(checked && checked.length > 1){
                
            btnText.innerText = $;{checked.length - 1} item: selecionado;
            
        }else{
                
            btnText.innerText = "Selecione as categorias";
            
        }

    });

});

function get_checked() {

    var itensMarcados = document.querySelectorAll('.checked');
    var categorias_prato = ""
    
    itensMarcados.forEach(function(item) {

        categorias_prato += item.innerText + '; ';

    });

    return(texto_items.trim());

}

function get_menu() {

    var itensMarcados = document.querySelectorAll('.checked');
    var id_pratos = []
    
    itensMarcados.forEach(function(item) {

        id_pratos.appendChild(item.id)

    });

    return(id_pratos);

}

function uncheck() {

    const items = document.querySelectorAll(".item");

    items.forEach(item => {
    
        item.classList.remove("checked");
    
    });

}