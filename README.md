# SaaS B2B Platform

<p align="center">
  <img src="./public/logo.png" width="120" alt="SaaS B2B Logo"/>
</p>

<p align="center">
  Plataforma SaaS moderna para gestão de clientes, empresas, projetos e operações comerciais.
</p>

<p align="center">
  <a href="https://github.com/Lazarin123/SaaS---B2B"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github"></a>
  <a href="#"><img src="https://img.shields.io/badge/Status-FINALIZADO-2563EB?style=for-the-badge"></a>
  <img src="https://img.shields.io/badge/License-MIT-059669?style=for-the-badge">
</p>

---

## Sobre o projeto

O **SaaS B2B Platform** é uma aplicação Full Stack desenvolvida para empresas que desejam centralizar seus processos comerciais em um único ambiente.

A plataforma oferece uma experiência moderna em **Dark Mode**, arquitetura escalável e interface responsiva, permitindo o gerenciamento de clientes, equipes, indicadores e fluxos operacionais.

> Projeto desenvolvido por **Samuel Lazarin** como portfólio profissional e base para soluções SaaS empresariais.

---

## Demonstração

| Ambiente    | Link                                     |
| ----------- | ---------------------------------------- |
| Repositório | https://github.com/Lazarin123/SaaS---B2B |
| Web App     | Em breve                                 |

---

## Funcionalidades

- Dashboard executivo em tempo real
- Gestão de clientes (CRM)
- Cadastro de empresas e contatos
- Indicadores e métricas
- Sistema de autenticação
- Perfis de usuários
- Interface totalmente responsiva
- Dark Mode premium
- Arquitetura preparada para APIs
- Componentização com React + TypeScript

---

## Tecnologias

### Front-end

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Back-end

- Node.js
- Express
- REST API

### Banco de Dados

- PostgreSQL
- Prisma ORM

### Ferramentas

- Git & GitHub
- ESLint
- Prettier
- Vercel

---

## Estrutura do projeto

```text
SaaS---B2B/
│
├── public/
├── docs/
│   ├── dashboard.png
│   └── mockup.png
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   ├── routes/
│   ├── styles/
│   └── utils/
│
├── prisma/
├── server/
├── .env.example
├── package.json
└── README.md
```

---

## Instalação

### 1. Clone o projeto

```bash
git clone https://github.com/Lazarin123/SaaS---B2B.git
```

### 2. Entre na pasta

```bash
cd SaaS---B2B
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis

Crie um arquivo `.env` baseado no `.env.example`.

```env
DATABASE_URL=
JWT_SECRET=
VITE_API_URL=
```

### 5. Execute

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

---

## Roadmap

- [x] Estrutura inicial
- [x] Dashboard
- [x] Layout responsivo
- [ ] Login JWT
- [ ] Multiempresa
- [ ] Gestão de usuários
- [ ] Permissões (RBAC)
- [ ] Notificações
- [ ] Auditoria de ações
- [ ] Integração com IA
- [ ] Aplicativo Mobile

---

## Arquitetura

```text
 React + Vite
       │
 REST API
       │
 Node.js + Express
       │
 Prisma ORM
       │
 PostgreSQL
```

---

## Boas práticas

- Arquitetura escalável
- Componentes reutilizáveis
- Tipagem completa com TypeScript
- Organização por módulos
- Código limpo (Clean Code)
- Responsividade Mobile First

---

## Autor

### Samuel Lazarin

Desenvolvedor Full Stack | QA Automation | Software Engineer

- GitHub: https://github.com/Lazarin123
- LinkedIn: https://linkedin.com/in/samuel-lazarin

---

## Licença

Este projeto está sob a licença **MIT**.

---

<p align="center">
  Desenvolvido por <strong>Samuel Lazarin</strong>
</p>
