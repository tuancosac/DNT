import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const STAR_COUNT = 60;

const UniverseBackground = ({ children }) => {
  const stars = useRef(
    Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.4 + 0.15,
      anim: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    stars.forEach((star) => {
      const animate = () => {
        star.anim.setValue(0);
        Animated.timing(star.anim, {
          toValue: 1,
          duration: 8000 + Math.random() * 12000,
          useNativeDriver: true,
        }).start(() => animate());
      };
      animate();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Nền vũ trụ */}
      <View style={styles.space} />

      {/* Các ngôi sao bay */}
      {stars.map((star, index) => {
        const translateY = star.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [star.y, star.y - height - 50],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.star,
              {
                left: star.x,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                transform: [{ translateY }],
              },
            ]}
          />
        );
      })}

      {/* Nội dung form đè lên */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050510',
  },
  space: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#050510',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
});

export default UniverseBackground;