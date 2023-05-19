import {IWeatherData} from '../../store/weather/model';

export const getHoursAndMinutes = (weatherData?: IWeatherData) => {
  const newValues: string[] = [];
  weatherData?.hour?.map(hour => {
    const date = new Date(hour);
    const hours = date.getHours();
    newValues.push(`${hours}:00`);
  });
  return newValues;
};
