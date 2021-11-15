import React, { useCallback, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';

import { Container,  ButtonRoundAdd, } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam';
import { useTicket } from '../../Context/Ticket';



type Props = NativeStackScreenProps<RootStackParamList, 'TicketDetail'>;

 

const TicketDetail = ({  route, navigation }: Props) => {

    const ticket = route.params.ticket;

    return (

        <Container>
            <MapView style={{ flex: 1, width: '100%', height: '100%' }} 
                provider={PROVIDER_GOOGLE} 
                showsBuildings={false}
                liteMode={true} 
                maxZoomLevel={50}  
                zoomEnabled={true}  
                initialRegion={{
                    latitude: parseFloat(ticket.latitude) || -12.740919,
                    longitude: parseFloat(ticket.longitude) || -60.132189,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
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

        </Container>
    )
};

export default TicketDetail;