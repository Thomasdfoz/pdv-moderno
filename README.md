# PDV Moderno 🛒

Sistema de Ponto de Venda (PDV) moderno e completo desenvolvido com **React**, **Vite** e **Tailwind CSS v4**.

![PDV Dashboard](https://img.shields.io/badge/Status-Concluído-success)
![React](https://img.shields.io/badge/React-19.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff)

## 🚀 Funcionalidades

### 📊 Dashboard
- Estatísticas em tempo real de vendas e receita
- Alertas de estoque baixo
- Feed de vendas recentes
- Métricas diárias e totais

### 💰 Ponto de Venda (PDV)
- Interface intuitiva com grid de produtos
- Sistema de carrinho interativo
- Busca e filtro de produtos
- Checkout com múltiplas formas de pagamento (Dinheiro, Cartão, Pix)
- Atualização automática de estoque

### 📦 Gestão de Produtos
- CRUD completo (Criar, Ler, Atualizar, Deletar)
- Campos: Nome, Código de Barras, Categoria, Preço, Custo, Estoque
- Sistema de busca e filtros
- Indicadores visuais de nível de estoque

### 📈 Histórico de Vendas
- Lista cronológica de todas as transações
- Detalhes expandíveis de cada venda
- Busca por produtos, data e forma de pagamento
- Estatísticas de vendas

## 🎨 Design

- **Dark Mode Premium**: Paleta de cores moderna com slate e cores vibrantes
- **Glassmorphism**: Efeitos de vidro com backdrop blur
- **Animações Suaves**: Transições e micro-interações
- **Responsivo**: Layout adaptável com navegação lateral
- **Tipografia Profissional**: Fonte Inter do Google Fonts

## 🛠️ Tecnologias

- **Frontend**: React 19.2
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: Context API
- **Storage**: LocalStorage para persistência

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/pdv-moderno.git
cd pdv-moderno
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🗂️ Estrutura do Projeto

```
pdv/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes reutilizáveis
│   │   └── Layout.jsx    # Layout principal
│   ├── context/
│   │   └── StoreContext.jsx  # Estado global
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── PDV.jsx
│   │   ├── Products.jsx
│   │   └── Sales.jsx
│   ├── lib/
│   │   └── utils.js      # Funções utilitárias
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

## 🎯 Dados de Exemplo

O sistema vem com 5 produtos pré-carregados:
- Coca-Cola 2L - R$ 8,50
- Pão Francês - R$ 0,50
- Leite Integral 1L - R$ 5,20
- Arroz 5kg - R$ 28,90
- Feijão Preto 1kg - R$ 8,90

## 💾 Persistência de Dados

Todos os dados (produtos, vendas) são armazenados no LocalStorage do navegador, permitindo que as informações persistam entre sessões.

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ usando React + Vite + Tailwind CSS
