import React, { useCallback, useEffect, useState } from 'react';
import {  Alert, Dimensions, NavigatorIOS } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { Container,  ButtonRoundAdd, } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SegmentedButton from '../../Components/SegmentedButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam';

import { useTicket } from '../../Context/Ticket';

type Props = NativeStackScreenProps<RootStackParamList, 'NewTicket'>;

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = -12.740919;
const LONGITUDE = -60.132189;
const LATITUDE_DELTA = 0.040;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const NewTicket = ({ navigation }: Props) => {
 
    const { coordinate, ticket , handleSetCoordinate} = useTicket();
    const [initRegion, setInitRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    const [canNext, setCanNext] = useState(false);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {     
              setInitRegion({ 
                  latitude,
                  longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02 
              });
              
            }, //sucesso
            () => {}, //erro
            {
              timeout: 2000,
              enableHighAccuracy: true,
              maximumAge: 1000
            }
          );
    },[]);

    useEffect(() => {
        const {latitude, longitude } = initRegion;
        handleSetCoordinate({ latitude, longitude } );
    },[initRegion]);

    useEffect(() => { 
        if (ticket?.longitude != '' && ticket?.latitude != '' && ticket?.idProblem != 0) { 
            setCanNext(true);
        }
    }, [ticket]);

    const handlePreValid = useCallback(() => { 
        if(canNext == true){
            navigation.navigate('PlaceConfirm');
        }else{
            Alert.alert("Informe um defeito e local valído!")
        }
    }, [canNext]);

    return (

        <Container>
            <MapView style={{ flex: 1, width: '100%', height: '100%' }} 
                provider={PROVIDER_GOOGLE} 
                showsBuildings={false} 
                showsUserLocation={true} 
                maxZoomLevel={50}  
                zoomEnabled={true} 
                showsMyLocationButton={false} 
                showsCompass={false}
                moveOnMarkerPress={true}
                onPress={e => handleSetCoordinate(e.nativeEvent.coordinate)}
                region={initRegion} >

                <Marker
                    title={"Solicitação"}
                    key={'01'}
                    coordinate={coordinate}
                />
            </MapView>

            <SegmentedButton />


            <ButtonRoundAdd onPress={handlePreValid} >
                <Icon name="east" size={20} color='white' />
            </ButtonRoundAdd>

        </Container>
    )
};

export default NewTicket;
