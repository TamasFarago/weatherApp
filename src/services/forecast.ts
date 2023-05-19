import request from './request';
import {IForecastResponse} from './interfaces';

export const getForecast = async ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}): Promise<IForecastResponse> => {
  return request<IForecastResponse>({
    endpoint: `forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`,
    config: {
      method: 'GET',
    },
  });
};
