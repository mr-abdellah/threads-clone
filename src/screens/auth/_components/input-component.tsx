import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useTheme} from '../../../hooks';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';
import {SvgProps} from 'react-native-svg';

interface InputComponentProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  type: KeyboardTypeOptions;
  Icon1?: React.FC<SvgProps>; // Optional icon component for the left side
  showDevider?: boolean;
}

export default function InputComponent<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  isPassword = false,
  type,
  Icon1,
  showDevider = true,
}: InputComponentProps<T>) {
  const {currentColor} = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, ref, value, onBlur},
        fieldState: {error},
      }) => {
        return (
          <KeyboardAvoidingView
            style={{
              borderBottomColor: currentColor.tertiary,
              borderBottomWidth: showDevider ? 2 : 0,
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                color: currentColor.secondary,
              }}>
              {label}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              {Icon1 && (
                <Icon1
                  color={currentColor.secondary}
                  height={wp(4)}
                  width={wp(4)}
                />
              )}

              <TextInput
                style={{
                  width: wp(75),
                  color: currentColor.secondary,
                  fontSize: wp(3.5),
                }}
                keyboardType={type}
                placeholder={placeholder}
                placeholderTextColor={currentColor.lightGray}
                secureTextEntry={isPassword}
                ref={ref}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
            {error && (
              <Text
                style={{
                  fontSize: wp(3),
                  fontWeight: '500',
                  color: 'red',
                  textAlign: 'left',
                }}>
                {error.message}
              </Text>
            )}
          </KeyboardAvoidingView>
        );
      }}
    />
  );
}
