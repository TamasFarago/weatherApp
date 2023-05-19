import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {IWeatherData} from '../../store/weather/model';
import {Container} from './styles';
import theme from '../../providers/themeProvider/theme';
import {getHours} from './utils';

const {width, height} = Dimensions.get('screen');

const Chart = ({weatherData}: {weatherData: IWeatherData}) => {
  const chartData = {
    labels: getHours(weatherData),
    datasets: [
      {
        data: weatherData.temperature,
      },
    ],
  };

  return (
    <Container>
      <LineChart
        data={chartData}
        width={width}
        height={height * 0.6}
        yAxisSuffix="°"
        xLabelsOffset={10}
        formatXLabel={(value: string) =>
          parseInt(value) % 6 == 0 ? value : ''
        }
        chartConfig={{
          backgroundColor: theme.colors.Primary,
          propsForBackgroundLines: {
            stroke: 'rgba(255, 255, 255, 0)',
          },
          backgroundGradientFrom: theme.colors.Primary,
          backgroundGradientTo: theme.colors.Primary,
          decimalPlaces: 2,
          color: () => `rgba(255, 255, 255, 0.5)`,
          labelColor: () => 'rgba(255, 255, 255, 1)',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
          },
        }}
      />
    </Container>
  );
};

export default Chart;
