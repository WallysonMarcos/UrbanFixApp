import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Title, Content, ButtonSubmit, ButtonRoundAdd, TextButton } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from '../../Constants';

import { useAuth } from '../../Context/Auth';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


const Home = ({ navigation } : Props) => {

    const { user, handleSignOut, loading } = useAuth();

    async function SignOut() {
        await handleSignOut()
    }
    return (
        <Container>


            <Content>
                <Title>Home</Title>
                <ButtonSubmit onPress={() => SignOut()} >
                    <Icon name="logout" size={20} color='white' />
                    <TextButton allowFontScaling={false}>SignOut</TextButton>
                </ButtonSubmit>
                <ActivityIndicator animating={loading} size="large" color={Constants.colorPrimary} />
            </Content>

            <ButtonRoundAdd onPress={() => navigation.navigate('NewTicket')} >
                <Icon name="add" size={20} color='white' />
            </ButtonRoundAdd>
        </Container>
    )
};

export default Home;
