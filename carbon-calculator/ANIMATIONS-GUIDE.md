/* 
   EXEMPLO DE ANIMAÇÕES IMPLEMENTADAS
   
   Este arquivo documenta todas as animações e transições
   adicionadas à Calculadora de CO₂
*/

/* =====================================================
   ANIMAÇÕES GLOBAIS (@keyframes)
   ===================================================== */

/* 1. FADE IN - Simples aparição */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
/* Uso: body, main, footer */
/* Duração: 500ms */


/* 2. SLIDE IN DOWN - Desce da parte superior */
@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);  /* Começa 20px acima */
    }
    to {
        opacity: 1;
        transform: translateY(0);      /* Termina na posição normal */
    }
}
/* Uso: header, header__title */
/* Duração: 500ms */


/* 3. SLIDE IN UP - Sobe da parte inferior */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);   /* Começa 20px abaixo */
    }
    to {
        opacity: 1;
        transform: translateY(0);      /* Termina na posição normal */
    }
}
/* Uso: calculator, results, footer */
/* Duração: 500ms com delays variados */


/* 4. SLIDE IN LEFT - Vem da esquerda */
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);  /* Começa 20px à esquerda */
    }
    to {
        opacity: 1;
        transform: translateX(0);      /* Termina na posição normal */
    }
}
/* Uso: calculator__title, calculator__field (com delays) */
/* Duração: 300ms (rápido) */


/* 5. SLIDE IN RIGHT - Vem da direita */
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(20px);   /* Começa 20px à direita */
    }
    to {
        opacity: 1;
        transform: translateX(0);      /* Termina na posição normal */
    }
}
/* Uso: Não usado atualmente, mas disponível */


/* 6. SCALE IN - Entra com zoom */
@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.95);        /* Começa 5% menor */
    }
    to {
        opacity: 1;
        transform: scale(1);           /* Termina no tamanho normal */
    }
}
/* Uso: comparison__content, carbon-credits__content */
/* Duração: 300ms */


/* 7. PULSE - Pulsação rítmica */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}
/* Uso: Disponível para elementos em carregamento */


/* 8. SHIMMER - Brilho deslizante */
@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
}
/* Uso: Disponível para skeleton loading */


/* 9. FLOAT - Flutuação suave */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);    /* Posição inicial */
    }
    50% {
        transform: translateY(-10px);  /* Sobe 10px no meio */
    }
}
/* Uso: Disponível para elementos flutuantes */


/* =====================================================
   TRANSIÇÕES INTERATIVAS (Em Componentes)
   ===================================================== */

/* INPUTS - Focus State */
.calculator__input:focus {
    border-color: #4CAF50;           /* Cor verde */
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);  /* Glow */
    transform: translateY(-1px);     /* Sobe 1px */
    transition: all 300ms ease-out;  /* Suave */
}
/* Efeito: Campo brilha e sobe levemente */


/* INPUTS - Hover State */
.calculator__input:hover {
    border-color: #66BB6A;           /* Verde mais claro */
    transition: all 300ms ease-out;
}
/* Efeito: Borda muda quando passa o mouse */


/* BUTTON - Hover State */
.calculator__button:hover {
    background: linear-gradient(135deg, #43A047 0%, #4CAF50 100%);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.20);  /* Sombra maior */
    transform: translateY(-2px);     /* Sobe 2px */
    transition: all 300ms ease-out;
}
/* Efeito: Botão sobe, sombra aumenta, gradiente inverte */


/* BUTTON - Active State */
.calculator__button:active {
    transform: translateY(0);        /* Volta ao normal */
    transition: all 100ms ease-out;  /* Muito rápido */
}
/* Efeito: Botão volta ao clicar */


/* CARD - Hover State */
.calculator:hover {
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.25);  /* Sombra xl */
    transform: translateY(-2px);     /* Sobe 2px */
    transition: all 300ms ease-out;
}
/* Efeito: Card levanta com sombra maior */


/* TABELA - Hover nas linhas */
.comparison-grid tbody tr:hover {
    background: #f5f5f5;             /* Fundo cinza */
    transform: scale(1.01);          /* Cresce 1% */
    transition: all 300ms ease-out;
}
/* Efeito: Linha destaca e cresce levemente */


