import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NetworkResourceState} from '../../utils/networkResourceState';
import {RootState} from '../store';
import {IWeatherData, WeatherSliceState} from './model';
import {fetchForecast} from './thunk';
import {addResourceStateCases} from '../../utils/networkResourceState';

export const initialState: WeatherSliceState = {
  weatherData: [],
  fetchForecastResourceState: NetworkResourceState.Idle,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateWeatherData: (state, action: PayloadAction<IWeatherData>) => {
      const isCityInStore = state.weatherData.some(
        data => data.city === action.payload.city,
      );

      if (isCityInStore) {
        const updatedData = state.weatherData.map(item => {
          if (item.city === action.payload.city) {
            return {...item, ...action.payload};
          }
          return item;
        });

        state.weatherData = updatedData;
      } else {
        state.weatherData = [...state.weatherData, action.payload];
      }
    },
  },
  extraReducers: builder => {
    addResourceStateCases(builder, 'fetchForecastResourceState', fetchForecast);
  },
});

export const selectWeatherForCity = (state: RootState, city?: string) => {
  const {weatherData} = state.weather;
  const cityData = weatherData.find(data => data.city === city);
  return cityData;
};

export const {updateWeatherData} = weatherSlice.actions;

export default weatherSlice.reducer;
