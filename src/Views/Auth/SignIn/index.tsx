import React, { useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { Container, Title, Content, ButtonSubmit, TextButton, LogoBottom } from './styles';
 
import { Input } from '../../../Components/Form'; 
//import { useAuth } from '../../../context/Users';

interface SignInFormData {
  login: string;
  password: string;
}

interface ValidationErrorData {
  [key: string]: any
}


interface  ErrorData {
  path: React.ReactText;
  message: any;
}


const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  //const { user, handleAuth, loading } = useAuth();


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

        const { login, password } = data;

        //handleAuth({ login, password });

      } catch (err) {

        // var validationErrors: ValidationErrorData = {};
        // if (err instanceof Yup.ValidationError) {
        //   err.inner.forEach( (error: ErrorData) => {
        //     validationErrors[error.path] = error.message;
        //   });
        //   formRef.current?.setErrors(validationErrors);
        // }

      }
      return false;
    };

  return (
    <Container>
      <Content>
        {/* <LogoBottom source={logo}  resizeMode={'stretch'}/> */}
        <Title>Nome da empresa ltda</Title>
        <Title>00.000.000/0001-00</Title>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon="smartphone" placeholder="Login" name="login" keyboardType={'default'} />
          <Input icon="smartphone"  placeholder="Senha" name="password" keyboardType={'number-pad'} secureTextEntry />
           
          <ButtonSubmit  onPress={() => formRef?.current?.submitForm()} >
            {/* <Feather name="log-in" size={20} color='white' /> */}
            <TextButton allowFontScaling={false}  >ENTRAR</TextButton>
          </ButtonSubmit>
        </Form>
      </Content>

      {/* <ModalLottie visible={loading} duration={1500} loop={true} source={require('../../assets/lottie/loading.json')} /> */}

    </Container>
  );
};

export default SignIn;
