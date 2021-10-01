import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Routers/rootStackParam';
import { ButtonRoundAdd, ButtonSubmit, Container, Content, TextButton } from "../styles";
import { Input, InputMask } from "../../../Components/Form";
import { PlaceFromData, ValidationErrorData } from "../../../Types";
import { useTicket } from "../../../Context/Ticket";
import Constants from "../../../Constants";
import Icon from "react-native-vector-icons/MaterialIcons";


type Props = NativeStackScreenProps<RootStackParamList, 'PlaceConfirm'>;

 
const PlaceConfirm = ({ navigation }: Props) => {

    const formRef = useRef<FormHandles>(null);
    const { successed, loading, ticket, handleCep, handlePlaceConfirm, handleNewTicket} = useTicket();
    const [ canNext, setCanNext] = useState(false);


    useEffect(() => {
        formRef.current?.setFieldValue('publicPlace', ticket?.publicPlace);
        formRef.current?.setFieldValue('suburb', ticket?.suburb);
    }, [ticket]); 

    const handleConsultCep = useCallback(async () => {
        const cep = formRef.current?.getFieldValue('cep');
        await handleCep(cep)
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

            const { cep, publicPlace, suburb, number,complements, note } = data;

            handlePlaceConfirm( { cep, publicPlace, suburb, number, complements, note }  );

            await handleNewTicket();
            
            if(successed){
                Alert.alert("Success!");
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
                        icon="map" placeholder="CEP" name="cep"
                        keyboardType={'number-pad'} maxLength={10} />
                    <ButtonSubmit onPress={() => handleConsultCep()}>
                        <TextButton>{"Consultar"}</TextButton>
                    </ButtonSubmit>
                    <Input icon="chevron-right" placeholder="Rua" name="publicPlace" />
                    <Input icon="chevron-right" placeholder="Bairro" name="suburb" />
                    <Input icon="chevron-right" placeholder="Number" name="number" />
                    <Input icon="chevron-right" placeholder="Complemento" name="complements" />
                    <Input icon="chevron-right" placeholder="Observação" name="note" />
                </Form>

            </Content>
            <ButtonRoundAdd onPress={() => formRef.current?.submitForm()} >
                <Icon name="add" size={20} color='white' />
            </ButtonRoundAdd>
            <ActivityIndicator animating={loading} size={"large"} color={Constants.colorPrimary} />
        </Container>
    )
};

export default PlaceConfirm;