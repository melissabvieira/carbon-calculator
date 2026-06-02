function setupDistanceAutofill() {
    // Obtém os elementos de origem e destino
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');

    // Adiciona listeners para origem e destino
    function updateDistance() {
        const origin = originInput.value.trim();
        const destination = destinationInput.value.trim();

        // Verifica se ambos os campos possuem valor
        if (!origin || !destination) {
            distanceInput.value = '';
            return;
        }

        // Busca a distância
        const distance = findDistance(origin, destination);

        // Preenche o campo distância
        if (distance !== null) {
            distanceInput.value = distance;
        } else {
            distanceInput.value = '';
        }
    }

    originInput.addEventListener('change', updateDistance);
    destinationInput.addEventListener('change', updateDistance);
    originInput.addEventListener('input', updateDistance);
    destinationInput.addEventListener('input', updateDistance);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupDistanceAutofill();
});