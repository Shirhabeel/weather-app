const searchLogo = document.querySelector('.search-logo');
const searchInput = document.querySelector('.search-input');
const mainTemp = document.querySelector('.heading-temp');
const imgLocation = document.querySelector('.img-description');
const mainIcon = document.querySelector('.time-icon');
const img = document.querySelector('.image');

const cloudDesc = document.querySelector('.clouds');
const feelsLike = document.querySelector('.feel');

const cardH = document.querySelector('.humidity_card');
const valueH = document.querySelector('.humidity_value');

const cardP = document.querySelector('.pressure_card');
const valueP = document.querySelector('.pressure_value');

const cardW = document.querySelector('.wind_card');
const valueW = document.querySelector('.wind_value');

const cardV = document.querySelector('.visibility_card');
const valueV = document.querySelector('.visibility_value');

const cardSR = document.querySelector('.sunrise_Card');
const valueSR = document.querySelector('.sunrise_value');

const cardSS = document.querySelector('.sunset_card');
const valueSS = document.querySelector('.sunset_value');

const weekDay = document.querySelector('.weekday');
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${apiKey}`
let city;
const apiKey = '229d7e9e145bc6ef238b2a82a0550a4f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

// Getting the Week Day
const currentDate = new Date();
const hours = currentDate.getHours();
console.log(hours);
const today = function () {
  const options = { weekday: 'long' };
  // const options = {
  //   weekday: 'long', // Full weekday name (e.g., "Monday")
  //   year: 'numeric', // Full year (e.g., "2023")
  //   month: 'long', // Full month name (e.g., "October")
  //   day: 'numeric', // Day of the month (e.g., "10")
  // };
  const fullDayName = currentDate.toLocaleDateString(undefined, options);
  weekDay.innerHTML = `${fullDayName}`;
};

// Getting Sunrise/Sunset Time
let time;
const sunTime = function (timeStamp) {
  const curDate = new Date(timeStamp * 1000);
  const options = { hour: '2-digit', minute: '2-digit' };
  time = curDate.toLocaleString('en-US', options);
};

searchLogo.addEventListener('click', async function () {
  city = searchInput.value;
  if (city === '') {
    alert('Please type something :(');
  } else {
    searchInput.value = '';
    await weatherApp(apiKey, city);
  }
});

searchInput.addEventListener('keyup', async function (event) {
  if (event.key === 'Enter') {
    city = searchInput.value;
    if (city === '') {
      alert('Please type something :(');
    } else {
      searchInput.value = '';
      await weatherApp(apiKey, city);
    }
  }
});

async function weatherApp(key, location) {
  try {
    const response = await fetch(
      `${apiUrl}${location}&appid=${key}&units=metric`
    );
    const data = await response.json();
    console.log(data);

    if (!data.name) {
      throw new Error(`Please enter correct city name!`);
    }

    // Main Temperature Heading
    const mainTemperature = Math.round(data.main.temp);
    mainTemp.innerHTML = `${mainTemperature}&deg;C`;
    mainTemp.classList.remove('hidden');

    // Main Icon handle
    if ((hours >= 19 && hours <= 24) || (hours >= 1 && hours <= 5)) {
      mainIcon.innerHTML = `<img class="main-icon" src="img/moon.png" alt="Weather" />`;
    }
    if (hours > 5 && hours <= 18) {
      mainIcon.innerHTML = `<img class="main-icon" src="img/clear.png" alt="Weather" />`;
    }
    mainIcon.classList.remove('hidden');

    // Location Name on Image
    imgLocation.innerHTML = `${data.name}`;
    imgLocation.classList.remove('hidden');

    // Image handling
    img.classList.remove('hidden');

    // Weather Description
    const description = data.weather[0].description;
    cloudDesc.innerHTML = `${description}`;
    cloudDesc.classList.remove('hidden');
    // console.log(data.weather[0].description);

    // Feels Like
    feelsLike.innerHTML = `Feels like: ${Math.round(
      data.main.feels_like
    )}&deg;C`;
    feelsLike.classList.remove('hidden');

    // Humidity Card
    const humidity = Math.round(data.main.humidity);
    valueH.innerHTML = `${humidity}%`;
    cardH.classList.remove('hidden');

    // Pressure Card
    const pressure = data.main.pressure / 100;
    valueP.innerHTML = `${pressure} pHa`;
    cardP.classList.remove('hidden');

    // Wind Card
    const windSpeed = data.wind.speed;
    if (windSpeed === 0) {
      valueW.innerHTML = `Wind Stop`;
    } else {
      valueW.innerHTML = `${windSpeed} kmh`;
    }
    cardW.classList.remove('hidden');

    // Sunsise Card
    sunTime(data.sys.sunrise);
    valueSR.innerHTML = `${time}`;
    cardSR.classList.remove('hidden');

    // Sunset Card
    sunTime(data.sys.sunset);
    valueSS.innerHTML = `${time}`;
    cardSS.classList.remove('hidden');

    // Visibility Card
    const visibility = data.visibility / 1000;
    valueV.innerHTML = `${visibility} km`;
    cardV.classList.remove('hidden');

    // sunTime(data.sys.sunrise);
  } catch (err) {
    alert(err.message);
  }
}

today();
