import React from 'react';
import { TouchableOpacity, Image, Text, ActivityIndicator, ButtonProps, StyleSheet, Platform } from 'react-native';
import { IButton } from './Button.typeDefs';
import { colors } from '@theme';

export default function Button({
  title,
  titleStyle,
  image,
  style,
  disabled,
  isLoading,
  loaderColor,
  imageStyle,
  ...rest
}: IButton & ButtonProps) {
  const opacityStyle = { opacity: disabled ? 0.6 : 1 };
  return (
    <TouchableOpacity
      style={[opacityStyle, styles.button, style]}
      disabled={disabled ?? isLoading}
      activeOpacity={0.8}
      {...rest}>
      {isLoading && <ActivityIndicator size="small" color={loaderColor} />}
      {!isLoading && image && <Image source={image} style={imageStyle} />}
      {!isLoading && title && <Text style={[styles.buttonTitle, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 16,
    fontFamily: 'aestetico-semibold',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    paddingVertical: Platform.OS === 'android' ? 16 : 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
