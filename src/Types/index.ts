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

export interface AuthContextData {
    authorized: boolean;
    loading: boolean;
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