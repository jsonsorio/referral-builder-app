import React, { useRef } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  const emailRef = useRef<TextFieldHandle>(null);
  const mobileRef = useRef<TextFieldHandle>(null);
  const address1Ref = useRef<TextFieldHandle>(null);
  const address2Ref = useRef<TextFieldHandle>(null);
  const suburbRef = useRef<TextFieldHandle>(null);
  const stateRef = useRef<TextFieldHandle>(null);
  const postcodeRef = useRef<TextFieldHandle>(null);
  const countryRef = useRef<TextFieldHandle>(null);

  const {...methods} = useForm<FormValues>({mode: 'onChange'});

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log({data});
   
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({errors})
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.root} contentContainerStyle={styles.scrollView}>
      <Header title="Referral Builder" />
      <FormProvider {...methods}>
        <Text style={styles.subHeader}>Personal Details</Text>
        <View style={styles.form}>
          <TextField
            ref={firstnameRef}
            name="firstName"
            label="First Name"
            onSubmitEditing={() => lastnameRef.current?.onFocus()}
          />
          <TextField
            ref={lastnameRef}
            name="lastName"
            label="Last Name"
            onSubmitEditing={() => emailRef.current?.onFocus()}
          />
          <TextField
            ref={emailRef}
            name="email"
            label="Email"
            onSubmitEditing={() => mobileRef.current?.onFocus()}
          />
          <TextField
            ref={mobileRef}
            name="mobile"
            label="Mobile"
            onSubmitEditing={() => address1Ref.current?.onFocus()}
          />
        </View>
        <Text style={styles.subHeader}>Address</Text>
        <View style={styles.form}>
          <TextField
            ref={address1Ref}
            name="address1"
            label="Address line 1"
            onSubmitEditing={() => address2Ref.current?.onFocus()}
          />
          <TextField
            ref={address2Ref}
            name="address2"
            label="Address line 2"
            onSubmitEditing={() => suburbRef.current?.onFocus()}
          />
          <TextField
            ref={suburbRef}
            name="suburb"
            label="Suburb"
          />
          <TextField
            type="dropdown"
            name="country"
            label="Country"
            placeholder="Select Country"
            items={[]}
          />
          <TextField
            type="dropdown"
            name="state"
            label="State"
            placeholder="Select State"
            items={[]}
          />
          <TextField
            ref={postcodeRef}
            name="postcode"
            label="Postcode"
          />
        </View>
      </FormProvider>
      <Button
        title="Create referral"
        onPress={methods.handleSubmit(onSubmit, onError)}
        style={styles.button}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  scrollView: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
  },
  subHeader: {
    fontSize: 16,
    fontFamily: 'aestetico-semibold',
    color: colors.gray,
    marginVertical: 20,
  },
  form: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray,
  },
  button: {
    marginTop: 40,
  },
});
