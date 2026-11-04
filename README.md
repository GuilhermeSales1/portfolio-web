# Portfólio — Guilherme Sales

Portfólio pessoal desenvolvido com Next.js e TypeScript para apresentar projetos, habilidades e experiências na área de desenvolvimento de software.

O projeto também possui uma área administrativa para gerenciamento de mensagens recebidas pelo formulário de contato e seleção de projetos em destaque.

## Tecnologias

- **Next.js 16** — Framework React com App Router.
- **React 19** — Construção da interface.
- **TypeScript** — Tipagem estática.
- **Tailwind CSS 4** — Estilização responsiva.
- **Supabase** — Autenticação e banco de dados.
- **Resend** — Envio de e-mails.
- **Vitest** — Testes automatizados.
- **Husky e lint-staged** — Verificações antes dos commits.
- **Vercel** — Hospedagem e deploy contínuo.

## Funcionalidades

- Apresentação pessoal e de habilidades.
- Listagem dinâmica de projetos utilizando a API do GitHub.
- Páginas individuais para cada projeto.
- Formulário de contato com validação de campos.
- Armazenamento de mensagens no Supabase.
- Notificações por e-mail utilizando Resend.
- Autenticação e proteção da área administrativa.
- Dashboard para visualizar mensagens e gerenciar projetos em destaque.
- Alternância entre temas claro e escuro.
- Interface responsiva.

## Arquitetura

O projeto utiliza o App Router do Next.js e separa responsabilidades entre interface, serviços e lógica de negócio.

Principais diretórios:

```text
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   └── projetos/
├── components/
├── services/
└── proxy.ts
```

- `app/`: páginas, rotas e ações do servidor.
- `components/`: componentes reutilizáveis da interface.
- `services/`: integração com serviços externos.
- `proxy.ts`: proteção e atualização da sessão de autenticação.

## Configuração local

### 1. Pré-requisitos

- Node.js
- npm
- Conta e projeto no Supabase
- Chave de API do Resend

### 2. Instalação

Clone o repositório:

```bash
git clone https://github.com/GuilhermeSales1/portfolio-web.git
cd portfolio-web
```

Instale as dependências:

```bash
npm install
```

### 3. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto, utilizando `.env.example` como referência.

Configure as seguintes variáveis:

| Variável                               | Descrição                        |
| -------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | URL do projeto Supabase          |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave pública do Supabase        |
| `SUPABASE_ADMIN_USER_ID`               | ID do usuário administrador      |
| `RESEND_API_KEY`                       | Chave de API do Resend           |
| `CONTACT_EMAIL`                        | E-mail que receberá as mensagens |

Nunca compartilhe ou envie suas chaves privadas para o repositório.

### 4. Executar o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Testes e qualidade

Executar os testes:

```bash
npm test
```

Executar o ESLint:

```bash
npm run lint
```

Verificar a formatação:

```bash
npm run format:check
```

Gerar a versão de produção:

```bash
npm run build
```

O projeto utiliza Husky e lint-staged para executar verificações automaticamente antes dos commits.

## Deploy

O projeto está hospedado na Vercel, integrado ao GitHub.

Novas alterações enviadas para a branch `main` acionam automaticamente um novo deploy de produção.

## Autor

**Guilherme Sales**

[GitHub](https://github.com/GuilhermeSales1)
