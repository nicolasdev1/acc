import React from 'react'
import { Text, View } from 'react-native'
import { SYS } from '../../../theme';
import SelectList from 'react-native-dropdown-select-list'
import { styles } from './styles';
import { FieldError } from 'react-hook-form';

interface SelectProps {
    placeholder: string;
    setSelected: (val: any) => void;
    data: any;
    search: boolean;
    searchPlaceholder?: string;
    handleSelect?: (val: any) => void;
    errors?: FieldError | undefined;
}

export function Select({ placeholder, setSelected, data, search, searchPlaceholder, handleSelect, errors, ...rest }: SelectProps) {
    return (
        <View style={styles.container}>
            <>
                <SelectList
                    {...rest}
                    placeholder={placeholder}
                    setSelected={setSelected}
                    data={data}
                    search={search}
                    searchPlaceholder={searchPlaceholder ? searchPlaceholder : 'Pesquise'}
                    onSelect={handleSelect ? handleSelect : () => { }}
                    maxHeight={150}
                    boxStyles={{
                        borderColor: SYS.COLORS.PRIMARY,
                        marginVertical: 10,
                    }}
                    inputStyles={{
                        color: SYS.COLORS.PRIMARY
                    }}
                    dropdownStyles={{
                        borderColor: SYS.COLORS.PRIMARY,
                        marginTop: 0,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderTopWidth: 0,
                    }}
                    dropdownTextStyles={{
                        color: SYS.COLORS.PRIMARY
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
    )
}