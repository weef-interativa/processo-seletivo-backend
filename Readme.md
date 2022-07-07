**Desafio:**

Criar uma listagem de eventos com Node.js e framework Nest https://nestjs.com/


**Tarefas:**

- Criar um projeto utilizando o Nestjs e banco de dados PostgreSQL;

- Criar uma seção de autenticação com Login / Senha, gerar um JWT e disponibilziar no swagger;

- Criar um CRUD para a área de eventos com rota autenticada (Bearer Token) e disponibilizar no swagger;

Dados do evento:

- Data do evento

- Nome do evento

- Responsável

- Cidade

- Estado

- Endereço

- Complemento

- E-mail

- Telefone

- Imagens


**Dicas:**

Utilize a documentação oficial do NestJS. 


**Diferenciais:**

Utilizar o Docker para montar os servicos Node e PostreSQL;

Escrever os commits utilizando o padrão Git Commit Guidelines https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines

Criar a branch e realizar o pullrequest utilizando o padrão do GitFlow https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20is%20a%20legacy%20Git,software%20development%20and%20DevOps%20practices.

**Entrega do teste:**

A entrega do código deve ser feita em um pull request neste repositório.

**Execução do teste:**

Rodar o comando: ```docker-compose up -- build```

Documentação em http://localhost:3000/doc