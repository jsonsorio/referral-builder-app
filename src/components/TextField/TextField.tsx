import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';
import { colors } from '@theme';
import { ITextField, TextFieldHandle } from './TextField.typeDefs';

type TextFieldProps = ITextField & TextInputProps & UseControllerProps & DropDownPickerProps<string>;

const TextField = forwardRef<TextFieldHandle, TextFieldProps>((props, ref) => {
    const { label, name, rules, defaultValue, items, type, zIndex, style, textStyle, errorMsgStyle, ...inputProps } = props;

    const inputRef = useRef<TextInput>(null);
    const formContext = useFormContext();
    const { formState } = formContext;

    const { field } = useController({ name, rules, defaultValue });

    const hasError = Boolean(formState?.errors[name]);

    useImperativeHandle(ref, () => ({
        onFocus: () => {
            inputRef.current?.focus();
        },
        onBlur: () => {
            inputRef.current?.blur();
        },
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
                {type === 'dropdown' ? (
                    <DropDownPicker
                        {...inputProps}
                        listMode="SCROLLVIEW"
                        value={field.value}
                        setValue={field.onChange}
                        items={items}
                        style={[styles.input, style, {zIndex}]}
                        placeholderStyle={{color: colors.placeholderText}}
                        dropDownContainerStyle={styles.dropdownContent}
                        textStyle={[styles.dropdownText, textStyle]}
                        ArrowDownIconComponent={() => (
                            <AntDesign name="down" size={14} color="black" />
                        )}
                        ArrowUpIconComponent={() => (
                            <AntDesign name="up" size={14} color="black" />
                        )}
                        TickIconComponent={() => (
                            <AntDesign name="check" size={14} color="black" />
                        )}
                    />
                ) : (
                    <TextInput
                        {...inputProps}
                        ref={inputRef}
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        placeholderTextColor={colors.placeholderText}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[styles.input, style]}
                    />
                )}
                {hasError && (
                    <Text style={[styles.errorMsg, errorMsgStyle]}>
                        {formState.errors[name]?.message}
                    </Text>
                )}
        </View>
    );
});

export default TextField;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    label: {
        fontSize:  14,
        fontFamily: 'aestetico-semibold',
        fontWeight: '400',
        marginBottom: 10,
    },
    textField: {
        flexShrink: 1,
    },
    dropdownWrap: {

    },
    dropdown: {
        
    },
    dropdownContent: {

    },
    dropdownText: {
        fontFamily: 'inter-regular',
        fontSize: 16
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.fieldBorder,
        minHeight: 48,
        paddingHorizontal: 15,
        fontFamily: 'inter-regular',
        fontSize: 16
    },
    errorMsg: {
        color: colors.error,
        fontSize: 12,
        marginVertical: 5,
        marginLeft: 5,
    }
})