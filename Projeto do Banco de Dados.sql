create table Usuarios (
id int primary key,
nome varchar (100),
email varchar (60),
telefone varchar (20),
senha varchar(30)
);

create table Pratos (
id int primary key,
nome varchar,
descricao varchar (1000),
preco numeric (5,2),
quantidade int,
imagem varchar (500),
categorias varchar(200)
);

create table Endereco(
id_cliente int references Usuarios(id),
bairro varchar(20),
rua varchar(100),
n_casa int
);

create table Compras (
id_cliente int references Usuarios(id),
id_produto int references Pratos(id),
quantidade int,
data date,
preco_total numeric(5,2) 
);

create table menu (
cardapio_dia int references Pratos(id)
);
