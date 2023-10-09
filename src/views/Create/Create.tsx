import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Button from '@components/Button';
import Header from '@components/Header';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';

export default function Create({ navigation }: StackProps) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Header title="Referral Builder" />
      <Text style={styles.title}>Home</Text>
      <Button
        title="Create referral"
        onPress={() => {
          navigation.navigate('ViewRecordsStack');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
