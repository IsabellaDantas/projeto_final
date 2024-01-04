const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const bairro = document.getElementById("bairro").value;
    const rua = document.getElementById("rua").value;
    const n_casa = document.getElementById("n_casa").value;

    try {
        const response = await fetch('http://localhost:3000/cadastro',{
            method: 'POST',
            headers: {
                'Content-Type': 'apllicatiom/json',
            },
            body: JSON.stringify({
                nome,
                email,
                telefone,
                senha,
                bairro,
                rua,
                n_casa,
            })
        });

    }catch (error) {
        console.error(error);
        alert('Ocorreu um erro');
    }

}


async function login() {
    const email_login = document.getElementById("email_login").value;
    const senha_login = document.getElementById("senha_login").value;

    try{
        const response = await fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'apllicatiom/json',
            },
            body: JSON.stringify({
                email_login,
                senha_login,
            })
        });
        
        if(response.ok) {
            const { token } = await response.json();

            localStorage.setItem('token', token);
            
            window.location.href = 'home.html';
        } else {
            const { error } = await response.json();
            alert('Erro no login: ' + error);
        }  
    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro');
    }
}
