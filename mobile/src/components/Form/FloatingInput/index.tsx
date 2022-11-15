import React from 'react';
import { FieldError } from 'react-hook-form';
import { ReturnKeyTypeOptions, Text, View } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { SYS } from '../../../theme';
import { styles } from './styles';

interface FloatingInputProps {
    label: string;
    type: any;
    value: any;
    hint?: string;
    onChange: (val: any) => void;
    mask?: any;
    customHeight?: number;
    secureTextEntry?: boolean; // Is password text?
    errors?: FieldError | undefined;
    returnKeyType?: ReturnKeyTypeOptions | undefined;
}

export function FloatingInput({ label, type, value, hint, onChange, mask, customHeight, errors, returnKeyType, ...rest }: FloatingInputProps) {
    return (
        <View>
            <>
            <FloatingLabelInput
                {...rest}
                autoCapitalize={'none'}
                label={label}
                keyboardType={type}
                value={value}
                hint={hint}
                mask={mask ? mask : undefined}
                hintTextColor={SYS.COLORS.GRAY}
                onChangeText={onChange}
                staticLabel={true}
                returnKeyType={returnKeyType ? returnKeyType : 'next'}
                containerStyles={{
                    borderWidth: 1,
                    borderColor: SYS.COLORS.PRIMARY,
                    borderRadius: 8,
                    height: customHeight ? customHeight : 70,
                    marginVertical: 10,
                }}
                inputStyles={{
                    color: SYS.COLORS.PRIMARY,
                    fontFamily: SYS.FONT_FAMILY.RG,
                    fontSize: SYS.FONT_SIZE.RG,
                    paddingHorizontal: 15,
                }}
                labelStyles={{
                    fontFamily: SYS.FONT_FAMILY.RG,
                    fontSize: SYS.FONT_SIZE.RG,
                    backgroundColor: SYS.COLORS.WHITE,
                    paddingHorizontal: 10,
                    marginTop: 10,
                }}
                customLabelStyles={{
                    colorFocused: SYS.COLORS.PRIMARY,
                    colorBlurred: SYS.COLORS.PRIMARY,
                    topFocused: 1
                }}
            />
            
            {errors ? 
                <View style={styles.errorView}>
                    <Text style={
                    errors.message && errors.type == 'required' ?
                        styles.errorRequired
                    : errors.message && errors.type == 'pattern' ?
                        styles.errorAlert
                    : null
                    }>
                    {errors.message}
                    </Text>
                </View>
                : null
            }
            </>
            
        </View>
    );
}