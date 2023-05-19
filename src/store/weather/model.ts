import {NetworkResourceState} from '../../utilts/networkResourceState';

export interface ICity {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface WeatherSliceState {
  weatherData: IWeatherData[];
  fetchForecastResourceState: NetworkResourceState;
}

export interface IWeatherData {
  city: string;
  temperature: number[];
  hour: string[];
  lastUpdated: string;
}
