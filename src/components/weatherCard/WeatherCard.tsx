import React from 'react';
import {ICity} from '../../store/weather/model';
import {Container, CityName, LoadingText, LoaderContainer} from './styles';
import Chart from '../chart/Chart';
import {ActivityIndicator} from 'react-native';
import {useAppSelector} from '../../store/store';
import {selectWeatherForCity} from '../../store/weather';
import {NetworkResourceState} from '../../utils/networkResourceState';

const WeatherCard = ({item}: {item: ICity}) => {
  const {fetchForecastResourceState} = useAppSelector(state => state.weather);
  const cityWeather = useAppSelector(state =>
    selectWeatherForCity(state, item.name),
  );

  const loading = fetchForecastResourceState === NetworkResourceState.Loading;

  const Loader = () => (
    <Container>
      <LoaderContainer>
        <ActivityIndicator size={32} color="white" />
        <LoadingText>Weather data is being fetched</LoadingText>
      </LoaderContainer>
    </Container>
  );

  return (
    <Container>
      <CityName>{item.name}</CityName>
      {cityWeather && !loading ? (
        <Chart weatherData={cityWeather} />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default React.memo(WeatherCard);
