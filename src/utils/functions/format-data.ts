const getMonthName = (monthNumber: number) => {
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  return monthNames[monthNumber];
};

export const getFormatData = (date: Date): string => {
  const day: string = date.getDate().toString();
  const month: number = date.getMonth();
  const hour: string = date.getHours().toString();
  const minutes: string = date.getMinutes().toString();

  const isCorrectDay: string = day.length !== 1 ? day : `0${day}`;
  const isCorrectHour: string = hour.length !== 1 ? hour : `0${hour}`;
  const isCorrectMinutes: string = minutes.length !== 1 ? minutes : `0${minutes}`;
  const monthName: string = getMonthName(month);

  return `${isCorrectDay} ${monthName} at ${isCorrectHour}:${isCorrectMinutes}`;
};