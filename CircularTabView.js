import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, Dimensions, Animated } from 'react-native';
import { tabColors } from './src/Constants';

const { width } = Dimensions.get('window');

const CircularTabView = ({ tabs }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [currentFocusedIndex, setCurrentFocusedIndex] = useState(0);

    useLayoutEffect(() => {
        const length = tabs.length;
        if (currentFocusedIndex === 1) {
            flatListRef.current.scrollToIndex({ index: currentFocusedIndex + length, animated: false });
            setCurrentFocusedIndex(currentFocusedIndex + length);
        }
    }, [currentFocusedIndex, tabs])

    const renderTab = ({ item, index }) => {
        return (
            <Animated.View style={[style.tab, { backgroundColor: tabColors[item.id] }]}>
                <Text>{item.title}</Text>
            </Animated.View>
        )
    }

    const handleScroll = (event) => {
        // const length = tabs.length;
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
        // console.log({ currentIndex })
        setCurrentFocusedIndex(currentIndex);
    };

    const onEndReached = () => {
        const length = tabs.length;
        flatListRef.current.scrollToIndex({ index: 2 * length - 1, animated: false });
    }

    const getItemLayout = (data, index) => (
        { length: width, offset: width * index, index }
    );

    return (
        <Animated.FlatList
            data={[...tabs, ...tabs, ...tabs]}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
            style={{ height: '100%' }}
            onEndReached={onEndReached}
            onMomentumScrollEnd={handleScroll}
            ref={flatListRef}
            initialScrollIndex={tabs.length}
            getItemLayout={getItemLayout}
        />
    );
};

const style = StyleSheet.create({
    tab: {
      width: width,
      padding: 10,
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1
    }
});

export default CircularTabView;