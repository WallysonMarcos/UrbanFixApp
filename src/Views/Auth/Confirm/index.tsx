import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native"; 

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Routers/rootStackParam';


import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { InfoText, ButtonSubmit, TextButton, Title } from '../styles';
import { ConfirmData, ValidationErrorData } from '../../../Types';


import { InputMask } from '../../../Components/Form';
import { useAuth } from "../../../Context/Auth";
import { TouchableOpacity } from "react-native-gesture-handler";


type Props = NativeStackScreenProps<RootStackParamList, 'Confirm'>;



const Confirm = ({ route, navigation }: Props) => {

    const formRef = useRef<FormHandles>(null);
    const [formatedNumber, setFormatedNumber] = useState('');
    const { handleConfirm, loading,successed }  = useAuth();

    useEffect(() => {
        let _cellNumber = formatTel(route.params.cellNumber);
        setFormatedNumber(_cellNumber);
    },[])

    const handleSubmit: SubmitHandler<ConfirmData> = async (data) => {

        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                token: Yup.string().required('O código de confirmação é obrigatório!')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { cellNumber =  route.params.cellNumber , token } = data;
            
            await handleConfirm({ cellNumber, token });

            if (successed){
                navigation.navigate('SignIn');
            }

        } catch (err) {
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
        return false;
    };

    return (
        <View style={localStyles.centeredView}>
            <View style={localStyles.modalView}>
                <Title>{formatedNumber}</Title>
                <InfoText>Informe seu token </InfoText>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    
                    <InputMask type={'custom'} options={{ mask:'999-999'}}  icon="lock" placeholder="000-000" name="token" keyboardType={'number-pad'} maxLength={7} />
                    <ButtonSubmit disabled={loading}  onPress={() => formRef?.current?.submitForm()} >
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


function formatTel( tel: string) {
    tel=tel.replace(/\D/g,"") 
    tel=tel.replace(/(.{0})(\d)/,"$1($2")
    tel=tel.replace(/(.{3})(\d)/,"$1) $2")  
    tel=tel.replace(/(.{4})$/,"-$1")

    return tel;
}


export default Confirm;