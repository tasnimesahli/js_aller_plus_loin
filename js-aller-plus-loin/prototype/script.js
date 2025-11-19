const apiKey = "7c9e5a6b9875d15f4ebff3394fc017a5";

function chercherMeteo(ville) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ville)}&appid=${apiKey}&units=metric`;

  document.getElementById("météo").innerHTML = "Chargement...";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("météo").innerHTML = "Ville non trouvée!";
        return;
      }

      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const vent = data.wind.speed;
      const humidite = data.main.humidity;
      const villeName = data.name;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

      document.getElementById("météo").innerHTML = `
        <h2 class="ville">${villeName}</h2>
        <img class="icone" src="${iconUrl}" alt="${desc}" />
        <p class="temperature">Température: ${temp}°C</p>
        <p class="description">Description: ${desc}</p>
        <p class="vent">Vitesse du vent: ${vent} m/s</p>
        <p class="humidite">Humidité: ${humidite}%</p>
      `;
    })
    .catch(error => {
      console.log("Error:", error);
      document.getElementById("météo").innerHTML = "Impossible de charger la météo.";
    });
}

chercherMeteo("Tanger");

document.getElementById("btnChercher").addEventListener("click", () => {
  const ville = document.getElementById("villeInput").value.trim();
  if (ville) chercherMeteo(ville);
});

document.getElementById("villeInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const ville = e.target.value.trim();
    if (ville) chercherMeteo(ville);
  }
});
