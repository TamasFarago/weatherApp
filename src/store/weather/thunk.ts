import {createAsyncThunk} from '@reduxjs/toolkit';
import {getForecast} from '../../services/forecast';
import {AppDispatch, RootState} from '../store';
import {ICity} from './model';
import {updateWeatherData} from './weatherSlice';

export const fetchForecast = createAsyncThunk<
  {},
  {city: ICity},
  {dispatch: AppDispatch; state: RootState}
>('weather/fetchForecast', async (payload, {dispatch}) => {
  const {latitude, longitude} = payload.city.coordinates;
  const response = await getForecast({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  });
  if (response) {
    const weatherData = {
      city: payload.city.name,
      temperature: response.hourly.temperature_2m,
      hour: response.hourly.time,
      lastUpdated: new Date(Date.now()).toISOString(),
    };

    dispatch(updateWeatherData(weatherData));
  }
  return;
});
