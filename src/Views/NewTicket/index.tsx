import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';

import { Container, Title, Content, ButtonSubmit, ButtonRoundAdd, TextButton } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SegmentedButton from '../../Components/SegmentedButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam';

import { useTicket } from '../../Context/Ticket';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from '../../Constants';

type Props = NativeStackScreenProps<RootStackParamList, 'NewTicket'>;

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = -12.740919;
const LONGITUDE = -60.132189;
const LATITUDE_DELTA = 0.080;
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
                showsUserLocation={true}
                showsMyLocationButton={false}
                // provider={PROVIDER_GOOGLE} 
                showsBuildings={false}
                toolbarEnabled={false}
                maxZoomLevel={50} 
                zoomEnabled={true}
                region={initRegion}
                onPress={e => handleSetCoordinate(e.nativeEvent.coordinate)}
                initialRegion={initRegion} >

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
