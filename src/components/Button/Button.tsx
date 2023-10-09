import React from 'react';
import { Pressable, Image, Text, ActivityIndicator, ButtonProps } from 'react-native';
import { IButton } from './Button.typeDefs';

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
      style={[opacityStyle, style]}
      disabled={disabled ?? isLoading}
      {...rest}>
      {isLoading && <ActivityIndicator size="small" color={loaderColor} />}
      {!isLoading && image && <Image source={image} style={imageStyle} />}
      {!isLoading && title && <Text style={titleStyle}>{title}</Text>}
    </Pressable>
  );
}
