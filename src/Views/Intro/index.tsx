import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';


import AppIntroSlider from 'react-native-app-intro-slider';
import Constants from '../../Constants';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam';

import { useAuth } from '../../Context/Auth';

const slides = [
  {
    key: '0',
    title: 'Bem-Vindo',
    text: 'Veja como é fácil registrar \n sua solicitação...',
    image: require('../../assets/welcome.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '1',
    title: 'Sua primeira vez',
    text: 'Simples e interativo...',
    image: require('../../assets/home_empty.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Abrindo uma solicitação',
    text: 'Selecione um local no mapa e \n o tipo de defeito.',
    image: require('../../assets/newticket_app.png'),
    backgroundColor: '#59b2ab',
  },
  
  {
    key: '3',
    title: 'Quase lá...',
    text: 'Agora confirme algumas informações \n importantes para o atendimento.',
    image: require('../../assets/placeconfirme_app.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: '4',
    title: 'Suas solicitações',
    text: 'Para visualizar os detalhes,\nclique no card da solicitação.',
    image: require('../../assets/home_app.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '5',
    title: 'Parabéns ',
    text: 'Agora é só aguardar sua solicitação  \n ser atendida!',
    image: require('../../assets/detail_app.png'),
    backgroundColor: '#22bcb5',
  }
];

type Item = typeof slides[0];
type Props = NativeStackScreenProps<RootStackParamList, 'NewTicket'>;


const IntroWelcome = ({ navigation }: Props) => {

  const { handleDoneIntro } = useAuth();

  const _renderItem = ({ item }: { item: Item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };


  const _keyExtractor = (item: Item) => item.key;

  return (
    <AppIntroSlider
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      nextLabel={'Próximo'}
      doneLabel={'OK'}
      onDone={() => {
        handleDoneIntro();
        navigation.navigate('Home')
      }}
      data={slides}
    />
  )
};

export default IntroWelcome;


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  image: {
    width: 320,
    height: '65%',
    marginVertical: 20,
    resizeMode: 'contain',
    backfaceVisibility: 'visible',
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: Constants.fontNormal,
  },
  title: {
    fontSize: Constants.fontLarger,
    color: 'white',
    textAlign: 'center',
  },
});