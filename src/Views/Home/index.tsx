import React from 'react';
import {  ActivityIndicator } from 'react-native'; 

import { Container, Title, Content, ButtonSubmit, TextButton } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from '../../Constants';

import { useAuth } from '../../Context/Auth';

const Home: React.FC = () => {

    const { user, handleSignOut, loading } = useAuth();

    async function SignOut(){
        await handleSignOut()
    }
    return (
        <Container>
            <Content>

                <Title>Home</Title> 
                <Title>{user?.name}</Title> 
                 
                <ButtonSubmit  onPress={() => SignOut()} >
                    <Icon name="logout" size={20} color='white' /> 
                    <TextButton allowFontScaling={false}>SAIR</TextButton>
                </ButtonSubmit>
                <ActivityIndicator animating={loading} size="large" color={Constants.colorPrimary} />
            </Content>
        </Container>
    )
};

export default Home;
