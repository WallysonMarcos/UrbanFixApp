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
    loading: boolean;
    successed: boolean;
    user: UserContext | null;
    handleSignIn(credentials: AuthCredentials): Promise<void>,
    handleSignOut(): Promise<void>;
    handleSignUp(data: SignInData): Promise<void>,
    handleConfirm(data: ConfirmData): Promise<void>
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
    status: Array<IGenericTypeOfTicket>;

}

export interface TicketContextData {
    loading: boolean;
    successed: boolean;
    ticket: TicketData ;
    tickets: Array<IListTickets> | null;
    selected: number;
    problems: Array<ProblemsData>;
    coordinate: LatLng;    
    consultCep: ConsultCep  | null;
    handleNewTicket(): Promise<void>,
    handleCep(cep: string): Promise<void>;
    handleSetIdProblem(id: number): void;
    handleSetCoordinate( coordinate: LatLng ): void;
    handlePlaceConfirm( data: PlaceFromData): void;
    handleListMyTickets():  Promise<void>;
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
