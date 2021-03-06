import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

import { ilumineApi } from '../../Services/api';

import { AuthContextData, UserContext, AuthCredentials} from '../../Types';


//Cria o contexto a ser utilizado no fluxo de autentição
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AUTH_STRING_TOKEN = '@URBANFIX:token';
const AUTH_STRING_USER = '@URBANFIX:user';
const AUTH_STRING_INTRO = '@URBANFIX:intro';

//Provedor do Contexto para aplicação
export const AuthProvider: React.FC = ({ children }) => {

    const [initializing,setInitialized] = useState(true);
    const [loading, setLoading] = useState(false);
    const [successed, setSuccessed] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [user, setUser] = useState<UserContext | null>(null);
    const [confirmCell, SetConfirmCell] = useState(false);


    //Hook que vai executar assim que o Provider for carregado
    useEffect(() => {

        async function initAuthProvider() {
            try { 
                const token = await AsyncStorage.getItem(AUTH_STRING_TOKEN);
                const user = await AsyncStorage.getItem(AUTH_STRING_USER);
                const intro = await AsyncStorage.getItem(AUTH_STRING_INTRO);
                                
                if (user && token ) {
                    setUser(JSON.parse(user));                    
                    ilumineApi.defaults.headers.Authorization = `Bearer ${token}`;
                }
                setShowIntro(intro != null ||  intro ==="showed" ? false : true ) 
            } catch (err) {
                setUser(null);
            } finally {
                setInitialized(false);
            }
        }
        initAuthProvider();
    }, [])

    //Função responsavel por autentição do usuário
    const handleSignIn = async ({ username, password } : AuthCredentials, onConfirmCell: Function ) => {
        let _needConfirmCell = false;
        try {
            setLoading(true);
            setSuccessed(false);
            const response = await ilumineApi.post('auth/signin', {
                username,
                password
            }).catch(e => { 
                if (e?.response?.data.statusCode === 401) {    
                    if( e?.response.data.message == "Unauthorized"){
                        throw new Error("Usuário ou senha inválidos!");  
                    }else{
                        _needConfirmCell = true;
                        throw new Error(e?.response.data.message); 
                    }                                                             
                } else {
                    throw new Error(e.message)
                }
            });

            ilumineApi.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
            await AsyncStorage.setItem(AUTH_STRING_TOKEN, response.data.access_token);
            await AsyncStorage.setItem(AUTH_STRING_USER, JSON.stringify({username}));
            setUser({name: username});
            setSuccessed(true);
        }
        catch (e: any) {
            setSuccessed(false); 
            Alert.alert("Ops!", e.message); 
            if(_needConfirmCell){
                onConfirmCell();
            }
        }
        finally {
            setLoading(false);
        }
    };

    //
    const handleSignUp = useCallback(async ({ name, lastName, cellNumber, email, password }, onSuccess: Function) => {
        try {
            setLoading(true); 
            const response = await ilumineApi.post('users', {
                name, lastName, cellNumber, email, password, 
                deviceToken:"meuIphone",
                passWordConfirmation: password

            }).catch(err => {                
                if (err.data != undefined) {
                    throw new Error(err.data.message)
                } else {
                    throw new Error(err.message)
                }
            });
            Alert.alert("Sucesso", "Registro efeturado com sucesso!");
            onSuccess();

        } catch (e: any) { 
            Alert.alert("Ops!", e.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const handleConfirm = useCallback(async ({ cellNumber, token }, onSuccess: Function) => {
        try {
            setLoading(true); 
            const response = await ilumineApi.post('auth/confirmcell', { cellNumber, token  }).catch(e => {
                if (e?.response?.data) {                           
                    throw new Error(e?.response.data.message);                                      
                } else {
                    throw new Error(e.message)
                }
            }); 
            onSuccess();

        } catch (e: any) { 
            Alert.alert("Ops!", e.message);            
        }
        finally {
            setLoading(false);
        }
    }, []);

    //Função responsavel por deslogar o usuário da aplicação
    const handleSignOut = useCallback(async () => {

        try { 
            setLoading(true);
            await setTimeout(() => { 
                ilumineApi.defaults.headers.Authorization = null;
                AsyncStorage.clear();
            }, 1000);
        } finally {
            setUser(null);
            setLoading(false);
        }
    }, []);

    const handleDoneIntro = () => {
        AsyncStorage.setItem(AUTH_STRING_INTRO, "showed");
    };
 
    return ( 
        <AuthContext.Provider
            value={{
                initializing,
                authorized: !!user,
                loading,
                successed,
                showIntro,
                confirmCell,
                user,
                handleSignIn,
                handleSignOut,
                handleSignUp,
                handleConfirm,
                handleDoneIntro
            }}>
            {children}
        </AuthContext.Provider>
    ); 

}


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');

    const { initializing, loading, authorized, confirmCell, successed, showIntro, user, handleSignIn, handleSignOut, handleSignUp, handleConfirm, handleDoneIntro } = context;
    return { initializing, loading, authorized, confirmCell, successed, showIntro, user, handleSignIn, handleSignOut, handleSignUp, handleConfirm, handleDoneIntro };
}
