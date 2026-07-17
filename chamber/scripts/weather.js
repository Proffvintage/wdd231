const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#figcaption');
const forecastContainer = document.querySelector('#forecast-container');

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=South%20Jordan&units=imperial&appid=a9a6fcc7253378aa3fa145c35cf3c3c0';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=South%20Jordan&units=imperial&appid=a9a6fcc7253378aa3fa145c35cf3c3c0';

async function fetchWeather() {
  try {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    if (!weatherRes.ok) throw new Error(`Weather API error: ${weatherRes.status}`);
    if (!forecastRes.ok) throw new Error(`Forecast API error: ${forecastRes.status}`);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
  } catch (error) {
    console.error('Weather fetch error:', error);
  }
}

function displayCurrentWeather(data) {
  if (currentTemp) currentTemp.textContent = `${Math.round(data.main.temp)}°F`;

  if (weatherIcon) {
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
  }
  if (captionDesc) {
    captionDesc.textContent = data.weather[0].description;
  }
}

function displayForecast(data) {
  if (!forecastContainer) return;
  forecastContainer.innerHTML = '';

  const today = new Date();
  const todayDateString = today.toDateString();

  const dailyForecasts = {};

  data.list.forEach(item => {
    // Parse time in local timezone
    const itemDate = new Date(item.dt * 1000);
    const itemDateString = itemDate.toDateString();

    // Skip today to get the next 3 days
    if (itemDateString === todayDateString) return;

    if (!dailyForecasts[itemDateString]) {
      dailyForecasts[itemDateString] = [];
    }
    dailyForecasts[itemDateString].push(item);
  });

  // Get keys, sort them by actual date, and pick the first 3
  const sortedKeys = Object.keys(dailyForecasts).sort((a, b) => new Date(a) - new Date(b));
  const nextThreeDaysKeys = sortedKeys.slice(0, 3);

  nextThreeDaysKeys.forEach(key => {
    const dayItems = dailyForecasts[key];
    // Find forecast item closest to midday (12:00:00)
    const midDayItem = dayItems.reduce((prev, curr) => {
      const prevHour = new Date(prev.dt * 1000).getHours();
      const currHour = new Date(curr.dt * 1000).getHours();
      return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
    });

    const dateObj = new Date(midDayItem.dt * 1000);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(midDayItem.main.temp);
    const icon = midDayItem.weather[0].icon;
    const desc = midDayItem.weather[0].description;

    const forecastCard = document.createElement('div');
    forecastCard.className = 'forecast-day';
    forecastCard.innerHTML = `
      <span class="forecast-label">${dayName}</span>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" class="forecast-icon" loading="lazy">
      <span class="forecast-temp">${temp}°F</span>
    `;
    forecastContainer.appendChild(forecastCard);
  });
}

fetchWeather();
