import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SwipeModal = ({ children, isVisible, onClose, direction }) => {
  const [slideAnimation] = useState(new Animated.Value(0));
  const [isModalVisible, setIsModalVisible] = useState(isVisible);
 
  useEffect(() => {
    if (isVisible) {
      setIsModalVisible(true);
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false));
    }
  }, [isVisible]);

  const handleBackdropPress = () => {
    if (onClose) onClose();
  };

  const getSlideAnimationStyle = () => {
    switch (direction) {
      case 'top':
        return {
          transform: [
            {
              translateY: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-height, 0],
              }),
            },
          ],
        };
      case 'bottom':
        return {
          transform: [
            {
              translateY: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        };
      case 'left':
        return {
          transform: [
            {
              translateX: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-width, 0],
              }),
            },
          ],
        };
      case 'right':
        return {
          transform: [
            {
              translateX: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [width, 0],
              }),
            },
          ],
        };
      default:
        return {};
    }
  };

  return isModalVisible ? (
    <View style={styles.backdrop}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdropOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modal, getSlideAnimationStyle()]}>
        {children}
      </Animated.View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  modal: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 1000,
  },
});

export default SwipeModal;
