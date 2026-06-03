# 🚀 Melhorias - Calculadora de CO₂

## ✨ Animações Adicionadas

### Animações Globais
- **fadeIn** - Fade suave de entrada
- **slideInDown** - Desliza para baixo
- **slideInUp** - Desliza para cima
- **slideInLeft** - Desliza da esquerda
- **slideInRight** - Desliza da direita
- **scaleIn** - Escala suave
- **pulse** - Pulsação
- **shimmer** - Brilho
- **float** - Flutuação suave

### Elementos com Animação
- ✅ Header (título e subtítulo)
- ✅ Formulário (campos com delay progressivo)
- ✅ Botão de cálculo
- ✅ Seção de resultados
- ✅ Tabela de comparação
- ✅ Cards de créditos de carbono
- ✅ Footer

### Transições Interativas
- Inputs com foco (glow effect e elevação)
- Botões com hover (gradiente invertido e sombra)
- Cards com hover (elevação e sombra)
- Tabelas com hover (fundo e escala)

---

## 🎨 Design System - CSS Centralizado

### Variáveis Globais (`:root`)
Todas as configurações de estilo estão centralizadas:

```css
--color-primary: #4CAF50
--color-secondary: #2196F3
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.16)
--spacing-lg: 24px
--font-size-2xl: 2rem
--transition-base: 300ms ease-out
```

### Componentes Organizados

#### Header
- Título com sombra de texto
- Subtítulo com opacidade
- Animação de entrada suave

#### Formulário
- Campos com espaçamento consistente
- Labels com tipografia moderna
- Inputs com estados (focus, hover, disabled)
- Botão com gradiente e animação

#### Resultados
- Cards com grid responsivo
- Cores por tipo de resultado (perigo, sucesso, aviso)
- Animações escalonadas

#### Tabela de Comparação
- Headers com gradiente
- Linhas com hover effect
- Badges de nível de emissão (🟢 🟡 🔴)

#### Créditos de Carbono
- Background com gradiente
- Layout grid responsivo
- Animações em cascata

---

## 🔧 CONFIG.js - Configurações Centralizadas

Novo arquivo `js/config.js` centraliza:

### Configurações da App
```javascript
appName: 'Calculadora de Emissão de CO₂'
version: '1.0.0'
language: 'pt-BR'
```

### Seletores de DOM
```javascript
selectors: {
  form: '#co2-form',
  transport: '#transport',
  origin: '#origin',
  destination: '#destination',
  distance: '#distance',
  button: '.calculator__button',
  results: '#results',
  // ... mais
}
```

### Configurações de Animação
```javascript
animations: {
  enabled: true,
  duration: 300,
  delayBetweenElements: 50
}
```

### Validação de Formulário
```javascript
validation: {
  requireDistance: true,
  requireTransport: true,
  minDistance: 0.1,
  maxDistance: 10000
}
```

### Precificação e Fatores de Emissão
```javascript
pricing: {
  min: 0.01,
  average: 15.0,
  max: 100.0
}
```

---

## 📱 Responsividade

### Breakpoints Implementados
- **Desktop** - Fullscreen com animações completas
- **Tablet** (≤ 768px) - Ajustes de espaçamento e tipografia
- **Mobile** (≤ 480px) - Grid ajustado, fonte reduzida

---

## 🎯 Funcionalidades Mantidas

- ✅ Cálculo automático de distância entre cidades
- ✅ Comparação de emissões por modo de transporte
- ✅ Cálculo de créditos de carbono
- ✅ Validação de formulário
- ✅ Formatação de moeda (BRL)

---

## 📊 Estrutura de Arquivos

```
carbon-calculator/
├── css/
│   └── style.css          # ✨ CSS moderno com variáveis e animações
├── js/
│   ├── config.js          # 🔧 Configurações centralizadas
│   ├── calculator.js      # 📊 Lógica de cálculo
│   ├── ui.js              # 🎨 Gerenciador de UI
│   ├── routes-data.js     # 🗺️  Dados de cidades
│   └── app.js             # 🚀 Inicialização da app
└── index.html             # 📄 HTML semântico
```

---

## 🌟 Melhorias Visuais

1. **Paleta de cores moderna** - Cores vibrantes e acessíveis
2. **Tipografia limpa** - Inter (fallback: system fonts)
3. **Espaçamento consistente** - Sistema 8px baseado em variáveis
4. **Sombras realistas** - Elevação com 4 níveis
5. **Transições suaves** - 150ms, 300ms, 500ms e cubic-bezier
6. **Animações em cascata** - Elementos entram em sequência
7. **Hover effects** - Feedback visual em todos os interativos
8. **Loading states** - Estados de carregamento claros

---

## 💡 Dicas de Customização

Para alterar cores, edite `:root` no CSS:

```css
:root {
  --color-primary: #4CAF50;      /* Verde sustentável */
  --color-secondary: #2196F3;    /* Azul moderno */
}
```

Para ajustar velocidade de animações:

```css
:root {
  --transition-fast: 150ms ease-out;
  --transition-base: 300ms ease-out;
  --transition-slow: 500ms ease-out;
}
```

---

## 🚀 Como Usar

1. Abra `index.html` no navegador
2. Selecione o modo de transporte
3. Digite origem e destino
4. A distância será preenchida automaticamente
5. Clique em "Calcular Emissão"
6. Veja os resultados com animações lindas! 🎉

---

## 📝 Notas

- ✨ Todas as animações são suaves e não prejudicam a acessibilidade
- 🎨 Design system facilita manutenção futura
- 📱 Responsivo para todos os dispositivos
- ♿ Semântica HTML adequada
- 🔧 Fácil de customizar via CSS

---

**Versão:** 1.0.0  
**Data:** 2026-06-03  
**Status:** ✅ Pronto para produção
