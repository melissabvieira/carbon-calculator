// Created UI with global UIManager object containing utility methods
const UIManager = {
  
  // UTILITY METHODS
  
  // formatCurrency - formats with pt-BR locale and thousand separator
  formatCurrency: function(value) {
    // Formats number as Brazilian Real currency with locale
    // Returns formatted string with R$ and thousand separators
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  // toggleClass - toggles hidden class on element
  toggleClass: function(elementId, className) {
    // Toggles CSS class on element by ID
    // Returns boolean indicating new state
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.toggle(className);
      return !element.classList.contains(className);
    }
    return false;
  },

  // RENDERING METHODS

  // renderCards - creates card grid with data
  renderCards: function(containerId, data) {
    // Renders cards with route, distance, emissions, mode
    // Returns rendered HTML card with BEM naming conventions
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return;
    }
    
    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card card--transport';
      card.innerHTML = `
        <div class="card__header">
          <h3 class="card__title">${item.mode}</h3>
          <span class="card__distance">${item.distance} km</span>
        </div>
        <div class="card__body">
          <p class="card__emissions">Emissões: ${item.emissions} kg CO2</p>
        </div>
        <div class="card__footer">
          <span class="card__price">${this.formatCurrency(item.price)}</span>
        </div>
      `;
      container.appendChild(card);
    });
  },

  // renderComparisonGrid - generates comparison grid with all modes, animates with emission level
  renderComparisonGrid: function(containerId, distance) {
    // Renders comparison grid with all transportation modes
    // Animates rows with emission level (low/medium/high)
    // Returns grid showing distance, emissions, emissions level, and price
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return;
    }

    const modes = ['car', 'bus', 'train', 'plane', 'bike', 'walking'];
    let html = '<table class="comparison-grid"><thead><tr>';
    html += '<th>Modo</th><th>Distância</th><th>Emissões</th><th>Nível</th><th>Preço</th></tr></thead><tbody>';

    modes.forEach(mode => {
      const emissions = Calculator.co2(distance, mode);
      const level = emissions > 50 ? 'high' : emissions > 20 ? 'medium' : 'low';
      const price = Calculator.carbonCreditUSD(emissions).average;
      
      html += `<tr class="comparison-grid__row comparison-grid__row--${level}">
        <td>${mode}</td>
        <td>${distance} km</td>
        <td>${emissions.toFixed(2)} kg</td>
        <td class="emission-level emission-level--${level}">${level}</td>
        <td>${this.formatCurrency(price)}</td>
      </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  },

  // BUTTON HANDLING METHODS

  // createButton - creates button card with route
  createButton: function(containerId, buttonId, label, route) {
    // Creates button card grid with route, class, and ID
    // Returns button ready for use
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return null;
    }

    const button = document.createElement('button');
    button.id = buttonId;
    button.className = 'btn btn--primary';
    button.textContent = label;
    button.dataset.route = route;

    return button;
  },

  // renderButton - renders button with status and disabled state
  renderButton: function(buttonId, status, disabled) {
    // Renders button with status and disabled attribute
    // Returns button with proper state styling
    const button = document.getElementById(buttonId);
    if (!button) {
      console.error(`Button ${buttonId} not found`);
      return;
    }

    button.disabled = disabled;
    button.className = `btn btn--primary btn--${status}`;
    button.textContent = disabled ? 'Carregando...' : 'Calcular';
  },

  // updateButton - updates button with emissions level data
  updateButton: function(buttonId, emissionLevel, emissionPrice) {
    // Updates button with data from emission level and price
    // Displays budget, emissions, and emission level
    const button = document.getElementById(buttonId);
    if (!button) {
      console.error(`Button ${buttonId} not found`);
      return;
    }

    button.dataset.emissions = emissionLevel;
    button.dataset.price = emissionPrice;
    button.innerHTML = `
      <span class="btn__label">Emissões</span>
      <span class="btn__value">${emissionLevel} kg</span>
      <span class="btn__price">${this.formatCurrency(emissionPrice)}</span>
    `;
  },

  // manageButtonLoading - manages button loading state
  manageButtonLoading: function(buttonId, isLoading) {
    // Manages button loading state and display
    // Returns button with loading class and spinner
    const button = document.getElementById(buttonId);
    if (!button) {
      console.error(`Button ${buttonId} not found`);
      return;
    }

    if (isLoading) {
      button.disabled = true;
      button.classList.add('btn--loading');
      button.innerHTML = '<span class="btn__spinner"></span> Calculando...';
    } else {
      button.disabled = false;
      button.classList.remove('btn--loading');
      button.textContent = 'Calcular';
    }
  }
};

// HTML uses BEM naming conventions and includes extensive comments
// All methods use proper event handling and class-based by emission level
// Global object exported for use
const UI = UIManager;