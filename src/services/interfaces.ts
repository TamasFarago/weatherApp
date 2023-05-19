import {AxiosRequestConfig} from 'axios';

export interface IRequestConfig {
  endpoint: string;
  config?: AxiosRequestConfig;
}

export interface IForecastResponse {
  elevation: number;
  generationtime_ms: number;
  hourly: {
    temperature_2m: number[];
    time: string[];
  };
  hourly_units: {
    temperature_2m: string;
    time: string;
  };
  latitude: string;
  longitude: string;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
