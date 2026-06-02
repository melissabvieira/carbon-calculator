const cities = {
    "rio branco": { state: "AC", lat: -9.9754, lon: -67.8249 },
    "maceio": { state: "AL", lat: -9.6658, lon: -35.7353 },
    "macapa": { state: "AP", lat: 0.0349, lon: -51.0694 },
    "manaus": { state: "AM", lat: -3.119, lon: -60.0217 },
    "salvador": { state: "BA", lat: -12.9777, lon: -38.5016 },
    "fortaleza": { state: "CE", lat: -3.7319, lon: -38.5267 },
    "brasilia": { state: "DF", lat: -15.7939, lon: -47.8828 },
    "vitoria": { state: "ES", lat: -20.3155, lon: -40.3128 },
    "goiania": { state: "GO", lat: -16.6869, lon: -49.2648 },
    "sao luis": { state: "MA", lat: -2.5307, lon: -44.3068 },
    "cuiaba": { state: "MT", lat: -15.601, lon: -56.0974 },
    "campo grande": { state: "MS", lat: -20.4697, lon: -54.6201 },
    "belo horizonte": { state: "MG", lat: -19.9167, lon: -43.9345 },
    "belem": { state: "PA", lat: -1.4558, lon: -48.5039 },
    "joao pessoa": { state: "PB", lat: -7.1195, lon: -34.845 },
    "curitiba": { state: "PR", lat: -25.4284, lon: -49.2733 },
    "recife": { state: "PE", lat: -8.0476, lon: -34.877 },
    "teresina": { state: "PI", lat: -5.0892, lon: -42.8019 },
    "rio de janeiro": { state: "RJ", lat: -22.9068, lon: -43.1729 },
    "natal": { state: "RN", lat: -5.7793, lon: -35.2009 },
    "porto alegre": { state: "RS", lat: -30.0346, lon: -51.2177 },
    "porto velho": { state: "RO", lat: -8.7619, lon: -63.9039 },
    "boa vista": { state: "RR", lat: 2.8235, lon: -60.6758 },
    "florianopolis": { state: "SC", lat: -27.5949, lon: -48.5482 },
    "sao paulo": { state: "SP", lat: -23.5505, lon: -46.6333 },
    "aracaju": { state: "SE", lat: -10.9472, lon: -37.0731 },
    "palmas": { state: "TO", lat: -10.184, lon: -48.3336 }
};

function normalizeText(text) {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function toRadians(value) {
    return value * Math.PI / 180;
}

function calculateDistance(cityA, cityB) {
    const earthRadius = 6371;

    const latDistance = toRadians(cityB.lat - cityA.lat);
    const lonDistance = toRadians(cityB.lon - cityA.lon);

    const a =
        Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
        Math.cos(toRadians(cityA.lat)) *
        Math.cos(toRadians(cityB.lat)) *
        Math.sin(lonDistance / 2) *
        Math.sin(lonDistance / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(earthRadius * c);
}

function findDistance(origin, destination) {
    const normalizedOrigin = normalizeText(origin);
    const normalizedDestination = normalizeText(destination);

    const originCity = cities[normalizedOrigin];
    const destinationCity = cities[normalizedDestination];

    if (!originCity || !destinationCity) {
        return null;
    }

    return calculateDistance(originCity, destinationCity);
}