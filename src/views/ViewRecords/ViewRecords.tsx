import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Button from '@components/Button';
import Header from '@components/Header';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';

export default function ViewRecords({ navigation }: StackProps) {
  return (
    <View style={styles.root}>
      <Header title="View Records" />
      <Text style={styles.title}>{`View Records`}</Text>
      <Button
        title="Go back to Create"
        titleStyle={styles.buttonTitle}
        style={styles.button}
        onPress={() => {
          navigation.goBack();
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
  buttonTitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
