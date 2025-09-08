# Frontend - Sistema de Cadastro

Este é o frontend para a API de cadastro de usuários e tarefas, desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **Lucide React** para ícones
- **Vite** como bundler

## 📦 Instalação

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🔧 Configuração

O frontend está configurado para se conectar com o backend na URL `http://localhost:8080`. 

Certifique-se de que seu backend Spring Boot esteja rodando nesta porta antes de usar o frontend.

## 📱 Funcionalidades

### Dashboard
- Visão geral com estatísticas de usuários e tarefas
- Cards com contadores de tarefas por status
- Listas de usuários e tarefas recentes

### Gerenciamento de Usuários
- Listagem de todos os usuários
- Cadastro de novos usuários
- Edição de usuários existentes
- Exclusão de usuários
- Associação de usuários a tarefas

### Gerenciamento de Tarefas
- Listagem de todas as tarefas
- Cadastro de novas tarefas
- Edição de tarefas existentes
- Exclusão de tarefas
- Controle de status (Pendente, Em Andamento, Finalizado)
- Associação de múltiplos usuários a uma tarefa

## 🎨 Interface

- Design moderno e responsivo
- Tema baseado em tons de azul
- Animações suaves e micro-interações
- Formulários modais para cadastro/edição
- Feedback visual para ações do usuário

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🔗 Integração com Backend

O frontend consome os seguintes endpoints da API:

### Usuários
- `GET /usuarios` - Lista todos os usuários
- `POST /usuarios` - Cadastra novo usuário
- `GET /usuarios/{id}` - Busca usuário por ID
- `PUT /usuarios/{id}` - Atualiza usuário
- `DELETE /usuarios/{id}` - Remove usuário

### Tarefas
- `GET /tarefas` - Lista todas as tarefas
- `POST /tarefas` - Cadastra nova tarefa
- `GET /tarefas/{id}` - Busca tarefa por ID
- `PUT /tarefas/{id}` - Atualiza tarefa
- `DELETE /tarefas/{id}` - Remove tarefa