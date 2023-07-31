// Função para preencher os campos "Latitude", "Longitude" e "Rua"
function preencherCampos(latitude, longitude, streetName, city) {
  document.getElementById("latitude").value = latitude.toFixed(6);
  document.getElementById("longitude").value = longitude.toFixed(6);
  document.getElementById("street").value = streetName;

  const citySelect = document.getElementById("city");
  const cityOption = document.querySelector(`#city option[value="${city}"]`);
  if (cityOption) {
    citySelect.value = city;
    showBairros();
  }
}

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

// Função para obter a localização
function obterLocalizacao() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Obter o nome da rua e cidade (Geocodificação Reversa)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          const streetName = data.address.road;
          const city = data.address.city;
          preencherCampos(latitude, longitude, streetName, city);
        })
        .catch((error) => {
          console.error("Erro ao obter o nome da rua: ", error.message);
          preencherCampos(
            latitude,
            longitude,
            "Não foi possível obter o nome da rua.",
            "Não foi possível obter o município."
          );
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
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  if (isNaN(latitude) || isNaN(longitude)) {
    alert("Latitude e Longitude devem ser números válidos.");
    return;
  }

  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  window.open(url, "_blank");
}

// Vincula as funções aos botões
document.getElementById("getLocationButton").addEventListener("click", obterLocalizacao);
document.getElementById("viewOnMapButton").addEventListener("click", visualizarNoMapa);
document.getElementById("city").addEventListener("change", showBairros);








// Seleciona o elemento input do campo "ID da Câmera"
const cameraIdInput = document.getElementById("cameraId");

// Adiciona um evento de input para o campo
cameraIdInput.addEventListener("input", function() {
  // Obtém o valor atual do campo
  let value = cameraIdInput.value;

  // Remove todos os caracteres diferentes de dígitos
  value = value.replace(/\D/g, "");

  // Verifica se o valor possui pelo menos 2 dígitos
  if (value.length >= 2) {
    // Insere o "-" após o segundo dígito
    value = value.substring(0, 2) + "-" + value.substring(2);
  }

  // Atualiza o valor do campo
  cameraIdInput.value = value;
});




