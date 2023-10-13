import React, { useEffect, useCallback, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useForm,
  useWatch,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import Button from "@components/Button";
import Header from "@components/Header";
import TextField from "@components/TextField";
import { TextFieldHandle } from "@components/TextField/TextField.typeDefs";
import { StackProps } from "@navigator/stack";
import { useAppModule } from '@modules/app.module';
import { colors } from "@theme";
import countriesJSON from "@assets/countries.json";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  addressline1: string;
  addressline2: string;
  suburb: string;
  country: string;
  state: string;
  postcode: string;
};

export default function Create({ navigation }: StackProps) {
  const firstnameRef = useRef<TextFieldHandle>(null);
  const lastnameRef = useRef<TextFieldHandle>(null);
  const emailRef = useRef<TextFieldHandle>(null);
  const mobileRef = useRef<TextFieldHandle>(null);
  const address1Ref = useRef<TextFieldHandle>(null);
  const address2Ref = useRef<TextFieldHandle>(null);
  const suburbRef = useRef<TextFieldHandle>(null);
  const postcodeRef = useRef<TextFieldHandle>(null);

  const filteredCountries = countriesJSON.map((country) => ({
    name: country.name,
  }));
  const [countries] = useState<Object[]>(filteredCountries);
  const [states, setStates] = useState<Object[]>([]);
  const [openCountry, setOpenCountry] = useState<boolean>(false);
  const [openState, setOpenState] = useState<boolean>(false);

  const { dispatch, createReferral, setCreateStatus, createStatus } = useAppModule();

  const { ...methods } = useForm<FormValues>({ mode: "onChange" });

  // get the country and state values from the form
  const countryWatch = useWatch<FormValues, "country">({name: 'country', control: methods.control});
  const stateWatch = useWatch<FormValues, "state">({name: 'state', control: methods.control});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload = {
      ...data,
      country: countryWatch,
      state: stateWatch,
      phone: data.phone.replace(/\s/g, ""),
    };
    dispatch(createReferral(payload));
    dispatch(setCreateStatus("loading"));
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors });
  };

  const handleNotifBtnPress = () => {
    dispatch(setCreateStatus("idle"));
    if (createStatus === "success") {
      methods.reset();
      navigation.navigate("ViewRecordsTab");
    }
  }

  useEffect(() => {
    if (countryWatch) {
      const country = countriesJSON.find((c) => c.name === countryWatch);
      if (country) {
        const countryStates = country.states.map((state) => ({
          name: state.name,
        }));
        setStates(countryStates);
      }
    }
  }, [countryWatch]);

  const onCountryOpen = useCallback(() => {
    setOpenState(false);
  }, []);

  const onStateOpen = useCallback(() => {
    setOpenCountry(false);
  }, []);

  const renderNotifModal = () => {
    let notifMsg = "";
    switch (createStatus) {
      case "loading":
        notifMsg = "Creating referral...";
        break;
      case "success":
        notifMsg = "Referral created successfully";
        break;
      case "error":
        notifMsg = "Failed to create referral";
        break;
      default:
        notifMsg = "";
        break;
    }
    return (
      <View style={styles.notifModalWrap}>
        <View style={styles.notifModal}>
          <Text style={styles.notifText}>
            {notifMsg}
          </Text>
          {createStatus !== "loading" && (
            <Button
              title="OK"
              onPress={handleNotifBtnPress}
              style={styles.notifBtn}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.root}
        contentContainerStyle={styles.scrollView}
      >
        <Header title="Referral Builder" />
        <FormProvider {...methods}>
          <Text style={styles.subHeader}>Personal Details</Text>
          <View style={styles.form}>
            <TextField
              ref={firstnameRef}
              name="firstname"
              label="First Name"
              rules={{required: 'First name is required'}}
              onSubmitEditing={() => lastnameRef.current?.onFocus()}
            />
            <TextField
              ref={lastnameRef}
              name="lastname"
              label="Last Name"
              rules={{required: 'Last name is required'}}
              onSubmitEditing={() => emailRef.current?.onFocus()}
            />
            <TextField
              ref={emailRef}
              name="email"
              label="Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email format is not valid",
                },
              }}
              keyboardType="email-address"
              onSubmitEditing={() => mobileRef.current?.onFocus()}
            />
            <TextField
              ref={mobileRef}
              name="phone"
              label="Mobile"
              maxLength={11}
              rules={{
                required: "Mobile is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Mobile format is not valid",
                },
              }}
              keyboardType="phone-pad"
              onSubmitEditing={() => address1Ref.current?.onFocus()}
            />
          </View>
          <Text style={styles.subHeader}>Address</Text>
          <View style={styles.form}>
            <TextField
              ref={address1Ref}
              name="addressline1"
              label="Address line 1"
              rules={{required: 'Address line 1 is required'}}
              onSubmitEditing={() => address2Ref.current?.onFocus()}
            />
            <TextField
              ref={address2Ref}
              name="addressline2"
              label="Address line 2"
              onSubmitEditing={() => suburbRef.current?.onFocus()}
            />
            <TextField
              ref={suburbRef}
              name="suburb"
              label="Suburb"
              rules={{required: 'Suburb is required'}}
            />
            <TextField
              type="dropdown"
              open={openState}
              name="state"
              label="State"
              placeholder="Select State"
              items={states}
              rules={{required: 'State is required'}}
              searchable={states.length > 0}
              searchPlaceholder="Search state..."
              translation={{
                NOTHING_TO_SHOW: states.length > 0 ? "State not found" : "Select a country first",
              }}
              schema={{
                label: "name",
                value: "name",
              }}
              setOpen={() => setOpenState(!openState)}
              onOpen={onStateOpen}
              zIndex={openState ? 1 : 0}
            />
            <TextField
              ref={postcodeRef}
              name="postcode"
              label="Postcode"
              rules={{required: "Postcode is required"}}
              keyboardType="number-pad"
            />
            <TextField
              type="dropdown"
              open={openCountry}
              name="country"
              label="Country"
              placeholder="Select Country"
              items={countries}
              rules={{required: "Country is required"}}
              searchable
              searchPlaceholder="Search country..."
              translation={{
                NOTHING_TO_SHOW: "Country not found",
              }}
              schema={{
                label: "name",
                value: "name",
              }}
              setOpen={() => setOpenCountry(!openCountry)}
              onOpen={onCountryOpen}
              zIndex={openCountry ? 1 : 0}
            />
          </View>
        </FormProvider>
        <Button
          disabled={!methods.formState.isValid}
          title="Create referral"
          onPress={methods.handleSubmit(onSubmit, onError)}
          style={styles.button}
        />
      </KeyboardAwareScrollView>
      {createStatus !== "idle" && renderNotifModal()}
    </>
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
    fontFamily: "aestetico-semibold",
    color: colors.gray,
    marginVertical: 15,
    lineHeight: 24,
  },
  form: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray,
  },
  button: {
    marginTop: 40,
  },
  notifModalWrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  notifModal: {
    height: "40%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  notifText: {
    position: "absolute",
    top: "30%",
    width: "80%",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "aestetico-bold",
    lineHeight: 30,
  },
  notifBtn: {
    width: "80%",
    position: "absolute",
    bottom: 20,
  },
});
