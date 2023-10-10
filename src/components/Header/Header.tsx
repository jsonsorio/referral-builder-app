import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IHeader } from './Header.typeDefs';
import { colors } from '@theme';

export default function Header({ title, style, titleStyle }: IHeader) {
  return (
    <View style={[styles.headerTitleWrap, style]}>
      <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    headerTitleWrap: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
      },
      headerTitle: {
        fontSize: 24,
        fontFamily: 'aestetico-semibold',
        color: colors.boldText,
      },
});