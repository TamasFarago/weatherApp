import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export const Container = styled.View`
  position: absolute;
  bottom: 100px;
  width: ${width * 0.5}px;
  align-self: center;
  height: 30px;
`;
