export const getNextDayDate = (lastUpdated?: string) => {
  if (!lastUpdated) {
    return;
  }
  const currentDateTime = new Date(lastUpdated);
  const nextDay = new Date(currentDateTime);
  nextDay.setDate(currentDateTime.getDate() + 1);
  nextDay.setUTCHours(0, 0, 0, 0);
  return nextDay;
};
