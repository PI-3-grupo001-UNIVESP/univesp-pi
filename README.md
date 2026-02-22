# univesp-pi

Repositório para os códigos usados no Projeto Integrador da Universidade Virtual do Estado de São Paulo.

---------------------------------------------------------------------------------------------------------

#  Sistema de Proteção Animal

Sistema web desenvolvido para gerenciamento de uma ONG de proteção animal.

##  Objetivo

Permitir:

- Cadastro de animais com imagem
- Registro de adoções
- Dashboard com gráfico
- Área administrativa protegida
- Exportação automática para Excel

---------------------------------------------------------------------------------------------------------

#  Arquitetura

Aplicação Full Stack baseada em:

Frontend (React + Vite)  
Backend (Node.js + Express)  
Banco de Dados PostgreSQL  
Exportação em Excel (.xlsx)

---------------------------------------------------------------------------------------------------------

#  Tecnologias Utilizadas

## Backend

- Node.js
- Express
- PostgreSQL
- pg
- Multer
- XLSX
- Cors
- Dotenv
- Nodemon

## Frontend

- React
- Vite
- Axios
- React ChartJS 2
- Chart.js
- CSS

---------------------------------------------------------------------------------------------------------

# // * backend: *//

## Iniciar o backend:

```bash
cd backend
npx nodemon server.js
```

## Checar se funciona:

```bash
http://localhost:3001
http://localhost:3001/animais
```


# // * frontend: *//

## Iniciar o frontend:

```bash
cd frontend
npm install
npm run dev
```

## Checar se funciona:

```bash
http://localhost:5173/
```

---------------------------------------------------------------------------------------------------------

#  🔐 Para uso do Admin

Usuário: admin
Senha: 1234
