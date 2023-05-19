import axios from 'axios';
import {IRequestConfig} from './interfaces';
import {API_URL} from '@env';

const request = async <T>({endpoint, config}: IRequestConfig): Promise<T> => {
  const url = `${API_URL}/${endpoint}`;

  const result = await axios({
    url,
    ...config,
  });

  return result.data;
};

export default request;
