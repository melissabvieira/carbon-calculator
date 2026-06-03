/* =============================================
   CONFIGURAÇÕES CENTRALIZADAS - CONFIG.JS
   ============================================= */

const CONFIG = {
  /* APP SETTINGS */
  appName: 'Calculadora de Emissão de CO₂',
  version: '1.0.0',
  language: 'pt-BR',

  /* DOM ELEMENTS SELECTORS */
  selectors: {
    form: '#co2-form',
    transport: '#transport',
    origin: '#origin',
    destination: '#destination',
    distance: '#distance',
    button: '.calculator__button',
    results: '#results',
    resultsContent: '#results-content',
    comparison: '#comparison',
    comparisonContent: '#comparison-content',
    carbonCredits: '#carbon-credits',
    carbonCreditsContent: '#carbon-credits-content'
  },

  /* ANIMATION SETTINGS */
  animations: {
    enabled: true,
    duration: 300,
    delayBetweenElements: 50
  },

  /* FORM VALIDATION */
  validation: {
    requireDistance: true,
    requireTransport: true,
    minDistance: 0.1,
    maxDistance: 10000
  },

  /* CARBON CREDIT PRICING */
  pricing: {
    min: 0.01,
    average: 15.0,
    max: 100.0
  },

  /* EMISSION FACTORS (kg CO2 per km) */
  emissionFactors: {
    bicycle: 0,
    car: 0.21,
    bus: 0.089,
    truck: 0.15
  },

  /* Initialize all event listeners */
  setupEventListeners: function() {
    const form = document.querySelector(this.selectors.form);
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }

    // Setup distance autofill
    this.setupDistanceAutofill();

    // Setup real-time preview
    this.setupLivePreview();

    console.log('✓ Event listeners configured');
  },

  /* Handle form submission */
  handleFormSubmit: function() {
    const transport = document.querySelector(this.selectors.transport).value;
    const origin = document.querySelector(this.selectors.origin).value;
    const destination = document.querySelector(this.selectors.destination).value;
    const distance = parseFloat(document.querySelector(this.selectors.distance).value);

    // Validation
    if (!this.validateForm(origin, destination, distance, transport)) {
      return;
    }

    this.calculateAndDisplay(distance, transport);
  },

  /* Validate form inputs */
  validateForm: function(origin, destination, distance, transport) {
    if (!origin.trim()) {
      alert('Por favor, preencha a origem');
      return false;
    }
    if (!destination.trim()) {
      alert('Por favor, preencha o destino');
      return false;
    }
    if (!distance || distance < this.validation.minDistance) {
      alert('Distância inválida. Certifique-se de que origem e destino existem.');
      return false;
    }
    if (!transport) {
      alert('Por favor, selecione um meio de transporte');
      return false;
    }
    return true;
  },

  /* Calculate and display results */
  calculateAndDisplay: function(distance, transport) {
    const button = document.querySelector(this.selectors.button);
    if (button) {
      button.disabled = true;
      button.style.opacity = '0.6';
    }

    try {
      const co2 = Calculator.co2(distance, transport);
      const creditUSD = Calculator.carbonCreditUSD(co2);

      this.displayResults(distance, transport, co2, creditUSD);
      this.displayComparison(distance);
      this.displayCarbonCredits(co2, creditUSD);

    } catch (error) {
      console.error('Erro ao calcular emissões:', error);
      alert('Erro ao calcular. Tente novamente.');
    } finally {
      if (button) {
        button.disabled = false;
        button.style.opacity = '1';
      }
    }
  },

  /* Display main results */
  displayResults: function(distance, transport, co2, creditUSD) {
    const resultsSection = document.querySelector(this.selectors.results);
    const resultsContent = document.querySelector(this.selectors.resultsContent);

    if (!resultsContent) return;

    const html = `
      <div class="results-card" style="animation: slideInUp 0.5s ease-out">
        <h3 style="margin-bottom: 16px; font-size: 1.25rem; font-weight: 600; color: #1a1a1a;">
          🎯 Resultados do Cálculo
        </h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="result-item" style="padding: 16px; background: #f5f5f5; border-radius: 8px; animation: slideInLeft 0.4s ease-out 100ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">📍 Distância</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #4CAF50;">${distance.toFixed(0)} km</span>
          </div>

          <div class="result-item" style="padding: 16px; background: #f5f5f5; border-radius: 8px; animation: slideInLeft 0.4s ease-out 200ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">🚗 Transporte</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #2196F3; text-transform: capitalize;">${transport}</span>
          </div>

          <div class="result-item" style="padding: 16px; background: rgba(244, 67, 54, 0.1); border-radius: 8px; border-left: 4px solid #F44336; animation: slideInLeft 0.4s ease-out 300ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #F44336; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">💨 CO₂ Emitido</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #F44336;">${co2.toFixed(2)} kg</span>
          </div>

          <div class="result-item" style="padding: 16px; background: rgba(76, 175, 80, 0.1); border-radius: 8px; border-left: 4px solid #4CAF50; animation: slideInLeft 0.4s ease-out 400ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #4CAF50; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">💰 Preço Mínimo</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #4CAF50;">${this.formatCurrency(creditUSD.min)}</span>
          </div>

          <div class="result-item" style="padding: 16px; background: rgba(255, 152, 0, 0.1); border-radius: 8px; border-left: 4px solid #FF9800; animation: slideInLeft 0.4s ease-out 500ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #FF9800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">💵 Preço Médio</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #FF9800;">${this.formatCurrency(creditUSD.average)}</span>
          </div>

          <div class="result-item" style="padding: 16px; background: rgba(244, 67, 54, 0.1); border-radius: 8px; border-left: 4px solid #F44336; animation: slideInLeft 0.4s ease-out 600ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #F44336; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">💸 Preço Máximo</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #F44336;">${this.formatCurrency(creditUSD.max)}</span>
          </div>
        </div>
      </div>
    `;

    resultsContent.innerHTML = html;
    resultsSection.removeAttribute('hidden');
  },

  /* Display comparison table */
  displayComparison: function(distance) {
    const comparisonContent = document.querySelector(this.selectors.comparisonContent);
    if (!comparisonContent) return;

    const modes = Object.keys(this.emissionFactors);
    let html = '<div style="overflow-x: auto; animation: scaleIn 0.5s ease-out 200ms both;">';
    html += '<table class="comparison-grid">';
    html += '<thead><tr><th>🚗 Modo</th><th>📏 Distância</th><th>💨 Emissões</th><th>📊 Nível</th><th>💰 Preço</th></tr></thead><tbody>';

    modes.forEach((mode, index) => {
      const emissions = Calculator.co2(distance, mode);
      const level = emissions > 50 ? 'high' : emissions > 20 ? 'medium' : 'low';
      const price = Calculator.carbonCreditUSD(emissions).average;

      const levelLabel = {
        low: '🟢 Baixo',
        medium: '🟡 Médio',
        high: '🔴 Alto'
      }[level];

      html += `<tr class="comparison-grid__row comparison-grid__row--${level}" style="animation: slideInLeft 0.4s ease-out ${300 + index * 50}ms both;">
        <td style="font-weight: 600; text-transform: capitalize;">${mode}</td>
        <td>${distance} km</td>
        <td style="font-weight: 600;">${emissions.toFixed(2)} kg</td>
        <td><span class="emission-level emission-level--${level}">${levelLabel}</span></td>
        <td>${this.formatCurrency(price)}</td>
      </tr>`;
    });

    html += '</tbody></table></div>';
    comparisonContent.innerHTML = html;
  },

  /* Display carbon credits info */
  displayCarbonCredits: function(co2, creditUSD) {
    const carbonCreditsContent = document.querySelector(this.selectors.carbonCreditsContent);
    if (!carbonCreditsContent) return;

    const html = `
      <div style="animation: slideInUp 0.5s ease-out 400ms both; padding: 16px; background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%); border-radius: 8px; border-left: 4px solid #4CAF50;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
          <div style="animation: fadeIn 0.5s ease-out 500ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">🌱 CO₂ Total</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #4CAF50;">${co2.toFixed(2)} kg</span>
          </div>

          <div style="animation: fadeIn 0.5s ease-out 600ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">💚 Preço Crédito</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #2196F3;">${this.formatCurrency(creditUSD.average)}</span>
          </div>

          <div style="animation: fadeIn 0.5s ease-out 700ms both;">
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">🌍 Equivalência</label>
            <span style="display: block; font-size: 1.5rem; font-weight: 700; color: #FF9800;">${(co2 / 1000).toFixed(2)} ton</span>
          </div>
        </div>

        <p style="margin-top: 16px; font-size: 0.875rem; color: #666; font-style: italic; animation: fadeIn 0.5s ease-out 800ms both;">
          💡 A compra de créditos de carbono ajuda a compensar suas emissões e apoiar projetos de sustentabilidade.
        </p>
      </div>
    `;

    carbonCreditsContent.innerHTML = html;
  },

  /* Setup distance autofill */
  setupDistanceAutofill: function() {
    const originInput = document.querySelector(this.selectors.origin);
    const destinationInput = document.querySelector(this.selectors.destination);
    const distanceInput = document.querySelector(this.selectors.distance);

    if (!originInput || !destinationInput || !distanceInput) return;

    const updateDistance = () => {
      const origin = originInput.value.trim();
      const destination = destinationInput.value.trim();

      if (!origin || !destination) {
        distanceInput.value = '';
        return;
      }

      const distance = findDistance(origin, destination);
      distanceInput.value = distance !== null ? distance : '';
    };

    originInput.addEventListener('change', updateDistance);
    destinationInput.addEventListener('change', updateDistance);
    originInput.addEventListener('input', updateDistance);
    destinationInput.addEventListener('input', updateDistance);

    console.log('✓ Distance autofill configured');
  },

  /* Setup live preview */
  setupLivePreview: function() {
    const distanceInput = document.querySelector(this.selectors.distance);
    const transportSelect = document.querySelector(this.selectors.transport);

    if (!distanceInput || !transportSelect) return;

    // Placeholder for live preview if needed
    console.log('✓ Live preview configured');
  },

  /* Format currency */
  formatCurrency: function(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  /* Initialize app */
  init: function() {
    console.log(`🚀 ${this.appName} v${this.version} inicializado`);
    this.setupEventListeners();
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CONFIG.init());
} else {
  CONFIG.init();
}
