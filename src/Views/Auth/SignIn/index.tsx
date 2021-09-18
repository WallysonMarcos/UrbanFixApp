import React, { useRef } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; 
import { NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Routers/rootStackParam';


import { Container, Title, Content, ButtonSubmit, TextButton, RegisterText } from './styles';

import { Input, InputMask } from '../../../Components/Form';
import { useAuth } from '../../../Context/Auth';
import Constants from '../../../Constants';



type SignUpScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;


interface SignInFormData {
  username: string;
  password: string;
}

interface ValidationErrorData {
  [key: string]: any
}



const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const { handleAuth, loading } = useAuth();
  const navigation = useNavigation<SignUpScreenProp>();

  const handleSubmit: SubmitHandler<SignInFormData> = async (data) => {

    console.log(data)

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

      handleAuth({ username, password });

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
        {/* <LogoBottom source={logo}  resizeMode={'stretch'}/>  65 9 9605-5008*/}
        <Title>UrbanFix App</Title>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon="smartphone" placeholder="telefone" name="username" keyboardType={'number-pad'} />
          <Input icon="lock" placeholder="senha" name="password" keyboardType={'number-pad'} secureTextEntry />

          <ButtonSubmit onPress={() => formRef?.current?.submitForm()} >
            <Icon name="input" size={20} color='white' />
            <TextButton allowFontScaling={false}  >ENTRAR</TextButton>
          </ButtonSubmit>
        </Form>

        <TouchableOpacity onPress={() =>  navigation.navigate('SignUp') } >
          <RegisterText>Registar-se</RegisterText>
        </TouchableOpacity>
      </Content>

      <ActivityIndicator animating={loading} size="large" color={Constants.colorPrimary} />
 
    </Container>
  );
};

export default SignIn;
