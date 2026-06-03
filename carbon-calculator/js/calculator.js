// Created Calculator.js with global GTCCalc object
const GTCCalc = {
  // Emission factors by transportation mode (kg CO2 per km)
  EMISSION_FACTORS: {
    car: 0.21,
    bus: 0.089,
    train: 0.041,
    plane: 0.285,
    bike: 0,
    walking: 0
  },

  // Carbon credit pricing
  CARBON_PRICE_MIN: 0.01,    // minimum price per kg CO2
  CARBON_PRICE_AVERAGE: 15.0, // average price per kg CO2
  CARBON_PRICE_MAX: 100.0,    // maximum price per kg CO2

  // GTCCalculator.co2 - calculates CO2 for distance + mode
  co2: function(distance, mode) {
    // Validates inputs and calculates CO2 emissions for a given distance and transportation mode
    if (!distance || distance <= 0) return 0;
    if (!this.EMISSION_FACTORS[mode]) {
      console.error(`Invalid transportation mode: ${mode}`);
      return 0;
    }
    // Returns CO2 in kg
    return distance * this.EMISSION_FACTORS[mode];
  },
  
  // GTCCalculator.co2ByMode - calculates emissions for all modes
  co2ByMode: function(distance) {
    // Calculates emissions for all modes with a given distance
    if (!distance || distance <= 0) return {};
    
    const emissions = {};
    for (let mode in this.EMISSION_FACTORS) {
      emissions[mode] = this.co2(distance, mode);
    }
    // Returns object with emissions per mode
    return emissions;
  },
  
  // GTCCalculator.co2Total - calculates total emissions
  co2Total: function(emissions) {
    // Calculates total emissions from object or array of emissions
    if (!emissions) return 0;
    
    if (Array.isArray(emissions)) {
      return emissions.reduce((sum, val) => sum + (val || 0), 0);
    }
    // Returns sum of all emissions
    return Object.values(emissions).reduce((sum, val) => sum + (val || 0), 0);
  },
  
  // GTCCalculator.carbonCredit - compares two emissions, returns result
  carbonCredit: function(emissionA, emissionB) {
    // Compares two emissions and calculates credit difference
    if (!emissionA || !emissionB) {
      console.error("Both emission values are required");
      return 0;
    }
    
    // Returns credits result (difference in kg CO2)
    return emissionB - emissionA;
  },
  
  // GTCCalculator.carbonCreditUSD - converts kg CO2 to carbon
  carbonCreditUSD: function(kgCO2) {
    // Converts kg CO2 to carbon credits/USD with min/average/max values
    if (!kgCO2 || kgCO2 <= 0) {
      return { min: 0, average: 0, max: 0 };
    }
    
    // Calculates min/average/max based on pricing factors
    return {
      min: this.formatNumber(kgCO2 * this.CARBON_PRICE_MIN),
      average: this.formatNumber(kgCO2 * this.CARBON_PRICE_AVERAGE),
      max: this.formatNumber(kgCO2 * this.CARBON_PRICE_MAX)
    };
  },
  
  // formatNumber - format comments and edge case handling (division by zero)
  formatNumber: function(value) {
    // Formats number with 2 decimal places and handles edge cases
    if (isNaN(value) || value === null || value === undefined) {
      console.warn("Invalid value for formatting");
      return 0.0; // Division by zero handling
    }
    // Returns formatted value rounded to 2 decimals
    return Math.round(value * 100) / 100;
  }
};

// Global variable exported for use
const Calculator = GTCCalc;
