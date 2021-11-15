import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, RefreshControl, Text, View } from 'react-native';

import {
    Container, ConternerItem, Separator, ButtonRoundAdd, ItemDetailStatus, ItemDetail
} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from '../../Constants';
import { IListTickets } from '../../Types'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Routers/rootStackParam';
import { useTicket } from '../../Context/Ticket';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


const Home = ({ navigation }: Props) => {

    const { tickets, loading, handleListMyTickets } = useTicket();

    useEffect(() => {
        handleListMyTickets();
    }, []);

    return (
        <Container>
            {loading && tickets?.length == 0 ?
                <ActivityIndicator animating={loading} size="large" color={Constants.colorPrimary} />
                :
                <FlatList
                    style={{ flex: 1, height: '100%', marginTop: 5 }}
                    data={tickets}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={handleListMyTickets} />}
                    renderItem={({ item } : { item: IListTickets}) => (
                        <ConternerItem onPress={() => navigation.navigate('TicketDetail',{ ticket: item })} >
                            <View style={{ width: '100%', height: '65%' }} >
                                <MapView style={{ flex: 1 }}
                                    showsUserLocation={false}
                                    provider={PROVIDER_GOOGLE} 
                                    showsMyLocationButton={false}
                                    scrollEnabled={false}
                                    toolbarEnabled={false}
                                    zoomEnabled={false}
                                    liteMode={true}
                                    customMapStyle={Constants.mapStyle}
                                    initialRegion={{
                                        latitude: parseFloat(item.latitude) || -12.740919,
                                        longitude: parseFloat(item.longitude) || -60.132189,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }} >
                                    <Marker
                                        title={"Solicitação"}
                                        key={'01'}
                                        coordinate={{
                                            latitude: parseFloat(item.latitude) || -12.740919,
                                            longitude: parseFloat(item.longitude) || -60.132189,
                                        }}
                                    />

                                </MapView>
                            </View>
                            <Separator />
                            <ItemDetail>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Text numberOfLines={1} style={{ color: '#777', fontSize: 16, fontWeight: 'bold' }}>{item.dtOpen.split('T')[0]}</Text>
                                    <Text style={{ color: '#777' }}>{item.note || ''}</Text>
                                </View>
                                <Text numberOfLines={1} style={{ color: '#777', fontStyle: 'italic', fontSize: 11, marginTop: 5, paddingRight: 5 }}>{
                                    `${item.publicPlace}, Nº ${item.number}, ${item.suburb || ''}`
                                }</Text>

                            </ItemDetail>
                            <ItemDetailStatus colorStatus={ item.status.color }>
                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center' }}>{item.status?.description}</Text>
                            </ItemDetailStatus>
                        </ConternerItem>
                    )}
                />
            }

            <ButtonRoundAdd onPress={() => navigation.navigate('NewTicket')} >
                <Icon name="add" size={20} color='white' />
            </ButtonRoundAdd>
        </Container>
    )
};

export default Home;
