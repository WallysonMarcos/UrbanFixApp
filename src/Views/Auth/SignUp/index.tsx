import React, { useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { Container, Title, Content, ButtonSubmit, TextButton, RegisterText } from '../styles';

import { Input, InputMask } from '../../../Components/Form';

import { ActivityIndicator, Alert, View } from 'react-native';
import Constants from '../../../Constants';
import { useAuth } from '../../../Context/Auth';

import { SignInData, ValidationErrorData, SignInScreenProp} from '../../../Types';

import { TouchableOpacity } from 'react-native-gesture-handler';


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Routers/rootStackParam';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp  = ({ navigation }: Props) => {

  const formRef = useRef<FormHandles>(null);
  const { user, handleSignUp, loading, successed } = useAuth(); 

  const handleSubmit: SubmitHandler<SignInData> = async (data) => {

    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        //email: Yup.string().required('Email é obrigatório').email() 
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, lastName, email, cellNumber, password } = data;

      await handleSignUp({ name, lastName, email, cellNumber, password })
      
      if(successed){
        navigation.goBack();
        navigation.navigate('Confirm',{ cellNumber });        
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
        Alert.alert(msg);
        formRef.current?.setErrors({});
      }

    }
    return false;
  };
 
  return (
    <Container>
      <Content>
        {/* <LogoBottom source={logo}  resizeMode={'stretch'}/> */}
        <Title>Olá, bem-vindo ao UrbanFix</Title>

        <Form ref={formRef} onSubmit={handleSubmit}>

          <Input icon="face" placeholder="Nome" name="name" keyboardType={'default'} />
          <Input icon="mood" placeholder="Sobrenome" name="lastName" keyboardType={'default'} />



          <Input icon="email" autoCapitalize={'none'} placeholder="E-mail" name="email" keyboardType={'url' } />
          <InputMask type={'cel-phone'} icon="smartphone"placeholder="Telefone" name="cellNumber" keyboardType={'number-pad'} maxLength={15}/>
          <Input icon="lock" placeholder="Senha" name="password" keyboardType={'number-pad'} secureTextEntry />
          
          <ButtonSubmit onPress={() => formRef?.current?.submitForm()} >
            <Icon name="input" size={20} color='white' />
            <TextButton allowFontScaling={false}  >REGISTAR</TextButton>
          </ButtonSubmit>
        </Form>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")} >
          <RegisterText>Voltar ao Login</RegisterText>
        </TouchableOpacity>

      </Content>

      <ActivityIndicator animating={loading} size="large" color={Constants.colorPrimary} />

    </Container>
  );
};

export default SignUp;
