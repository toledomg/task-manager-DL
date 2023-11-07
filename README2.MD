<h1 align="center"> Projeto: TaskNot (Task Manager with Notification) </h1>

<h3 align="center"> 
	🚀 Desafio curso Daniele Leão
</h3>

## 💡 Introdução

- Essa API tem por objetivo, oferecer uma plataforma, para que o usuário, pudesse fazer gestão de suas tarefas e receber notificações de suas tarefas via email.

## 📚 Requisitos

#### Cadastro de Usuário do sistema;

- Nome
- Username
- Email
- Tipo de Usuário (Admin, ou User)

#### Cadastro de Tarefas;

- Título
- Descrição
- Data Inicial
- Data Final
- Prioridade
- Status

#### Cron de Tarefas;

- Criar um cron onde o usuário receba por email suas tarefas diárias

#### Fazer uso do nestJs como framework e Prisma como ORM, e banco de dados PostgreSQL para desenvolvimento da aplicação;

#### Em toda a aplicação, tanto o usuário quanto as tarefas devem ter as operações básicas de um CRUD;

#### Um usuário poderá ter mais de uma tarefa vinculado a ele;

#### Implementação do JWT e UserGuards para validação e autenticação de usuário, com regras distintas de acesso a determinadas rotas, implementadas com a biblioteca APP_GUARDS do nestJs;

#### Implementação de envio de notificações ao usuário usando um serviço de email SMTP;

- Nessa aplicação, optamos por usar o KAFKA, e criamos um micro-serviço usando o nestJs, focado somente na administração de eventos de notificação, com isso temos o Task-Manager com as tarefas informando ao Micro-Serviço através de um cron, as tarefas do dia, o microservice recebe esse cron e fica responsável pela notificação ao usuário, usando um servidor de email SMTP;

#### Implementação de file-upload de um avatar para o usuário, usando o multer e supabase para hospedar as imagens;

#### Implementar logs na aplicação, garantindo uma resposta amigável ao Desenvolvedor de Erros, para isso usamos uma biblioteca chamada Logger do próprio nestJs ;

## 💫 Links

- API: `https://task-manager-api-tpso.onrender.com`

## 🚚 Documentação API / Rotas da Aplicação

- [Documentação](https://task-manager-api-tpso.onrender.com/docs)

### 🎲 Rodando o sistema

<Details>

## Clonar o repositório

```bash
git clone https://github.com/toledomg/task-manager-DL.git
```

### 💾 Instale as dependências Backend

```bash
yarn
```

### 💾 Variáveis de Ambiente

- Crie um arquivo .env com o comando abaixo e preencha os dados correspondentes;

```bash
cp .env.example .env
```

### 💾 Migrations

```bash
npx prisma migrate dev
```

### 💾 Rodar servidor local Backend

```bash
yarn start:dev
```

Url API Local: `http://localhost:3015`

</Details>

## 🤝 Contribuições

- **Alexsandro Toledo**

  - [Github](https://github.com/toledomg)
  - [Linkedin](https://www.linkedin.com/in/toledomg/)
