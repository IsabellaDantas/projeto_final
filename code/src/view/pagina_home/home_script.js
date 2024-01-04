// Objetos usadas pra teste enquanto não há rotas

const token = localStorage.getItem('token');

if (token) {
    try {
        // Decodifica o token
        const decodedToken = jwt.decode(token);

        // Atualiza o objeto user com os dados do token
        const user = {
            nome: decodedToken.nome,
            autenticado: true, 
            email: decodedToken.email,
            telefone: decodedToken.telefone, //divisão de endereco: endereco é dividido em bairro, rua e _casa...
            bairro: decodedToken.bairro,
            rua: decodedToken.rua,
            n_casa: decodedToken.n_casa
        };

        console.log('Dados do usuário:', user);
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
    }
} else {
    console.log('Token não encontrado no localStorage');
}

// Funções

async function get_pratos() {
        
    try {

        //Aqui eu preciso chamar a rota que pega os dados de todos os pratos que possuem id na tabela cardapio
        const response = await fetch('http://localhost:3000/menu/pratos');

        if (response.ok) {
    
            const pratos = await response.json();
            exibir_cardapio(pratos);

        } else {
    
            throw new Error('Erro ao obter dados');

        }

    } catch (error) {

        alert("Ocorreu um erro");
        console.log(error);

    }

}

async function exibir_pratos(pratos) {
        
    const menu = document.querySelector("#menu");

    let pratos_cardapio = "";
    
    pratos.forEach((prato) => {
        
        pratos_cardapio += `
        
        
            <div class="card">
            
                <img src="${prato.imagem}" alt="Prato do Restaurante" class="card_image">
            
                <div class="content_card">
                
                    <h2>${prato.nome}</h2>
                    <p class="price">Preço: R$ ${prato.preco}</p>
                    <button class="button" onclick="expandir_prato(${prato.id})">Detalhar</button>
                
                </div>
                            
            </div>
            
        `;
    
    });

    if (pratos_cardapio == "") {
        
        pratos_cardapio = `
        
        Desculpe, parece não haver pratos para hoje!

        `;

    }

    menu.innerHTML = pratos_cardapio;

}

async function pesquisar_categoria(categoria) {

    try {
        
        //preciso de uma rota em que mando a categoria e me retorna a lista de pratos que possuem seu id no cardápio e tem a tal categoria (ILIKE)
        const response = await fetch(`http://localhost:3000/pratos/categoria/?categoria=${categoria}`);
        const pratos = await response.json();
        exibir_pratos(pratos);
    
    } catch (error) {
        
        alert("Ocorreu um erro")
        console.log(error.message)
        
    }

}

async function pesquisar_nome() {
      
    const nome = document.querySelector("#search");

    try {
        
        if (nome.value == "")
            
            get_pratos();
        
        else {
            
            //preciso de uma rota em que mando o value de nome e me retorna a lista de pratos que possuem seu id no cardápio e tem a tal nome (ILIKE)
            const response = await fetch(`http://localhost:3000/pratos/nome/?nome=${nome}`);
            const pratos = await response.json();
            exibir_pratos(pratos);
        
        }
    
    } catch (error) {
        
        alert("Ocorreu um erro")
        console.log(error.message)
        
    }

}

async function excluir_prato(id) {
    
    const modal_container = document.getElementById('modal_excluir');
    const close = document.getElementById('excluir_close');
    const confirm = document.getElementById('excluir_confirm');

    modal_container.classList.add('show');

    close.addEventListener('click', () => {

        modal_container.classList.remove('show');

    })

    confirm.addEventListener('click', async () => {

        try {

            // Aqui eu preciso de uma rota para a qual eu envie o id do prato, pra excluir ele
            await fetch(`http://localhost:3000/pratos/${id}`, { method: "DELETE" });
            modal_container.classList.remove('show');
            listar_pratos_cadastrados()

        } catch (error) {

            alert("Ocorreu um erro");
            console.log(error);

        }

        modal_container.classList.remove('show');

    });

}

