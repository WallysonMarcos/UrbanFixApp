import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, TextInputChangeEventData, View } from "react-native";

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Routers/rootStackParam';
import { ButtonRoundAdd, Container, Content } from "../styles";
import { Input, InputMask } from "../../../Components/Form";
import { PlaceFromData, ValidationErrorData } from "../../../Types";
import { useTicket } from "../../../Context/Ticket";
import Constants from "../../../Constants";
import Icon from "react-native-vector-icons/MaterialIcons";


type Props = NativeStackScreenProps<RootStackParamList, 'PlaceConfirm'>;

 
const PlaceConfirm = ({ navigation }: Props) => {

    const formRef = useRef<FormHandles>(null);
    const { successed, loading, ticket, handleCep, handlePlaceConfirm, handleNewTicket, handleListMyTickets} = useTicket();

    useEffect(() => {
        formRef.current?.setFieldValue('cep', ticket?.cepMasked);
        formRef.current?.setFieldValue('publicPlace', ticket?.publicPlace);
        formRef.current?.setFieldValue('suburb', ticket?.suburb);

        
    }, [ticket]); 

    const eventConsultCep = useCallback(async (event: TextInputChangeEventData) => {
        if(event.text.length == 9)//cep tamanho válido 
            await handleCep(event.text);        
    }, []);


    const handleSubmit: SubmitHandler<PlaceFromData> = async (data) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                cep: Yup.string().required('O cep precisa ser informado!'),
                number: Yup.string().required('O número precisa ser informado!'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { cep, publicPlace, suburb, number, complements, note } = data;
            
            handlePlaceConfirm( { cep, publicPlace, suburb, number, complements, note }  );

            await handleNewTicket();
            
            if(successed){ 
                await handleListMyTickets();
                navigation.navigate('Home');
            }
 
        }
        catch (err) {
            var msg = "";
            var validationErrors: ValidationErrorData = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error: ValidationErrorData) => {
                    validationErrors[error.path] = error.message;
                    msg += error.message + "\n";
                });
                formRef.current?.setErrors(validationErrors);
                Alert.alert("Ops!", msg);
            }

        }
    };

    return (
        <Container>
            <Content>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <InputMask type={'custom'} options={{ mask: '99999-999' }}
                        icon="edit-location" placeholder="CEP" name="cep"
                        keyboardType={'number-pad'} maxLength={9}
                        onChange={(e) => eventConsultCep(e.nativeEvent)} /> 
                    <Input icon="chevron-right" placeholder="Rua" name="publicPlace" />
                    <Input icon="chevron-right" placeholder="Bairro" name="suburb" />
                    <Input icon="chevron-right" placeholder="Número" name="number" />
                    <Input icon="chevron-right" placeholder="Complemento" name="complements" />
                    <Input icon="chevron-right" placeholder="Observação" name="note" />
                </Form>

            </Content>
            <ButtonRoundAdd onPress={() => formRef.current?.submitForm()} >
                <Icon name="done" size={20} color='white' />
            </ButtonRoundAdd>
            <ActivityIndicator animating={loading} size={"large"} color={Constants.colorPrimary} />
        </Container>
    )
};

export default PlaceConfirm;