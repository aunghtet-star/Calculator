
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  let displayString = value;

  if (displayString.length > 9 && !displayString.includes('e')) {
      const num = parseFloat(displayString);
      if (Math.abs(num) > 999999999 || (Math.abs(num) < 0.0000001 && num !== 0)) {
        displayString = num.toExponential(2);
      }
  }

  const fontSize = displayString.length > 9 ? 60 : displayString.length > 6 ? 72 : 88;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize }]} adjustsFontSizeToFit numberOfLines={1}>
        {displayString}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'hidden',
    paddingBottom: 8,
    paddingHorizontal: 12,
  },
  text: {
    color: '#fff',
    fontWeight: '200',
    textAlign: 'right',
  },
});

export default Display;
