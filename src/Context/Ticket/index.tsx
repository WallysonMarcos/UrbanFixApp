import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import { ilumineApi, viaCepApi } from "../../Services/api";
import { ConsultCep, TicketContextData, TicketData, LatLng, PlaceFromData } from "../../Types";

const InitialContext = {
    idProblem: 0,
    cep: "",
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
    const [selected, setSelected] = useState(0)
    const [ticket, setTicket] = useState<TicketData>(InitialContext);
    const [consultCep, setConsultCep] = useState<ConsultCep | null>(null);
    const [coordinate, setCoordinate] = useState<LatLng>({ latitude: -12.740919, longitude: -60.132189 })

    const [problems, setProblems] = useState([
        {
            id: 1,
            description: "LÂMPADA QUEIMADA",
            icon: "loader"
        },
        {
            id: 2,
            description: "LÂMPADA ACESA",
            icon: "map"
        },
        {
            id: 3,
            description: "LÂMPADA OSCILANDO",
            icon: "alert-octagon"
        },
        {
            id: 4,
            description: "LÂMPADA DANIFICADA",
            icon: "play-circle"
        }
    ]);

    function resetDatAfterPost() {
        setSelected(0);
        setCoordinate({ latitude: -12.740919, longitude: -60.132189 });
        setTicket(InitialContext);
    }

    const handleSetIdProblem = useCallback((id: number) => {
        setTicket(prevState => ({
            ...prevState,
            idProblem: id
        }));
        setSelected(id);
    }, []);

    const handlePlaceConfirm = useCallback((data: PlaceFromData) => {
        setTicket(prevState => ({
            ...prevState,
            cep: data.cep.replace('-', ''),
            publicPlace: data.publicPlace,
            suburb: data.suburb,
            number: data.number,
            complements: data.complements,
            note: data.note,
        }));
    }, []);

    const handleNewTicket = async () => {


        setSuccessed(false);

        try {

            setLoading(true);
            console.log(ticket)

            await ilumineApi.post('ticket', ticket).then((response) => {
                console.log(response.data.message)
                resetDatAfterPost();
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

            cep = cep.replace('-', '');

            await viaCepApi.get(`${cep}/json`).then((response) => {
                let _consultaCep = response.data as ConsultCep;

                setConsultCep(response.data)
                setTicket(prevState => ({
                    ...prevState,
                    cep: cep,
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
                problems,
                selected,
                coordinate,
                consultCep,
                handleNewTicket,
                handleCep,
                handleSetIdProblem,
                handleSetCoordinate,
                handlePlaceConfirm
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
        problems,
        selected,
        coordinate,
        consultCep,
        handleNewTicket,
        handleCep,
        handleSetIdProblem,
        handleSetCoordinate,
        handlePlaceConfirm
    } = context;

    return {
        loading,
        successed,
        ticket,
        problems,
        selected,
        coordinate,
        consultCep,
        handleNewTicket,
        handleCep,
        handleSetIdProblem,
        handleSetCoordinate,
        handlePlaceConfirm
    }
};