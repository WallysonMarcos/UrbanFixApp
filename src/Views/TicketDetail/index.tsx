import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';

import { ButtonRoundAdd, Container , ContentInfo, ConternerItem, ItemDetailStatus, ListContainer} from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam'; 
import { FlatList } from 'react-native-gesture-handler';

import { EventsTicket, IListTickets } from '../../Types';
import { Text, View } from 'react-native';
import Constants from '../../Constants';

import { ilumineApi } from "../../Services/api";
import { Separator } from '../Home/styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'TicketDetail'>;

 

const TicketDetail = ({  route, navigation }: Props) => {

    const [ticket, setTicket] = useState<IListTickets>(route.params.ticket);
    const [loading, setLoading] = useState(false); 
    const [events, setEvents] = useState<Array<EventsTicket> | null>(null);
 
    useEffect(() => {
        ListEventOfTicket();
    },[]);

    async function ListEventOfTicket(){
        try { 
            setLoading(true);
            await ilumineApi.get(`ticket/${ticket?.id}/events`).then((response) => {                
                setEvents(response.data);  
            }).catch((e: any) => {
                throw new Error(e.response.data.message[0]);
            });

        } catch (e: any) {
            Alert.alert('Ops!', e.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (

        <Container>
           
            <MapView style={{ flex: 1, width: '100%', height: '100%' }} 
                provider={PROVIDER_GOOGLE} 
                showsBuildings={false}
                liteMode={true} 
                maxZoomLevel={50}  
                zoomEnabled={false}  
                showsMyLocationButton={false} 
                showsCompass={false}
                customMapStyle={Constants.mapStyle}
                initialRegion={{
                    latitude: parseFloat(ticket.latitude) || -12.740919,
                    longitude: parseFloat(ticket.longitude) || -60.132189,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                }}  >

                <Marker
                    title={`Solicitação ${ticket.id}`}
                    key={'01'}
                    coordinate={{
                        latitude: parseFloat(ticket.latitude) || -12.740919,
                        longitude: parseFloat(ticket.longitude) || -60.132189,
                    }}
                />
            </MapView> 
            <ItemDetailStatus colorStatus={ ticket.status.color }>
                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center' }}>{ticket.status?.description}</Text>
                            </ItemDetailStatus>
            <ContentInfo>
                <Text numberOfLines={1} style={{ color: '#777', fontSize: 16, fontWeight: 'bold' }}>
                    {ticket.cep}
                </Text>
                <Text  numberOfLines={1} style={{ color: '#777', fontStyle: 'italic', fontSize: 11, marginTop: 5, paddingRight: 5 }}>
                    {ticket.publicPlace}
                </Text>
                <Text  numberOfLines={1} style={{ color: '#777', fontStyle: 'italic', fontSize: 11, marginTop: 5, paddingRight: 5 }}>
                    {ticket.suburb}
                </Text>
                
            </ContentInfo>

            <ListContainer>
                <FlatList 
                    style={{flex:2,   marginVertical: 5, width: '100%', height: '100%' }}
                    data={events}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={Separator}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={ListEventOfTicket} />}
                    renderItem={({item}:{item: EventsTicket}) => (
                        <ConternerItem >
                            <View style={{ width: "20%" }}>
                                <Icon name="adjust" size={30} color='green' />
                            </View>

                            <View style={{ width: "80%" }}>


                                <Text numberOfLines={1} style={{ color: '#777', fontSize: 16, fontWeight: 'bold' }}>
                                    {item.note}
                                </Text>
                                <Text numberOfLines={1} style={{ color: '#777', fontStyle: 'italic', fontSize: 11, marginTop: 5, paddingRight: 5 }}>
                                    {`Registrado às ${item.dtEvent.split('T')[1].split('.')[0]} do dia ${item.dtEvent.split('T')[0]}`}
                                </Text> 
                            </View>
                        </ConternerItem>

                    )}
                /> 
            </ListContainer>

            <ButtonRoundAdd onPress={() => Alert.alert('To do...')} >
                <Icon name="star" size={20} color='white' />
            </ButtonRoundAdd>

        </Container>
    )
};

export default TicketDetail;