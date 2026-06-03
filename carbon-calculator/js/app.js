// Create App.js with initialization and event handling
// Create an immediately invoked function expression (IIFE) or use DOMContentLoaded

// App initialization wrapper
const App = (function() {
  
  // Private variables
  let isInitialized = false;
  let config = {};

  // INITIALIZATION (when DOM is ready)
  function init() {
    if (isInitialized) {
      console.warn('App already initialized');
      return;
    }

    console.log('Initializing App...');
    
    // Call CONFIG.setupDatabase/AutoInit to enable auto-init
    if (typeof CONFIG !== 'undefined' && CONFIG.setupDatabaseAutoInit) {
      CONFIG.setupDatabaseAutoInit();
    }

    // Setup event listeners
    setupEventListeners();
    
    isInitialized = true;
    console.log('App initialized successfully');
  }

  // Setup all event listeners
  function setupEventListeners() {
    // Call CONFIG.setupEventListeners() to enable functionality
    if (typeof CONFIG !== 'undefined' && CONFIG.setupEventListeners) {
      CONFIG.setupEventListeners();
    }

    // Add submit event listener to form
    const form = document.getElementById('calculator-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    // Add input listeners to inputs
    const distanceInput = document.getElementById('distance');
    const modeSelect = document.getElementById('transport-mode');
    
    if (distanceInput) {
      distanceInput.addEventListener('input', handleDistanceChange);
      distanceInput.addEventListener('change', handleDistanceChange);
    }

    if (modeSelect) {
      modeSelect.addEventListener('change', handleModeChange);
    }

    console.log('Event listeners setup complete');
  }

  // Event handlers
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');

    const distance = document.getElementById('distance')?.value;
    const mode = document.getElementById('transport-mode')?.value;

    if (!distance || !mode) {
      console.error('Distance and mode are required');
      UI.manageButtonLoading('calculate-btn', false);
      return;
    }

    calculateEmissions(parseFloat(distance), mode);
  }

  function handleDistanceChange(e) {
    console.log('Distance changed:', e.target.value);
    const distance = parseFloat(e.target.value);
    
    if (distance && distance > 0) {
      updatePreview(distance);
    }
  }

  function handleModeChange(e) {
    console.log('Transport mode changed:', e.target.value);
    const mode = e.target.value;
    const distance = parseFloat(document.getElementById('distance')?.value);
    
    if (distance && distance > 0) {
      updatePreview(distance);
    }
  }

  // Calculate emissions based on inputs
  function calculateEmissions(distance, mode) {
    UI.manageButtonLoading('calculate-btn', true);

    try {
      // Calculate CO2
      const co2 = Calculator.co2(distance, mode);
      
      // Get carbon credit USD
      const creditUSD = Calculator.carbonCreditUSD(co2);
      
      // Display results
      displayResults(distance, mode, co2, creditUSD);
      
      console.log(`Calculated: ${distance}km by ${mode} = ${co2}kg CO2`);
    } catch (error) {
      console.error('Error calculating emissions:', error);
      alert('Erro ao calcular emissões. Tente novamente.');
    } finally {
      UI.manageButtonLoading('calculate-btn', false);
    }
  }

  // Update preview with current inputs
  function updatePreview(distance) {
    const mode = document.getElementById('transport-mode')?.value || 'car';
    const co2 = Calculator.co2(distance, mode);
    const creditUSD = Calculator.carbonCreditUSD(co2);

    const previewDiv = document.getElementById('preview-results');
    if (previewDiv) {
      previewDiv.innerHTML = `
        <div class="preview">
          <p>Distância: <strong>${distance} km</strong></p>
          <p>Modo: <strong>${mode}</strong></p>
          <p>Emissões: <strong>${co2.toFixed(2)} kg CO2</strong></p>
          <p>Preço (média): <strong>${UI.formatCurrency(creditUSD.average)}</strong></p>
        </div>
      `;
    }
  }

  // Display results in UI
  function displayResults(distance, mode, co2, creditUSD) {
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
      console.error('Results container not found');
      return;
    }

    const resultHTML = `
      <div class="results-card">
        <h2>Resultados do Cálculo</h2>
        <div class="results-content">
          <div class="result-item">
            <label>Distância:</label>
            <span>${distance} km</span>
          </div>
          <div class="result-item">
            <label>Modo de Transporte:</label>
            <span>${mode}</span>
          </div>
          <div class="result-item">
            <label>Emissões de CO2:</label>
            <span class="highlight">${co2.toFixed(2)} kg</span>
          </div>
          <div class="result-item">
            <label>Preço Mínimo:</label>
            <span>${UI.formatCurrency(creditUSD.min)}</span>
          </div>
          <div class="result-item">
            <label>Preço Médio:</label>
            <span class="highlight">${UI.formatCurrency(creditUSD.average)}</span>
          </div>
          <div class="result-item">
            <label>Preço Máximo:</label>
            <span>${UI.formatCurrency(creditUSD.max)}</span>
          </div>
        </div>
      </div>
    `;

    resultsDiv.innerHTML = resultHTML;
    resultsDiv.style.display = 'block';
  }

  // Public API
  return {
    init: init,
    calculateEmissions: calculateEmissions,
    updatePreview: updatePreview,
    displayResults: displayResults
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}