import { NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../Routers/rootStackParam';


export type SignInScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;



export interface AuthCredentials {
    username: string;
    password: string;
}

export  interface SignInData {
    name: string;
    lastName: string;
    cellNumber: string;
    email: string;
    password: string;
}


export  interface UserContext {
    name: string;
}

export  interface ConfirmNumber {
    cellNumber: string;
}

export interface AuthContextData {
    authorized: boolean;
    initializing: boolean;
    loading: boolean;
    confirmCell: boolean;
    successed: boolean;
    showIntro: boolean;
    user: UserContext | null;
    handleSignIn(credentials: AuthCredentials, onConfirmCell: Function): Promise<void>,
    handleSignOut(): Promise<void>;
    handleSignUp(data: SignInData, onSuccess: Function): Promise<void>;
    handleConfirm(data: ConfirmData, onSuccess: Function): Promise<void>;
    handleDoneIntro(): void;
}

export interface ValidationErrorData {
    [key: string]: any
}


export interface ConfirmData {
    cellNumber: string;
    token: string; 
}

export interface TicketData {
    idProblem: number;
    cep: string;
    cepMasked?: string | null;
    publicPlace: string;
    complements: string;
    number: number;
    suburb: string;
    note: string;
    latitude: string;
    longitude: string;
}


export interface LatLng {
    latitude: number;
    longitude: number;
}

export interface ProblemsData {
    id: number;
    description: string;
    icon: string;
}



export interface EventsTicket {
    id: number;
    dtEvent: string;
    note: string;
}


export interface PlaceFromData {
    cep: string;
    publicPlace: string;
    complements: string;
    number: number;
    suburb: string;
    note: string;
}

export  interface IGenericTypeOfTicket {
    id: number;
    description: string;
    color: string | null;
}
 

export interface IListTickets {
    id: number; 
    dtOpen: string;
    dtClose: string | null;
    cep: string;
    publicPlace: string;
    complements: string;
    number: number;
    suburb: string;
    note: string;
    latitude: string;
    longitude: string;
    type: IGenericTypeOfTicket;
    status: IGenericTypeOfTicket;

}

export interface TicketContextData {
    loading: boolean;
    successed: boolean;
    ticket: TicketData ; 
    tickets: Array<IListTickets> ;
    selected: number;
    problems: Array<ProblemsData>;
    coordinate: LatLng;    
    consultCep: ConsultCep  | null;
    handleNewTicket( data: TicketData, onSuccess: Function): Promise<void>,
    handleCep(cep: string): Promise<void>;
    handleSetIdProblem(id: number): void;
    handleSetCoordinate( coordinate: LatLng ): void; 
    ListMyTickets():  Promise<void>; 
}

export interface ConsultCep { 
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}
