﻿import React, { useEffect, useRef, useCallback, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { useField } from '@unform/core';
//import Icon from 'react-native-vector-icons/Feather';

import Constants from '../../Constants'

import { InputContainer, IconContainer, InputContent, TextContent } from './styles';



interface Props {
    name: string;
    label?: string;
    icon: string;
};
type InputProps = TextInputProps & Props;

interface PropsInput {
    value: string;
};
type InputRef = TextInput & PropsInput;



const Input: React.FC<InputProps> = ({ name, icon, onChangeText, ...rest }) => {


    const inputRef = useRef<InputRef>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, registerField, defaultValue, error } = useField(name);



    const [focused, setFocused] = useState(false);
    const [blured, setBlured] = useState(false);
    const [errored, setErrored] = useState(false);


    useEffect(() => {
        registerField({
            name: fieldName,
            path: 'value',
            ref: inputRef.current
        })
    }, [fieldName, registerField]);

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

    const handleOnChangeText = useCallback((value) => {
        setErrored(false);
        if (inputRef.current) inputRef.current.value = value;
        if (onChangeText) onChangeText(value);
    }, []);

    return (
        <InputContainer lError={errored} lFocused={focused} lBlured={blured} >
            <IconContainer>
                {/* <Icon name={icon} size={20} color={Constants.colorSecundary} /> */}
            </IconContainer>
            <InputContent
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                onChangeText={handleOnChangeText}
                ref={inputRef}
                {...rest}
            />
            {errored && <TextContent>{error}</TextContent>}
        </InputContainer>

    );
};


export default Input;