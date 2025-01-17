export const DateUtils = {
  /**
   * Форматирование даты
   * @param dateISO Дата в формате ISO
   * @returns {string} строка в формате `date, time GMT+3`
   * @example
   * Пример вывода
   * // Сегодня, hh:mm GMT+3
   * // Вчера, hh:mm GMT+3
   * // 2...4 дня назад, hh:mm GMT+3
   * // dd.mm.yyyy, hh:mm GMT+3
   */
  getRuLocaleDate: (dateISO?: string): string => {
    if (!dateISO) {
      return "";
    }

    const millisecondsInOneDay = 1000 * 60 * 60 * 24;

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "Europe/Moscow",
      timeZoneName: "short",
    };

    const dateObject = new Date(dateISO);
    const localDateString = dateObject
      .toLocaleString("ru-RU", options)
      .split(",");
    const date = localDateString[0].trim();
    const time = localDateString[1].trim();

    const currentDate = new Date();

    const diffTime = Math.abs(currentDate.getTime() - dateObject.getTime());
    const diffDays = Math.ceil(diffTime / millisecondsInOneDay);

    if (dateObject.toDateString() === currentDate.toDateString()) {
      return "Сегодня, " + time;
    } else if (diffDays === 1) {
      return "Вчера, " + time;
    } else if (diffDays >= 2 && diffDays <= 4) {
      return `${diffDays} дня назад, ${time}`;
    }

    return `${date}, ${time}`;
  },
};
