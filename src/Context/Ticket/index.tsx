import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import { ilumineApi, viaCepApi } from "../../Services/api";
import { ConsultCep, TicketContextData, TicketData, LatLng, EventsTicket, IListTickets } from "../../Types";
import { useAuth } from "../Auth";

const InitialContext = {
    idProblem: 0,
    cep: "",
    cepMasked: "",
    publicPlace: "",
    complements: "",
    number: 0,
    suburb: "",
    note: "",
    latitude: "",
    longitude: "",
};

const TicketContext = createContext<TicketContextData>({} as TicketContextData);


export const TicketProvider: React.FC = ({ children }) => {

    
    const [loading, setLoading] = useState(false);
    const [successed, setSuccessed] = useState(false);
    const [selected, setSelected] = useState(0);
    const [tickets, setTickets] = useState< Array<IListTickets> | null >(null);
    const [events, setEvents] = useState<Array<EventsTicket> | null>(null);
    const [ticket, setTicket] = useState<TicketData>(InitialContext);
    const [consultCep, setConsultCep] = useState<ConsultCep | null>(null);
    const [coordinate, setCoordinate] = useState<LatLng>({ latitude: -12.740919, longitude: -60.132189 })
    const { handleSignOut } = useAuth();

    const [problems, setProblems] = useState([
        {
            id: 1,
            description: "LÂMPADA QUEIMADA",
            icon: "highlight-off"
        },
        {
            id: 2,
            description: "LÂMPADA ACESA",
            icon: "lightbulb"
        },
        {
            id: 3,
            description: "LÂMPADA OSCILANDO",
            icon: "new-releases"
        },
        {
            id: 4,
            description: "LÂMPADA DANIFICADA",
            icon: "broken-image"
        }
    ]);
 
    const handleSetIdProblem = useCallback((id: number) => {
        setTicket(prevState => ({
            ...prevState,
            idProblem: id
        }));
        setSelected(id);
    }, []);

    const handlePlaceConfirm = useCallback( async ({ cep, publicPlace, suburb, number, complements, note }) => {

        
        try { 
            setLoading(true);
            await setTimeout(() => { 
                setTicket(prevState => ({
                    ...prevState,
                    cep,
                    publicPlace,
                    suburb,
                    number,
                    complements,
                    note,
                }));
            }, 1000);
        } finally { 
            setLoading(false);
        }

        
    }, []);

    const ListMyTickets = useCallback(async () => {
        try {
            setSuccessed(false);
            setLoading(true);

            await ilumineApi.get('ticket').then((response) => { 
                let _tickets = response.data;
                _tickets.sort((a: any,b: any) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))
                setTickets(_tickets);                
                setSuccessed(true);
            }).catch((e: any) => {
                if (e.response.status === 401) {
                    handleSignOut();
                } else {
                    throw new Error(e.response.data.message[0])
                }
            });

        } catch (e: any) {
            Alert.alert('Ops!', e.message);
        }
        finally {
            setLoading(false);        }
    }, []);

    const ListEventOfTicket = async (ticketId: number) => {
        try {
            setSuccessed(false);
            setLoading(true);

            await ilumineApi.get(`ticket/${ticketId}/events`).then((response) => {                
                setEvents(response.data);
                setSuccessed(true);
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

    const handleNewTicket = async () => {

        try {
            setSuccessed(false);
            setLoading(true);

            await ilumineApi.post('ticket', ticket).then((response) => {
                Alert.alert('Sucesso!', response.data.message);
                setSelected(0);
                setCoordinate({ latitude: -12.740919, longitude: -60.132189 });
                setTicket(InitialContext);
                setSuccessed(true);
            }).catch((e: any) => {
                console.log(e.response.data)
                throw new Error(e.response.data.message[0])
            });


        } catch (e: any) {
            Alert.alert('Ops!', e.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleCep = useCallback(async (cep) => {
        try {
            setLoading(true);
            setSuccessed(false);
            setConsultCep(null); 

            await viaCepApi.get(`${cep}/json`).then((response) => {
                let _consultaCep = response.data as ConsultCep;

                setConsultCep(response.data)
                setTicket(prevState => ({
                    ...prevState,
                    cep: cep.replace('-', ''),
                    cepMasked: cep,
                    suburb: _consultaCep.bairro,
                    publicPlace: _consultaCep.logradouro
                }))
                setSuccessed(true);
            });

        } catch (e: any) {
            setSuccessed(false);
            Alert.alert("Ops!", e.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const handleSetCoordinate = useCallback((coordinate: LatLng) => {
        setTicket(prevState => ({
            ...prevState,
            longitude: coordinate.longitude.toString(),
            latitude: coordinate.latitude.toString()
        }));
        setCoordinate(coordinate);
    }, []);


    return (
        <TicketContext.Provider
            value={{
                loading,
                successed,
                ticket,
                events,
                tickets,
                selected,
                coordinate,
                consultCep,
                problems,
                handleNewTicket,
                handleCep,
                handleSetIdProblem,
                handleSetCoordinate,
                handlePlaceConfirm,
                ListMyTickets,
                ListEventOfTicket
            }}>
            {children}
        </TicketContext.Provider>
    );
};

export function useTicket() {

    const context = useContext(TicketContext);

    if (!context)
        throw new Error('useTicket must be used within an TicketContext');

    const {
        loading,
        successed,
        ticket,
        tickets, 
        events,
        selected,
        coordinate,
        consultCep,
        problems,
        handleNewTicket,
        handleCep,
        handleSetIdProblem,
        handleSetCoordinate,
        handlePlaceConfirm,
        ListMyTickets,
        ListEventOfTicket
    } = context;

    return {
        loading,
        successed,
        ticket, 
        tickets,
        events,
        selected,
        coordinate,
        consultCep,
        problems,
        handleNewTicket,
        handleCep,
        handleSetIdProblem,
        handleSetCoordinate,
        handlePlaceConfirm,
        ListMyTickets,
        ListEventOfTicket
    }
};