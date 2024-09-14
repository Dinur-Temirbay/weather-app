const key = "b92d1e81367afb2dac6a386894973c30";

const fetchWeather = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  try {
    const res = await fetch(URL);

    if (res.ok) {
      const json = await res.json();
      console.log(json);
      renderWeather(json);
    } else {
      console.error(`Ошибка: ${res.status} ${res.statusText}`);
      renderWeather({ error: "Город не найден" });
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    renderWeather({ error: "Ошибка загрузки данных" });
  }
};

const footerIcon = [
  "/assets/clouds.png",
  "/assets/humidity.png",
  "/assets/windy.png",
];

function renderWeather(data) {
  const weatherContainer = document.querySelector(".weather-container");
  const weatherFooter = document.querySelector(".weather-footer");
  weatherContainer.innerHTML = "";
  weatherFooter.innerHTML = "";

  if (data.error) {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = data.error;
    errorDiv.style.fontSize = "14px";
    weatherContainer.appendChild(errorDiv);
    return;
  }

  const weatherIcon = data.weather[0].icon;
  const weatherDescr = data.weather[0].main;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;

  const img = document.createElement("img");
  const div = document.createElement("div");
  const p = document.createElement("p");

  img.src = iconUrl;
  img.style.width = "230px";

  div.textContent = `${Math.trunc(data.main.temp)}°`;
  p.textContent = `${weatherDescr}`;

  weatherContainer.appendChild(img);
  weatherContainer.appendChild(div);
  weatherContainer.appendChild(p);

  const icons = [
    { src: footerIcon[0], text: `${data.clouds.all}%` },
    { src: footerIcon[1], text: `${data.main.humidity}%` },
    { src: footerIcon[2], text: `${Math.trunc(data.wind.speed)} km/h` },
  ];

  icons.forEach((iconData) => {
    const iconDiv = document.createElement("div");

    const iconImg = document.createElement("img");
    iconImg.src = iconData.src;

    const iconText = document.createElement("span");
    iconText.textContent = iconData.text;

    iconDiv.appendChild(iconImg);
    iconDiv.appendChild(iconText);
    weatherFooter.appendChild(iconDiv);
  });
}

document.getElementById("search-button").addEventListener("click", () => {
  const cityInput = document.getElementById("city-input").value;
  if (cityInput) {
    fetchWeather(cityInput);
  }
});
