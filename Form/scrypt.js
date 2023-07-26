function showBairros() {
  const citySelect = document.getElementById("city");
  const neighborhoodSelect = document.getElementById("neighborhood");
  const selectedCity = citySelect.value;

  // Limpar as opções existentes
  neighborhoodSelect.innerHTML = '<option value="" selected disabled>Selecione um bairro</option>';

  // Adicionar as opções de bairros para cada município selecionado
  if (selectedCity === "PORTO SEGURO") {
    const bairrosPortoSeguro = ["Centro", "Cidade Alta", "Cidade Baixa", "Orla Norte", "Arraial D'Ajuda", "Trancoso", "Caraíva"];
    for (const bairro of bairrosPortoSeguro) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  } else if (selectedCity === "SANTA CRUZ CABRALIA") {
    const bairrosSantaCruz = ["Coroa Vermelha", "Nova Cabralia", "Centro", "Campinho", "Tânia", "Capitão Luiz de Matos"];
    for (const bairro of bairrosSantaCruz) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  } else if (selectedCity === "BELMONTE") {
    const bairrosBelmonte = ["Centro", "Ponta de Areia", "Visgueira", "São Benedito", "Bom Jargim", "Nova Belmonte", "Biéla", "Barrolandia", "Santa Maria Eterna", "Boca do Corrego"];
    for (const bairro of bairrosBelmonte) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  } else if (selectedCity === "EUNAPOLIS") {
    const bairrosEunapolis = ["Moises Reis", "Pequi", "Santa Lucia", "Itapuã", "Juca Rosa", "Mundo Novo", "Nacional", "Centro"];
    for (const bairro of bairrosEunapolis) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  } else if (selectedCity === "ITAGIMIRIM") {
    const bairrosItagimirim = ["Centro", "Rod BR-101"];
    for (const bairro of bairrosItagimirim) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  } else if (selectedCity === "ITABELA") {
    const bairrosItabela = ["Centro", "Rod BR-101", "Rod. BA-283"];
    for (const bairro of bairrosItabela) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  } else if (selectedCity === "ITAPEBI") {
    const bairrosItapebi = ["Centro", "Rod. BR-101"];
    for (const bairro of bairrosItapebi) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  } else if (selectedCity === "GUARATINGA") {
    const bairrosGuaratinga = ["Centro"];
    for (const bairro of bairrosGuaratinga) {
      const option = document.createElement("option");
      option.value = bairro;
      option.textContent = bairro;
      neighborhoodSelect.appendChild(option);
    }
  }

}


// Variáveis para armazenar a latitude e longitude selecionadas no mapa
let selectedLatitude = 0;
let selectedLongitude = 0;

// Inicializar o mapa
function initMap() {
  const mapContainer = document.getElementById("map");

  // Configuração inicial do mapa (centralizado no Brasil)
  const mapOptions = {
    center: { lat: -14.235, lng: -51.9253 },
    zoom: 6,
  };

  // Criar o mapa
  const map = new google.maps.Map(mapContainer, mapOptions);

  // Adicionar marcador clicável no mapa
  const marker = new google.maps.Marker({
    position: { lat: -14.235, lng: -51.9253 },
    map: map,
    draggable: true,
  });

  // Evento para atualizar a posição do marcador quando arrastado
  google.maps.event.addListener(marker, "dragend", function (event) {
    selectedLatitude = event.latLng.lat();
    selectedLongitude = event.latLng.lng();
  });
}

// Função para preencher os campos "Latitude", "Longitude" e "Rua"
function preencherCampos(latitude, longitude, streetName) {
  document.getElementById("latitude").value = latitude.toFixed(6);
  document.getElementById("longitude").value = longitude.toFixed(6);
  document.getElementById("street").value = streetName;
}

// Função que será chamada quando o botão "Obter Localização" for clicado
function obterLocalizacao() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Obter o nome da rua (Geocodificação Reversa)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          const streetName = data.address.road;
          preencherCampos(latitude, longitude, streetName);
          selectedLatitude = latitude;
          selectedLongitude = longitude;
        })
        .catch((error) => {
          console.error("Erro ao obter o nome da rua: ", error.message);
          preencherCampos(
            latitude,
            longitude,
            "Não foi possível obter o nome da rua."
          );
          selectedLatitude = latitude;
          selectedLongitude = longitude;
        });
    }, function (error) {
      console.error("Erro ao obter a localização: ", error.message);
    });
  } else {
    console.error("Geolocalização não é suportada pelo seu navegador.");
  }
}

// Função para visualizar a localização selecionada no mapa
function visualizarNoMapa() {
  if (selectedLatitude !== 0 && selectedLongitude !== 0) {
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedLatitude},${selectedLongitude}`;
    window.open(url, "_blank");
  } else {
    alert("Selecione uma localização no mapa antes de visualizar.");
  }
}

// Vincula as funções aos botões
document.getElementById("getLocationButton").addEventListener("click", obterLocalizacao);
document.getElementById("viewOnMapButton").addEventListener("click", visualizarNoMapa);






// Função para visualizar a localização selecionada no mapa
function visualizarNoMapa() {
  if (selectedLatitude !== 0 && selectedLongitude !== 0) {
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedLatitude},${selectedLongitude}`;
    window.open(url, "_blank");
  } else {
    alert("Selecione uma localização no mapa antes de visualizar.");
  }
}

// Vincula as funções aos botões
document.getElementById("getLocationButton").addEventListener("click", obterLocalizacao);
document.getElementById("viewOnMapButton").addEventListener("click", visualizarNoMapa);


// Função para abrir o Google Maps com a localização
function visualizarNoMapa() {
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  if (isNaN(latitude) || isNaN(longitude)) {
    alert("Latitude e Longitude devem ser números válidos.");
    return;
  }

  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  window.open(url, "_blank");
}