async function cadastrar_prato() {

    document.querySelector('.modal_cadastrar_editar h1').innerText = 'Cadastrar prato';
    const modal_container = document.getElementById('modal_cadastrar_editar');
    modal_container.classList.add('show');

    const close = document.getElementById('cadastrar_editar_close');
    const confirm = document.getElementById('cadastrar_editar_confirm');
    const input_nome = document.querySelector("#input_nome");
    const input_preco = document.querySelector("#input_preco");
    const input_descricao = document.querySelector("#input_descricao");
    const input_imagem = document.querySelector("#input_img");

    close.addEventListener('click', async () => {

        input_nome.value = "";
        input_preco.value = "";
        input_descricao.value = "";
        input_imagem.value = "";
        
        modal_container.classList.remove('show');
        uncheck();

    });

    confirm.addEventListener('click', async () => {

        const input_categoria = get_checked();
        
        const dados_prato = {
            
            nome: input_nome.value,
            descricao: input_descricao.value,
            preco: input_preco.value,
            imagem: input_imagem.value,
            categoria: input_categoria, //ñ tem quantidade?
        
        }

        try {
            
            // Aqui preciso da rota de cadastrar pratos, botei "ur" pq se não dá problema pra exibir o site
            //pergunta: o id no banco está configurando para ir incrementando? É preciso  R: Sim
            await fetch( `http://localhost:3000/pratos`, {
        
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados_prato)
        
            });

            document.location.reload()

        } catch (error) {
        
            alert("Ocorreu um erro")
            console.log(error)

        }

        input_nome.value = "";
        input_descricao.value = "";
        input_preco.value = "";
        input_imagem.value = "";
        input_categoria = ""; //quantidade?...

        modal_container.classList.remove('show');
        uncheck();
        listar_pratos_cadastrados();

    });
    
}

