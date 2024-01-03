const formatTime = (value) => value.toString().padStart(2, "0");
function declensionNum(num, words) {
  return words[
    num % 100 > 4 && num % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
  ];
}
const getRemainDate = (milliseconds) => {
  if (milliseconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: formatTime(days),
    hours: formatTime(hours % 24),
    minutes: formatTime(minutes % 60),
    seconds: formatTime(seconds % 60),
  };
};

const updateTime = (diffTime) => {
  var times = document.querySelectorAll(".time");
  var selectDaysClass = document.querySelectorAll(".day");

  var remainEntities = getRemainDate(diffTime);

  const { days, hours, minutes, seconds } = remainEntities;

  var correctWordEnd = [
    declensionNum(days, ["день", "дня", "дней"]),
    declensionNum(hours, ["час", "часа", "часов"]),
    declensionNum(minutes, ["минута", "минуты", "минут"]),
    declensionNum(seconds, ["секунда", "секунды", "секунд"]),
  ];

  var valuesRemainEntities = Object.values(remainEntities);

  times.forEach((time, i) => {
    const currentTime = valuesRemainEntities[i];
    if (time.innerText !== currentTime) {
      time.innerText = currentTime;
    }
  });

  selectDaysClass.forEach((day, i) => {
    if (day.innerText !== correctWordEnd[i]) {
      day.innerText = correctWordEnd[i];
    }
  });
};

let diffTime = +new Date(2024, 0, 27, 11) - Date.now();

if (diffTime >= 0) {
  updateTime(diffTime);

  var timer = setInterval(() => {
    diffTime -= 1000;
    if (diffTime <= 0) {
      clearInterval(timer);
    } else {
      updateTime(diffTime);
    }
  }, 1000);
}
