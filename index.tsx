import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Button, Easing, StyleSheet, View} from 'react-native';

// confetti colors
const colors = [
  '#D4AF37',
  '#C0C0C0',
  '#CD7F32',
  '#FFD700',
  '#E5E4E2',
  '#8C7853',
  '#DAA520',
  '#B87333',
];

// individual confetti pieces
const ConfettiPiece = ({index, onAnimationEnd}) => {
  //movement and fadings
  const translateY = useState(new Animated.Value(0))[0];
  const translateX = useState(new Animated.Value(0))[0];
  const opacity = useState(new Animated.Value(1))[0];
  const color = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    // falling effect animation
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Math.random() * 300 * (Math.random() < 0.5 ? -1 : 1), // random Y movement
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: Math.random() * 300 - 150, // random X movement
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0, // fade out effect
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationEnd(index));
  }, []);

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        {
          backgroundColor: color,
          transform: [{translateY}, {translateX}],
          opacity,
        },
      ]}
    />
  );
};

const ConfettiScreen = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  // trigger confetti animation
  const handleConfettiAnimation = useCallback(() => setShowConfetti(true), []);

  // hide confetti when animation ends
  const handleAnimationEnd = useCallback(() => setShowConfetti(false), []);

  return (
    <View style={styles.container}>
      <Button title="Celebrate!" onPress={handleConfettiAnimation} />
      {showConfetti &&
        Array.from({length: 100}, (_, index) => (
          <ConfettiPiece
            key={index}
            index={index}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confettiPiece: {
    position: 'absolute',
    width: 5,
    height: 10,
    borderRadius: 5,
  },
});

export default ConfettiScreen;
