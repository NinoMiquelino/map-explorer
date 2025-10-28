## 👨‍💻 Autor

<div align="center">
  <img src="https://avatars.githubusercontent.com/ninomiquelino" width="100" height="100" style="border-radius: 50%">
  <br>
  <strong>Onivaldo Miquelino</strong>
  <br>
  <a href="https://github.com/ninomiquelino">@ninomiquelino</a>
</div>

---

# 🗺️ MapExplorer

[![Leaflet.js](https://img.shields.io/badge/Leaflet.js-1.9.4-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-OSM-7EBC6F?logo=openstreetmap&logoColor=white)](https://www.openstreetmap.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/javascript)
[![Responsive](https://img.shields.io/badge/Design-Responsive-667eea?logo=responsive)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
![License MIT](https://img.shields.io/badge/License-MIT-green)
![Status Stable](https://img.shields.io/badge/Status-Stable-success)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue)
![GitHub stars](https://img.shields.io/github/stars/NinoMiquelino/map-explorer?style=social)
![GitHub forks](https://img.shields.io/github/forks/NinoMiquelino/map-explorer?style=social)
![GitHub issues](https://img.shields.io/github/issues/NinoMiquelino/map-explorer)
![Last Commit](https://img.shields.io/github/last-commit/NinoMiquelino/map-explorer)
![Code Size](https://img.shields.io/github/languages/code-size/NinoMiquelino/map-explorer)

> Plataforma interativa de exploração de mapas com interface moderna e recursos avançados de geolocalização.

---

## 🚀 Funcionalidades Principais

### 🗺️ Mapa Interativo
- **🌍 Múltiplas Camadas** - Ruas, Satélite e Topográfico
- **🔍 Zoom e Navegação** - Controles intuitivos de navegação
- **🎯 Centralização Rápida** - Botão para retornar à visão inicial
- **📱 Touch-Friendly** - Otimizado para dispositivos touch

### 📍 Geolocalização Avançada
- **📍 Minha Localização** - Detecta e centraliza na posição atual
- **🎯 Precisão Visual** - Círculo de precisão do GPS
- **📊 Informações Detalhadas** - Coordenadas, endereço e precisão
- **🔄 Acompanhamento** - Atualização em tempo real (opcional)

### 🔍 Busca Inteligente
- **🏠 Busca por Endereço** - Usa Nominatim para geocodificação
- **📋 Múltiplos Resultados** - Lista com várias opções de localização
- **✈️ Navegação Rápida** - Fly-to animation para resultados
- **🎯 Marcadores Automáticos** - Adiciona marcadores nos locais buscados

### 📌 Sistema de Marcadores
- **➕ Adicionar Manualmente** - Clique no mapa para adicionar
- **🗑️ Gerenciamento** - Remover individualmente ou limpar todos
- **💬 Popups Informativos** - Detalhes em balões interativos
- **📊 Contador em Tempo Real** - Acompanhamento de marcadores ativos

### 📱 Interface Responsiva
- **📱 Mobile-First** - Design otimizado para dispositivos móveis
- **💻 Desktop Optimized** - Experiência completa em desktop
- **🎨 Tailwind CSS** - Design system consistente e moderno
- **🌙 Dark Mode Ready** - Suporte a preferências do sistema

## 🛠️ Stack Tecnológica

### Mapa & Geospatial
- **Leaflet.js 1.9.4** - Biblioteca principal de mapas interativos
- **OpenStreetMap** - Dados de mapa gratuitos e abertos
- **Nominatim API** - Geocodificação e busca reversa
- **Web Geolocation API** - API nativa de geolocalização

### Frontend & UI/UX
- **Tailwind CSS 3.x** - Framework CSS utility-first
- **JavaScript ES6+** - Lógica de aplicação moderna
- **Font Awesome 6** - Ícones e elementos visuais
- **CSS3 Custom** - Animações e estilos personalizados

### Performance & UX
- **Lazy Loading** - Carregamento otimizado de recursos
- **Responsive Images** - Imagens adaptáveis a diferentes telas
- **Smooth Animations** - Transições suaves e feedback visual
- **Progressive Enhancement** - Funcionalidade básica sempre disponível

## 📁 Estrutura do Projeto

```

map-explorer/
├──📄 index.html                    # Página principal
├──🎨 styles/
│└── main.css                    # Estilos customizados
├──⚡ js/
│├── app.js                      # Aplicação principal
│├── map.js                      # Gerenciamento do mapa
│├── geolocation.js              # Geolocalização
│└── ui.js                       # Interface do usuário
├──📱 assets/
│├── icons/                      # Ícones e imagens
│└── screenshots/                # Capturas de tela
├──📚 docs/
│└── implementation.md           # Documentação técnica
└──📖 README.md                    # Este arquivo

```

## ⚡ Instalação Rápida

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para carregar tiles do mapa)
- Permissão de localização (para geolocalização)

### 🚀 Implementação Instantânea

1. **Clone o repositório**
   ```bash
   git clone https://github.com/NinoMiquelino/map-explorer.git
   cd map-explorer
```

1. Sirva os arquivos (qualquer servidor web)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # PHP
   php -S localhost:8000
   
   # Node.js (http-server)
   npx http-server
   
   # Live Server (VS Code)
   # Instale a extensão Live Server e clique em "Go Live"
   ```
2. Acesse a aplicação
   ```
   http://localhost:8000
   ```

🌐 Deploy em Produção

Opção 1: GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

Opção 2: Netlify

1. Conecte seu repositório ao Netlify
2. Configurações de build:
   · Build Command: (deixe vazio)
   · Publish Directory: ./
3. Deploy automático a cada push

Opção 3: Vercel

```json
// vercel.json
{
  "version": 2,
  "name": "map-explorer",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

🎯 Como Usar

🗺️ Navegação Básica

1. Arraste o mapa para navegar
2. Use a roda do mouse ou botões +/- para zoom
3. Clique em qualquer lugar para ver coordenadas e endereço

📍 Geolocalização

1. Clique em "Minha Localização"
2. Permita o acesso à localização no navegador
3. Veja suas coordenadas e precisão no painel lateral

🔍 Busca por Endereço

1. Digite um endereço no campo de busca
2. Clique em buscar ou pressione Enter
3. Selecione um resultado da lista para navegar até o local

📌 Gerenciando Marcadores

· Adicionar: Clique no mapa ou use o botão "Adicionar Marcador"
· Remover: Clique no marcador → "Remover"
· Limpar Todos: Use o botão "Limpar Marcadores"

🎨 Camadas do Mapa

· Ruas: Vista padrão do OpenStreetMap
· Satélite: Imagens de satélite (ArcGIS)
· Topográfico: Mapa topográfico (OpenTopoMap)

🔧 Personalização

Modificar Estilos

```css
/* styles/main.css */
:root {
  --primary-color: #seu_azul;
  --secondary-color: #seu_cinza;
}

.leaflet-popup-content {
  /* Customizar popups */
}
```

Adicionar Novas Camadas

```javascript
// js/map.js
this.layers.cycle = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
  attribution: '© CyclOSM contributors',
  maxZoom: 20
});
```

Configurar Localização Inicial

```javascript
// js/map.js
// Alterar view inicial
this.map.setView([-23.5505, -46.6333], 10); // São Paulo
```

🌐 APIs Utilizadas

OpenStreetMap Nominatim

```javascript
// Geocodificação direta
https://nominatim.openstreetmap.org/search?format=json&q={query}

// Geocodificação reversa
https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lng}
```

Tile Servers

· OpenStreetMap: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
· ArcGIS Satellite: https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
· OpenTopoMap: https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png

📱 Compatibilidade

Navegadores Suportados

Navegador Versão Suporte<br>
Chrome 60+ ✅ Completo<br>
Firefox 55+ ✅ Completo<br>
Safari 12+ ✅ Completo<br>
Edge 79+ ✅ Completo<br>
Mobile Safari 12+ ✅ Completo<br>
Chrome Mobile 60+ ✅ Completo

Funcionalidades por Dispositivo

Funcionalidade Desktop Mobile Tablet<br>
Mapa Interativo ✅ ✅ ✅<br>
Geolocalização ✅ ✅ ✅<br>
Busca por Endereço ✅ ✅ ✅<br
Marcadores ✅ ✅ ✅<br>
Múltiplas Camadas ✅ ✅ ✅<br>
Touch Gestures ⚠️ ✅ ✅

🐛 Troubleshooting

Problemas Comuns

Geolocalização não funciona

· Verifique as permissões do navegador
· Certifique-se de que HTTPS está habilitado (em produção)
· Teste em diferentes navegadores

Mapa não carrega

· Verifique conexão com internet
· Confirme se os tiles estão acessíveis
· Cheque o console do navegador para erros

Busca não retorna resultados

· API Nominatim pode estar temporariamente indisponível
· Verifique a formatação do endereço
· Tente termos de busca mais específicos

Debug no Console

```javascript
// Acesse a instância do mapa no console
mapManager.map // Instância do Leaflet
mapManager.markers // Array de marcadores
```

🤝 Contribuindo

Contribuições são bem-vindas! Siga estos passos:

1. Fork o projeto
2. Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)
3. Commit suas mudanças (git commit -m 'Add some AmazingFeature')
4. Push para a branch (git push origin feature/AmazingFeature)
5. Abra um Pull Request

📋 Padrões de Código

· Use JavaScript ES6+ moderno
· Siga as convenções do Leaflet.js
· Mantenha a responsividade
· Documente novas funcionalidades

🚀 Roadmap

Próximas Funcionalidades

· Rotas e Direções - Calculadora de rotas
· Áreas e Polígonos - Desenho de áreas no mapa
· Export de Dados - Salvar marcadores em JSON/GPX
· Mapas Temáticos - Dados demográficos e estatísticos
· Colaboração - Compartilhamento de mapas em tempo real
· Offline Support - Cache de tiles para uso offline
· 3D View - Visualização em três dimensões
· Historical Maps - Mapas históricos e comparativos

🙏 Agradecimentos

· Leaflet.js pela incrível biblioteca de mapas
· OpenStreetMap pelos dados de mapa abertos
· Tailwind CSS pelo framework CSS
· Font Awesome pelos ícones

---

⭐ Se este projeto foi útil, deixe uma estrela no repositório!

https://api.star-history.com/svg?repos=NinoMiquelino/map-explorer&type=Date

---

<div align="center">

Desenvolvido com ❤️ usando Leaflet.js, OpenStreetMap e Tailwind CSS

</div>

---

## 🤝 Contribuições
Contribuições são sempre bem-vindas!  
Sinta-se à vontade para abrir uma [*issue*](https://github.com/NinoMiquelino/map-explorer/issues) com sugestões ou enviar um [*pull request*](https://github.com/NinoMiquelino/map-explorer/pulls) com melhorias.

---

## 💬 Contato
📧 [Entre em contato pelo LinkedIn](https://www.linkedin.com/in/onivaldomiquelino/)  
💻 Desenvolvido por **Onivaldo Miquelino**

---
