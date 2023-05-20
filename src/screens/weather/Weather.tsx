import React, {useEffect, useRef, useState} from 'react';
import {SafeArea} from './styles';
import {FlatList, Dimensions, ViewToken, Animated} from 'react-native';
import cities from '../../cityCoordinates.json';
import WeatherCard from '../../components/weatherCard';
import {ICity} from '../../store/weather/model';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {fetchForecast} from '../../store/weather/thunk';
import PageIndicator from '../../components/pageIndicator';
import {selectWeatherForCity} from '../../store/weather';
import {getNextDayDate} from '../../utils/getNextDayDate';

const {width} = Dimensions.get('screen');

const Weather = () => {
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [focusedCity, setFocusedCity] = useState<ICity | null>(cities[0]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const cityWeather = useAppSelector(state =>
    selectWeatherForCity(state, focusedCity?.name),
  );

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (!viewableItems?.length) {
        return;
      }
      setFocusedCity(viewableItems[0].item);
      setCurrentIndex(viewableItems[0].index);
    },
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 75,
    waitForInteraction: true,
  });

  const getItemLayout = (index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  useEffect(() => {
    if (focusedCity) {
      const lastUpdatedNextDay = getNextDayDate(cityWeather?.lastUpdated);
      const currentDate = new Date(Date.now());
      if (lastUpdatedNextDay && lastUpdatedNextDay > currentDate) {
        return;
      }
      dispatch(fetchForecast({city: focusedCity}));
    }
  }, [focusedCity]);

  return (
    <SafeArea>
      <FlatList
        ref={flatListRef}
        horizontal
        data={cities}
        renderItem={({item}: {item: ICity}) => <WeatherCard item={item} />}
        keyExtractor={item => item.name}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        getItemLayout={(_, index) => getItemLayout(index)}
        scrollEventThrottle={16}
        overScrollMode="never"
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
      <PageIndicator
        pages={cities}
        currentIndex={currentIndex}
        scrollX={scrollX}
      />
    </SafeArea>
  );
};

export default Weather;
