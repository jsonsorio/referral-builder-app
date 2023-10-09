import React from 'react';
import { Pressable, Image, Text, ActivityIndicator, ButtonProps, StyleSheet, Platform } from 'react-native';
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
    <Pressable
      style={[opacityStyle, styles.button, style]}
      disabled={disabled ?? isLoading}
      {...rest}>
      {isLoading && <ActivityIndicator size="small" color={loaderColor} />}
      {!isLoading && image && <Image source={image} style={imageStyle} />}
      {!isLoading && title && <Text style={[styles.buttonTitle, titleStyle]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 16,
    fontFamily: 'aestetico_semibold',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
