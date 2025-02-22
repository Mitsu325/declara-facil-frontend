# Declara Fácil

Este projeto é dividido em duas partes: o frontend, desenvolvido com Angular, e o backend, desenvolvido com NestJS. O sistema utiliza um banco de dados PostgreSQL, e é necessário que o servidor do banco de dados esteja configurado na máquina local para a execução do backend.

## Requisitos

- **Node.js** (versão >= 20.x)
- **Angular CLI** (versão >= 18.x)
- **npm** (gerenciador de pacotes do Node.js)

## Configuração do Banco de Dados

Certifique-se de ter o PostgreSQL instalado e rodando na sua máquina. Você precisará configurar um banco de dados e garantir que as credenciais estejam corretas no arquivo `.env` (explicado abaixo).

## Configuração

1. Entre na pasta frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run start
   ```

4. Acesse o frontend no navegador:
	http://localhost:4200
