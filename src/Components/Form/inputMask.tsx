import React, { useEffect, useRef, useCallback, useState } from 'react';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import { useField } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import Constants from '../../Constants'
69
import { InputContainer, IconContainer, InputContent, TextContent } from './styles';


interface Props {
    name: string;
    label?: string;
    icon: string;
    mask?: string;
};
type InputProps = TextInputMaskProps & Props;

interface PropsInput {
    value: string;
};
type InputRef = TextInputMask & PropsInput;



const InputMask: React.FC<InputProps> = ({ name, icon, mask, onChangeText, ...rest }) => {

    const inputRef = useRef<InputRef>(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [focused, setFocused] = useState(false);
    const [blured, setBlured] = useState(false);
    const [errored, setErrored] = useState(false);
    const [value, setValue] = useState('');
    const [rawValue, setRawValue] = useState('');


    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, rawValue, registerField]);


    // useEffect(() => {
    //     registerField({ 
    //         name: fieldName,
    //         path: 'value',
    //         ref: inputRef.current,
    //         clearValue(ref) {
    //             ref.value = '';
    //             ref.clear();
    //         },
    //         setValue(ref, value) {
    //             ref.setNativeProps({ text: value });
    //             inputRef.current.value = value;
    //         },
    //         getValue(ref) {
    //             return rawValue || ref.value;
    //         },
    //     })
    // },[fieldName,  rawValue, registerField]);

    useEffect(() => {
        if (error) {
            setErrored(true);
        }
    }, [error])

    const handleInputFocus = useCallback(() => {
        setFocused(true);
        setErrored(false);
    }, []);

    const handleInputBlur = useCallback(() => {
        setFocused(false);
        setErrored(false);
        setBlured((inputRef.current?.value !== '') ? true : false);
    }, []);

    const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
        setErrored(false);
        setValue(maskedValue);
        setRawValue(unmaskedValue);
        if (inputRef.current) inputRef.current.value = unmaskedValue;
    }, []);

    return (
        <InputContainer lError={errored} lFocused={focused} lBlured={blured} >
            <IconContainer>
                <Icon name={icon} size={20} color={Constants.colorGray} />
            </IconContainer>
            <TextInputMask
                style={{ width: '100%' }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                value={value}
            
                onChangeText={handleOnChangeText}
                ref={inputRef}
                includeRawValueInChangeText
                {...rest}
            />
            {errored && <TextContent>{error}</TextContent>}
        </InputContainer>

    );
};

export default InputMask;