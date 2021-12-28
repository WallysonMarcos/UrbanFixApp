import React, { useRef } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';  
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Routers/rootStackParam';


import { Container, Title, Content, ButtonSubmit, TextButton, RegisterText } from '../styles';

import { Input, InputMask } from '../../../Components/Form';
import { useAuth } from '../../../Context/Auth';
import Constants from '../../../Constants';


 


interface SignInFormData {
  username: string;
  password: string;
}

interface ValidationErrorData {
  [key: string]: any
} 

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

 
const SignIn  = ({ navigation }: Props) => {

  const formRef = useRef<FormHandles>(null);
  const { handleSignIn, loading, confirmCell } = useAuth(); 

  const handleSubmit: SubmitHandler<SignInFormData> = async (data) => {
 
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        username: Yup.string().required('Telefone é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { username, password } = data;
      
      await handleSignIn({ username, password }, () => { navigation.navigate('Confirm', { cellNumber: username }); });
       

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
        <Title style={{marginBottom: 40}}>UrbanFix App</Title>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputMask  testID="username" type={'cel-phone'} icon="smartphone" placeholder="telefone" placeholderTextColor={Constants.colorGray} name="username" keyboardType={'number-pad'} />
          <Input testID="password" icon="lock" placeholder="senha" placeholderTextColor={Constants.colorGray} name="password" keyboardType={'number-pad'} secureTextEntry />

          <ButtonSubmit testID="submitForm" onPress={() => formRef?.current?.submitForm()} >
            <Icon name="input" size={20} color='white' />
            <TextButton allowFontScaling={false}  >ENTRAR</TextButton>
          </ButtonSubmit>
        </Form>

        <TouchableOpacity testID="btnSignUp" onPress={() => navigation.navigate('SignUp')} >
          <RegisterText>Registar-se</RegisterText>
        </TouchableOpacity>
      </Content>

      <ActivityIndicator animating={loading} size="large" color={Constants.colorPrimary} />

    </Container>
  );
};

export default SignIn;