async function editar_prato(id) {

    const edit_nome = document.querySelector("#input_nome");
    const edit_descricao = document.querySelector("#input_descricao");
    const edit_preco = document.querySelector("#input_preco");
    const edit_imagem = document.querySelector("#input_imagem"); //quantidade...
    
    try {

        // Aqui eu preciso da rota de pesquisar por id
        const response = await fetch(`http://localhost:3000/pratos/${id}`);
        const data = await response.json();

        edit_nome.value = data.nome;
        edit_descricao.value = data.descricao;
        edit_preco.value = data.preco;
        edit_imagem.value = data.imagem_link;
        //quantidade?...

    } catch (error) {

        alert("Ocorreu um erro")
        console.log(error)

    }

    document.querySelector('.modal_cadastrar_editar h1').innerText = 'Editar prato';

    const modal_container = document.getElementById('modal_cadastrar_editar');
    modal_container.classList.add('show');
    
    const close = document.getElementById('cadastrar_editar_close');
    const confirm = document.getElementById('cadastrar_editar_confirm');

    close.addEventListener('click', async () => {

        modal_container.classList.remove('show');
        uncheck();
        
        edit_nome.value = "";
        edit_descricao.value = "";
        edit_preco.value = "";
        edit_imagem.value = ""; //quantidade?

    });
    
    confirm.addEventListener("click", async () => {

        const edit_categoria = get_checked();

        const dado = {
            
            nome: edit_nome.value,
            descricao: edit_descricao.value,
            preco: edit_preco.value, //quantidade
            imagem: edit_imagem.value,
            categoria: edit_categoria

        };

        try {
            
            // Aqui eu preciso da rota de editar por id
            const response = await fetch(`http://localhost:3000/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dado)});

        } catch (error) {
    
            alert("Ocorreu um erro")
            console.log(error)

        }

        edit_categoria = "";
        edit_nome.value = "";
        edit_preco.value = "";
        edit_descricao.value = "";
        edit_imagem.value = "";

        modal_container.classList.remove('show');
        listar_pratos_cadastrados();
        uncheck()

    });

}

async function expandir_prato(id) {

    try {
         
        //Aqui preciso de uma rota pra pesquisar por id, pra expandir o prato
        const response = await fetch(`http://localhost:3000/pratos/${id}`);
        const prato = await response.json();
        
        card.innerHTML = `

            <div class="circle_frame"><img class="icon" src="${prato.imagem}"></div>

            <button class="close_expandir" id="close_expandir"><i class='bx bx-x'></i></button>
            
            <div class="prato_info">

                <h1>${prato.nome}</h1>
                
                <div class="prato_texto">

                    <p>${prato.descricao}</p>
                    <br>
                    <strong>Categorias: </strong> ${prato.categorias} <br>
                    <strong>Preço Unitário: </strong> ${prato.preco} <br>

                </div>

                <div class="prato_bottons">
                
                <input type="number" placeholder="qtdd." id="input_qtdd" step="1"/>
                <button id="expandir_confirm" class="green" onclick="comprar(${prato.id}, ${prato.preco})>Comprar</button>
            
            </div>

        `
    } catch (error) {
        
        alert("Ocorreu um erro")
        console.log(error)
    
    }

    const modal_container = document.getElementById('modal_expandir');
    modal_container.classList.add('show');

    const close = document.getElementById('close_expandir');
    const confirm = document.getElementById('expandir_confirm');
    const qtdd = document.getElementById('input_qtdd');

    close.addEventListener('click', async () => {

        modal_container.classList.remove('show');
        qtdd.value = "";

    });

    confirm.addEventListener('click', async () => {

        comprar(qtdd.value);
        modal_container.classList.remove('show');
        qtdd.value = "";

    });

}

async function listar_pratos_cadastrados() {

    try {

        const tbody = document.querySelector("#pratos_cadastrados");
        //Aqui eu preciso de uma rota que retorne todos os pratos cadastrados (de preferencia em ordem alfabética)
        const response = await fetch(`http://localhost:3000/pratos`);

        if (response.ok) {
    
            const pratos = await response.json();
            let linhas = "";

            pratos.forEach((prato) => {
                        
                linhas += `
                    
                    <tr class="active_row">
                                
                        <td>${prato.nome}</td>
                        <td>${prato.preco} R$</td>
                        <td><i class='bx bx-expand-alt' onclick="expandir_prato(${prato.id})"></i></td>
                        <td><i class='bx bx-edit-alt' onclick="editar_prato(${prato.id})"></i></td>
                        <td><i class='bx bx-trash' onclick="excluir_prato(${prato.id})"></i></td>
                    
                    </tr>
                
                `;
            
            });

            if (linhas == "") {
                
                linhas = `
                
                <tr>
                    <td colspan="5" style="text-align:center">Não há pratos cadastrados!</td>
                </tr>
                
                `;

            }

            tbody.innerHTML = linhas;

        } else {
    
            throw new Error('Erro ao obter dados');

        }

    } catch (error) {

        alert("Ocorreu um erro");
        console.log(error);

    }

}

async function credenciamento() {

    const modal_container = document.getElementById('modal_credenciar');
    const close = document.getElementById('credenciar_close');
    const credenciar = document.getElementById('credenciar');
    const descredenciar = document.getElementById('descredenciar');
    const texto_credenciar = document.getElementById('credenciar_email');
    const texto_descredenciar = document.getElementById('descredenciar_email');
    const conteudo = document.getElementById('conteudo');
    const campo_email = document.getElementById('email');
    const botao_credenciar = document.getElementById('credenciar_confirm');
    const botao_descredenciar = document.getElementById('descredenciar_confirm');

    modal_container.classList.add('show');

    close.addEventListener('click', async () => {

        modal_container.classList.remove('show');
        texto_credenciar.style.display = "none";
        texto_descredenciar.style.display = "none";
        botao_credenciar.style.display = "none";
        botao_descredenciar.style.display = "none";
        campo_email.style.display = "none";
        campo_email.value = "";
        conteudo.style.display = "block";
        
    });

    credenciar.addEventListener('click', async () => {

        
        texto_credenciar.style.display = "block";
        botao_credenciar.style.display = "inline";
        campo_email.style.display = "inline";
        conteudo.style.display = "none";

        botao_credenciar.addEventListener('click', async () => {

            try {

                // Aqui eu preciso de uma rota para a qual eu envie o e-mail do usuário e coloque o True no credenciado
                await fetch(`http://localhost:3000/cadastro/credenciar/${id}`, { 
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(email)});

            } catch (error) {
    
                alert("Ocorreu um erro");
                console.log(error);
    
            }
    
            modal_container.classList.remove('show');
            texto_credenciar.style.display = "none";
            texto_descredenciar.style.display = "none";
            botao_credenciar.style.display = "none";
            botao_descredenciar.style.display = "none";
            campo_email.style.display = "none";
            campo_email.value = "";
            conteudo.style.display = "block";

        });

    });

    descredenciar.addEventListener('click', async () => {

        texto_descredenciar.style.display = "block";
        botao_descredenciar.style.display = "inline";
        campo_email.style.display = "inline";
        conteudo.style.display = "none";

        botao_descredenciar.addEventListener('click', async () => {

            try {

                // Aqui eu preciso de uma rota para a qual eu envie o e-mail do usuário e tire o True do credenciado
                await fetch(`http://localhost:3000/cadastro/descredenciar/${id}`, { 
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(email)});
    
            } catch (error) {
    
                alert("Ocorreu um erro");
                console.log(error);
    
            }
    
            modal_container.classList.remove('show');
            texto_credenciar.style.display = "none";
            texto_descredenciar.style.display = "none";
            botao_credenciar.style.display = "none";
            botao_descredenciar.style.display = "none";
            campo_email.style.display = "none";
            campo_email.value = "";
            conteudo.style.display = "block";

        });

    });

}

async function historico_compras() {

    const modal_container = document.getElementById('modal_historico');
    modal_container.classList.add('show');

    const close = document.getElementById('historico_close');

    close.addEventListener('click', async () => {

        modal_container.classList.remove('show');

    });

    try {

        const tbody = document.querySelector("#historico");
        //Aqui eu mando o id da pessoa e recebo o nome do prato, qtdd e preço pago de todas as compras com o id do usuário logado
        const response = await fetch(`http://localhost:3000/compras/${id_cliente}`);

        if (response.ok) {
    
            const compras = await response.json();
            let linhas = "";

            compras.forEach((compra) => {
                        
                linhas += `
                    
                    <tr class="active_row">
                            
                            <td>${compra.prato}</td>
                            <td>${compra.quantidade}</td>
                            <td>${compra.preco_total} R$</td>
                            <td>${compra.data}</td>
                        
                    </tr>
                
                `;
            
            });

            if (linhas == "") {
                
                linhas = `
                
                <tr>
                    <td colspan="5" style="text-align:center">Não há compras para este usuário!</td>
                </tr>
                
                `;

            }

            tbody.innerHTML = linhas;

        } else {
    
            throw new Error('Erro ao obter dados');

        }

    } catch (error) {

        alert("Ocorreu um erro");
        console.log(error);

    }

}

async function editar_menu() {

    const modal_container = document.getElementById('modal_menu');
    modal_container.classList.add('show');

    try {

        const tbody = document.querySelector("#menu");
        //Aqui eu preciso de uma rota que retorne todos os pratos cadastrados (de preferencia em ordem alfabética)
        const response = await fetch(`http://localhost:3000/pratos`);

        if (response.ok) {
    
            const pratos = await response.json();
            let linhas = "";

            pratos.forEach((prato) => {
                        
                linhas += `
                    
                    <li class="item" style="grid-column: span 1; width: 160px; margin-bottom: 5px;">
                                        
                        <span class="checkbox">
                            
                            <i class="fa-solid fa-check check-icon"></i>
                        
                        </span>
                                                    
                        <span class="item_text" id="${prato.id}">${prato.nome}</span>
                                                
                    </li>
                
                `;
            
            });

            if (linhas == "") {
                
                linhas = `
                
                <tr>
                    <td colspan="3" style="text-align:center">Não há pratos cadastrados!</td>
                </tr>
                
                `;

            }

            tbody.innerHTML = linhas;

        } else {
    
            throw new Error('Erro ao obter dados');

        }

    } catch (error) {

        alert("Ocorreu um erro");
        console.log(error);

    }

    const close = document.getElementById('menu_close');
    const confirm = document.getElementById('menu_confirm');

    close.addEventListener('click', async () => {
        
        modal_container.classList.remove('show');
        uncheck();

    });
    
    confirm.addEventListener("click", async () => {

        const pratos_menu = get_menu();

        try {

            pratos_menu.forEach(async prato => {
                
                // Aqui eu preciso da rota onde eu mando uma lista de ids e isso é colocado na tabela menu (que tem que seu limpa antes)
                const response = await fetch(`http://localhost:3000/menu`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cardapio_dia)});

            });

        } catch (error) {
    
            alert("Ocorreu um erro")
            console.log(error)

        }

        modal_container.classList.remove('show');
        uncheck();

    });

}

async function editar_user() {

    const edit_telefone = document.querySelector("#new_telefone");
    const edit_endereco = document.querySelector("#new_endereco");
    
    const modal_container = document.getElementById('modal_editar_user');
    modal_container.classList.add('show');
    
    const close = document.getElementById('user_editar_close');
    const confirm = document.getElementById('user_editar_confirm');

    close.addEventListener('click', async () => {

        modal_container.classList.remove('show');
        
        edit_telefone.value = "";
        edit_endereco.value = ""; //divisão de endereco

    });
    
    confirm.addEventListener("click", async () => {

        //Aqui estou assumindo que os dados do usuário foram mandados pra mim da página de login
        user.telefone = edit_telefone;
        user.endereco = edit_endereco; //divisão de endereco

        const dado = {
            
            id: user.id,
            telefone: edit_telefone,
            endereco: edit_endereco  //divisao de endereco


        };

        try {
            
            // Aqui eu preciso da rota de editar o usuário. Vou mandar o id, o telefone e o endereco
            const response = await fetch(`http://localhost:3000/cadastro/endereco/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dado)});

        } catch (error) {
    
            alert("Ocorreu um erro")
            console.log(error)

        }

        edit_telefone = "";
        edit_endereco = "";

        modal_container.classList.remove('show');
        
    })

}

async function comprar(id_prato, preco_prato) {

    //data vai ter que ser mudado pra string no banco
    const data_atual = new Date().toLocaleString();
    
    const modal_container = document.getElementById('modal_compra');
    const close = document.getElementById('ok');

    modal_container.classList.add('show');

    close.addEventListener('click', () => {

        modal_container.classList.remove('show');

    });

    const qtdd = document.getElementById('input_qtdd');

    const dado = {
            
        id_cliente: user.id,
        id_prato: id_prato,
        qtdd: qtdd,
        data: data_atual,
        preco_total: preco_prato * qtdd

    };

    try {
        
        // Aqui eu preciso da rota pra adicionar uma compra lá na tabela
        const response = await fetch(`http://localhost:3000/compras`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dado)});

    } catch (error) {

        alert("Ocorreu um erro")
        console.log(error)

    }

}

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
    const user_data = document.getElementById('user_data');
    list.style.display = 'none';
    user_data.style.display = 'none';
    home.style.display = 'block';

}

function show_gerenciar_pratos() {

    const home = document.querySelector('.home');
    const list = document.querySelector('.lista_pratos');
    const user_data = document.getElementById('user_data');
    home.style.display = 'none';
    user_data.style.display = 'none';
    list.style.display = 'flex';

}

function show_user_data() {

    const home = document.querySelector('.home');
    const list = document.querySelector('.lista_pratos');
    const user_data = document.getElementById('user_data');
    home.style.display = 'none';
    list.style.display = 'none';
    user_data.style.display = 'flex';

    const data = document.getElementById('user_info');

    data.innerHTML = `
    
        <div class="userDetail">
        <strong>Nome:</strong> ${user.nome}
        </div>
        
        <div class="userDetail">
        <strong>E-mail:</strong> ${user.email}
        </div>
        
        <div class="userDetail">
        <strong>Telefone:</strong> ${user.telefone}
        </div>
        
        <div class="userDetail">
        <strong>Endereço:</strong> ${user.endereco}
        </div>

        <button class="button" onclick="editar_user()">Editar dados</button>
    
    `;

}

const select = document.querySelector(".button_select");
const items = document.querySelectorAll(".item");

select.addEventListener("click", () => {
    
    select.classList.toggle("open");

});

items.forEach(item => {
    
    item.addEventListener("click", () => {
        
        item.classList.toggle("checked");
        let checked = document.querySelectorAll(".checked");
        let text = document.querySelector(".button_text");
        
        if(checked && checked.length > 1){
                
            text.innerText = `${checked.length - 1} item selecionado`;
            
        }else{
                
            text.innerText = "Selecione as categorias";
            
        }

    });

});

function get_checked() {

    var itens_marcados = document.querySelectorAll('.checked');
    var categorias_prato = ""
    
    itens_marcados.forEach(function(item) {

        categorias_prato += item.innerText + '; ';

    });

    return(texto_items.trim());

}

function get_menu() {

    var itens_marcados = document.querySelectorAll('.checked');
    var id_pratos = []
    
    itens_marcados.forEach(function(item) {

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
