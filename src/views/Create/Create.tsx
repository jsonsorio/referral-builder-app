import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import Button from '@components/Button';
import Header from '@components/Header';
import TextField from '@components/TextField';
import { TextFieldHandle } from '@components/TextField/TextField.typeDefs';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';

type FormValues = {
  firstName: string;
}

export default function Create({ navigation }: StackProps) {
  const firstnameRef = useRef<TextFieldHandle>(null);
  const lastnameRef = useRef<TextFieldHandle>(null);
  const {...methods} = useForm<FormValues>({mode: 'onChange'});

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log({data});
   
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({errors})
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Header title="Referral Builder" />
      <Text style={styles.subHeader}>Personal Details</Text>
      <View style={styles.form}>
        <FormProvider {...methods}>
          <TextField
            ref={firstnameRef}
            name="firstName"
            label="First Name"
            onSubmitEditing={() => lastnameRef.current?.onFocus()}
          />
          <TextField
            ref={lastnameRef}
            type="dropdown"
            items={[]}
            name="lastName"
            label="Last Name"
          />
        </FormProvider>
      </View>
      <Button
        title="Create referral"
        onPress={methods.handleSubmit(onSubmit, onError)}
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
  subHeader: {
    fontSize: 16,
    fontFamily: 'aestetico-semibold',
    color: colors.gray,
    marginBottom: 20,
  },
  form: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray,
  }
});
