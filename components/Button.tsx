
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

const BUTTON_SIZE = 80;
const BUTTON_MARGIN = 6;

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isZero?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, buttonStyle, textStyle, isZero }) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(label)}
      style={[
          styles.button,
          isZero ? styles.zeroButton : { width: BUTTON_SIZE },
          buttonStyle
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BUTTON_SIZE / 2,
    marginHorizontal: BUTTON_MARGIN,
  },
  zeroButton: {
    width: BUTTON_SIZE * 2 + BUTTON_MARGIN * 2,
    alignItems: 'flex-start',
    paddingLeft: 32,
  },
  text: {
    fontSize: 38,
    fontWeight: '500',
    color: '#fff',
  },
});

export default Button;
