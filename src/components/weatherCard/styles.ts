import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import theme from '../../providers/themeProvider/theme';

const {width} = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  width: ${width}px;
  background-color: ${theme.colors.Secondary};
`;

export const CityName = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-top: 24px;
`;

export const LoadingText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: white;
  text-align: center;
  margin-top: 16px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
