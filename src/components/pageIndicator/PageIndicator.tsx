import {FlatList, ViewToken, Dimensions, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ICity} from '../../store/weather/model';
import {Container} from './styles';

const {width} = Dimensions.get('screen');

const PageIndicator = ({
  pages,
  currentIndex,
  scrollX,
}: {
  pages: ICity[];
  currentIndex: number | null;
  scrollX: Animated.Value;
}) => {
  const flatListRef = useRef<FlatList<ICity>>(null);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    if (currentIndex !== null) {
      if (
        !visibleItems.includes(pages[currentIndex].name) &&
        flatListRef.current
      ) {
        if (currentIndex > 4) {
          flatListRef.current!.scrollToItem({
            item: pages[currentIndex - 4],
          });
        } else {
          flatListRef.current!.scrollToItem({
            item: pages[0],
          });
        }
      }
    }
  }, [pages[currentIndex ?? 0].name]);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (!viewableItems?.length) {
        return;
      }
      setVisibleItems(
        viewableItems.map(item => item.item).filter((_, index) => index !== 0),
      );
    },
  );

  return (
    <Container>
      <FlatList
        getItemLayout={(_, index) => {
          return {
            length: 20,
            offset: 20 * index,
            index,
          };
        }}
        ref={flatListRef}
        scrollEnabled={false}
        data={pages}
        horizontal
        onViewableItemsChanged={onViewableItemsChanged.current}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['lightblue', 'white', 'lightblue'],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={{
                height: 10,
                width: 10,
                borderRadius: 10,
                backgroundColor,
                marginRight: 10,
                transform: [{scale}],
              }}
            />
          );
        }}
      />
    </Container>
  );
};

export default PageIndicator;
