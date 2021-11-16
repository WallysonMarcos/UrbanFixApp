import React, { useCallback, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';

import { Container,  ButtonRoundAdd, } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam';
import { useTicket } from '../../Context/Ticket';
import { FlatList } from 'react-native-gesture-handler';

import { EventsTicket } from '../../Types';
import { Text, View } from 'react-native';
import Constants from '../../Constants';


type Props = NativeStackScreenProps<RootStackParamList, 'TicketDetail'>;

 

const TicketDetail = ({  route, navigation }: Props) => {

    const ticket = route.params.ticket;

    const {ListEventOfTicket, events} = useTicket();

    useEffect(() => {
        ListEventOfTicket(ticket.id);
    },[]);
    return (

        <Container>
            <MapView style={{ flex: 1, width: '100%', height: '100%' }} 
                provider={PROVIDER_GOOGLE} 
                showsBuildings={false}
                liteMode={true} 
                maxZoomLevel={50}  
                zoomEnabled={true}  
                customMapStyle={Constants.mapStyle}
                initialRegion={{
                    latitude: parseFloat(ticket.latitude) || -12.740919,
                    longitude: parseFloat(ticket.longitude) || -60.132189,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                }}  >

                <Marker
                    title={"Solicitação"}
                    key={'01'}
                    coordinate={{
                        latitude: parseFloat(ticket.latitude) || -12.740919,
                        longitude: parseFloat(ticket.longitude) || -60.132189,
                    }}
                />
            </MapView> 

            <FlatList 
                style={{flex:2, width: '100%', height: '100%' }}
                data={events}
                keyExtractor={item => item.id}
                renderItem={({item}:{item: EventsTicket}) => (
                    <View style={{ width: '100%', height: '100%' }} >
                         <Text numberOfLines={1} style={{ color: '#777', fontSize: 16, fontWeight: 'bold' }}>
                             {item.dtEvent.split('T')[0]}
                        </Text>
                        <Text numberOfLines={1} style={{ color: '#777', fontSize: 16, fontWeight: 'bold' }}>
                             {item.note}
                        </Text>
                    </View>
                )}
            />

        </Container>
    )
};

export default TicketDetail;