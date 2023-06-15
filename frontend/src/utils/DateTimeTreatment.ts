import { REFUSED } from "dns";

export function timeToSeconds(tempo: string) {
  const [HOURS = 0, MINUTES = 0, SECONDS = 0] = tempo.split(":").map(Number);
  const TIME_IN_SECONDS = HOURS * 3600 + MINUTES * 60 + SECONDS;
  return TIME_IN_SECONDS;
}
export function secondsToTime(timeInSeconds: number) {
  const NUMBERS_OF_HOURS = Math.floor(timeInSeconds / 3600);
  const NUMBERS_OF_MINUTES = Math.floor(
    (timeInSeconds - NUMBERS_OF_HOURS * 3600) / 60
  );
  const NUMBERS_OF_SECONDS =
    timeInSeconds - NUMBERS_OF_HOURS * 3600 - NUMBERS_OF_MINUTES * 60;
  const HOURS =
    NUMBERS_OF_HOURS < 10 ? `0${NUMBERS_OF_HOURS}` : NUMBERS_OF_HOURS;
  const MINUTES =
    NUMBERS_OF_MINUTES < 10 ? `0${NUMBERS_OF_MINUTES}` : NUMBERS_OF_MINUTES;
  const SECONDS =
    NUMBERS_OF_SECONDS < 10 ? `0${NUMBERS_OF_SECONDS}` : NUMBERS_OF_SECONDS;
  const time = `${HOURS}:${MINUTES}:${SECONDS}`;
  return time;
}

export function getDateFull(date?: Date) {
  const MONTH_NAMES = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const DATE = new Date(date || Date.now());
  const FINAL_DATE = `${DATE.getDate()} de ${
    MONTH_NAMES[DATE.getMonth()]
  } de ${DATE.getFullYear()}`;
  return FINAL_DATE;
}

export function getDate(date?: string) {
  const DATE = new Date(date || Date.now());
  const DAY = DATE.getUTCDate().toString().padStart(2, "0");
  const MONTH = (DATE.getUTCMonth() + 1).toString().padStart(2, "0");
  const CURRENT_DATE = `${DATE.getFullYear()}-${MONTH}-${DAY}`;
  return CURRENT_DATE;
}

export function getTime(date?: string) {
  const DATE = new Date(date || Date.now());
  const HOUR = DATE.getUTCHours().toString().padStart(2, "0");
  const MINUTES = DATE.getUTCMinutes().toString().padStart(2, "0");
  const CURRENT_TIME = `${HOUR}:${MINUTES}`;
  return CURRENT_TIME;
}

export function isoToBrazilianDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function getDateForMongo(date: string) {
  const DATE = date.match(/\d+/g);
  const FINAL_DATE = DATE ? `${DATE[2]}/${parseInt(DATE[1])}/${DATE[0]}` : "";
  return FINAL_DATE;
}
