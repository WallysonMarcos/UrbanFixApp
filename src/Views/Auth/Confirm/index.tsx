import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";


import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { InfoText, ButtonSubmit, TextButton } from '../styles';
import { ConfirmData, ValidationErrorData } from '../../../Types';

import { Input } from '../../../Components/Form';
import { useAuth } from "../../../Context/Auth";
import { TouchableOpacity } from "react-native-gesture-handler";





const Confirm = () => {

    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const { handleConfirm, loading }  = useAuth();

    const handleSubmit: SubmitHandler<ConfirmData> = async (data) => {

        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                token: Yup.string().required('O token é obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { cellNumber = '699817129' , token } = data;
            // handleConfirm({ cellNumber, token })
            navigation.goBack();

        } catch (err) {
            var msg = "";
            var validationErrors: ValidationErrorData = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error: ValidationErrorData) => {
                    validationErrors[error.path] = error.message;
                    msg += error.message + "\n";
                });
                formRef.current?.setErrors(validationErrors);
                Alert.alert(msg);
            }

        }
        return false;
    };

    return (
        <View style={localStyles.centeredView}>
            <View style={localStyles.modalView}>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <InfoText>Informe seu token </InfoText>
                    <Input icon="lock" placeholder="000-000" name="token" keyboardType={'number-pad'} maxLength={6} />
                    <ButtonSubmit onPress={() => formRef?.current?.submitForm()} >
                        <TextButton allowFontScaling={false}  >Confirmar</TextButton>
                    </ButtonSubmit>
                </Form>

                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <InfoText>Voltar</InfoText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '70%',
        backgroundColor: "white",
        borderRadius: 5,
        paddingTop: 25,
        paddingBottom: 20,
        paddingHorizontal: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5
    }
});



export default Confirm;