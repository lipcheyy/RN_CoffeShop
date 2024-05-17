import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyStateAnimation: React.FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  LottieStyle: {
    height: 300,
    marginTop:40
  },
  LottieText: {
    fontWeight:'bold',
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default EmptyStateAnimation;