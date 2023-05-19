import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const Container = styled.View`
  position: absolute;
  bottom: ${height * 0.1}px;
  width: ${width * 0.49}px;
  align-self: center;
  height: 30px;
`;