/* =====================================================
   CASCATA DE ANIMAÇÃO (Delays Progressivos)
   ===================================================== */

/* Header - Entrada em cascata */
.header__title {
    animation: slideInDown 500ms cubic-bezier(0.4, 0, 0.2, 1) 100ms both;
}

.header__subtitle {
    animation: slideInDown 500ms cubic-bezier(0.4, 0, 0.2, 1) 200ms both;
}


/* Campos do formulário - Entrada progressiva */
.calculator__field:nth-child(1) {
    animation: slideInLeft 400ms ease-out 100ms both;
}

.calculator__field:nth-child(2) {
    animation: slideInLeft 400ms ease-out 200ms both;
}

.calculator__field:nth-child(3) {
    animation: slideInLeft 400ms ease-out 300ms both;
}

.calculator__field:nth-child(4) {
    animation: slideInLeft 400ms ease-out 400ms both;
}


/* Linhas da tabela - Entrada em cascata */
.comparison-grid tbody tr {
    animation: slideInLeft 400ms ease-out;
    animation-fill-mode: backwards;  /* Começa invisível */
}

/* A cada linha, adiciona mais delay */
.comparison-grid tbody tr:nth-child(1) { animation-delay: 300ms; }
.comparison-grid tbody tr:nth-child(2) { animation-delay: 350ms; }
.comparison-grid tbody tr:nth-child(3) { animation-delay: 400ms; }
.comparison-grid tbody tr:nth-child(4) { animation-delay: 450ms; }


/* =====================================================
   DURAÇÃO DAS ANIMAÇÕES (System)
   ===================================================== */

--transition-fast: 150ms ease-out;    /* Muito rápido */
--transition-base: 300ms ease-out;    /* Normal */
--transition-slow: 500ms ease-out;    /* Lento */

/* Curva de easing padrão */
--transition-cubic-bezier: cubic-bezier(0.4, 0, 0.2, 1);
/* Material Design standard easing */


/* =====================================================
   RESPONSIVE - Animações em Mobile
   ===================================================== */

@media (max-width: 768px) {
    /* Animações podem ser reduzidas para economizar bateria */
    * {
        --transition-base: 200ms ease-out;  /* Mais rápido em mobile */
    }
}


/* =====================================================
   ACCESSIBILITY - Respeita preferências do usuário
   ===================================================== */

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
/* Usuários que preferem menos movimento não veem animações */


/* =====================================================
   EXEMPLOS DE USO NA PÁGINA
   ===================================================== */

/*
TIMELINE COMPLETA DE ENTRADA:
═════════════════════════════

0ms      ► Body começa fade-in
100ms    ► Header slide-down
200ms    ► Title slide-down (delay 100ms extra)
300ms    ► Subtitle slide-down (delay 200ms extra)
300ms    ► Calculator slide-up
400ms    ► Campo 1 slide-left
500ms    ► Campo 2 slide-left
600ms    ► Campo 3 slide-left
700ms    ► Campo 4 slide-left
500ms    ► Botão slide-up
600ms    ► Footer slide-up

Total: ~1.2 segundos de animações suaves!


INTERAÇÃO AO CALCULAR:
═════════════════════

1. Usuário clica no botão
   → Button vai para baixo (-2px) instantly
   
2. Página processa (0.3s)
   → Button volta ao normal
   
3. Resultados aparecem:
   → Results fade-in (200ms delay)
   → Cards slide-up em cascata
   → Tabelas scale-in
   → Créditos fade-in
   
Total: ~1.5 segundos de animações lindas!
*/


/* =====================================================
   VARIÁVEIS DE CONTROLE
   ===================================================== */

/* Para ajustar velocidade geral, altere :root */
:root {
    --transition-fast: 150ms ease-out;
    --transition-base: 300ms ease-out;    /* ← Mude aqui */
    --transition-slow: 500ms ease-out;
}

/* Exemplos de mudança:
   - 150ms: Muito rápido (twitchy)
   - 300ms: Padrão (confortável) ← RECOMENDADO
   - 500ms: Lento (cinematic)
   - 1000ms: Muito lento (slow-mo)
*/
