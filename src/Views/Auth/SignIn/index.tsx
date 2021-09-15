import React, { useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Content, ButtonSubmit, TextButton, LogoBottom } from './Styles';
 
import { Input } from '../../../Components/Form'; 
import { useAuth } from '../../../Context/Auth';
 
interface SignInFormData {
  login: string;
  password: string;
}

interface ValidationErrorData {
  [key: string]: any
}


interface  ErrorData {
  path: React.ReactText;
  message: string;
}


const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const { user, handleAuth, loading } = useAuth();


  const handleSubmit : SubmitHandler<SignInFormData> =  async( data ) => { 

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          login: Yup.string().required('Login é obrigatório'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data)
        const { login, password } = data;

        handleAuth({ login, password });

      } catch (err) {

        var validationErrors: ValidationErrorData = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach( (error: ValidationErrorData)  => { 
            validationErrors[error.path] = error.message;
          });
          formRef.current?.setErrors(validationErrors);
        }

      }
      return false;
    };

  return (
    <Container>
      <Content>
        {/* <LogoBottom source={logo}  resizeMode={'stretch'}/> */}
        <Title>UrbanFix App</Title> 

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon="smartphone" placeholder="telefone" name="login" keyboardType={'default'} />
          <Input icon="lock"  placeholder="senha" name="password" keyboardType={'number-pad'} secureTextEntry />
           
          <ButtonSubmit  onPress={() => formRef?.current?.submitForm()} >
            <Icon name="input" size={20} color='white' /> 
            <TextButton allowFontScaling={false}  >ENTRAR</TextButton>
          </ButtonSubmit>
        </Form>
      </Content>

      {/* <ModalLottie visible={loading} duration={1500} loop={true} source={require('../../assets/lottie/loading.json')} /> */}

    </Container>
  );
};

export default SignIn;
