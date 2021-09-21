import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

import api from '../../Services/api';

import { AuthContextData, UserContext} from '../../Types';


//Cria o contexto a ser utilizado no fluxo de autentição
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AUTH_STRING_TOKEN = '@URBANFIX:token';
const AUTH_STRING_USER = '@URBANFIX:user';

//Provedor do Contexto para aplicação
export const AuthProvider: React.FC = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserContext | null>(null);


    //Hook que vai executar assim que o Provider for carregado
    useEffect(() => {
        async function initAuthProvider() {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem(AUTH_STRING_TOKEN);
                const user = await AsyncStorage.getItem(AUTH_STRING_USER);

                if (user && token) {
                    setUser(JSON.parse(user));
                    api.defaults.headers.Authorization = `Bearer ${token}`;
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }

        }
        //
        initAuthProvider();
    }, [])

    //Função responsavel por autentição do usuário
    const handleSignIn = useCallback(async ({ username, password }) => {
        try {
            setLoading(true);

            const response = await api.post('auth/signin', {
                username,
                password
            }).catch(e => {
                if (e.response.status === 401) {
                    throw new Error('Usuário ou senha inválidos')
                } else {
                    throw new Error(e.message)
                }
            });

            api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
            await AsyncStorage.setItem(AUTH_STRING_TOKEN, response.data.access_token);
            await AsyncStorage.setItem(AUTH_STRING_USER, JSON.stringify({username}));
            setUser({name: username})
        }
        catch (e: any) {
            Alert.alert("Ops!", e.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    //
    const handleSignUp = useCallback(async ({ name, lastName, cellNumber, email, password }) => {
        try {
            setLoading(true);
            const response = await api.post('users', {
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

        } catch (e: any) {
            Alert.alert("Ops!", e.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const handleConfirm = useCallback(async ({ cellNumber, token }) => {
        try {
            setLoading(true);
            const response = await api.post('auth/confirmcell', { cellNumber, token  }).catch(err => {
                if (err.data != undefined) {
                    throw new Error(err.data.message)
                } else {
                    throw new Error(err.message)
                }
            });

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
            console.log("saindo...");
            setLoading(true);
            await setTimeout(() => {
                console.log("....");
                api.defaults.headers.Authorization = null;
                AsyncStorage.clear();
                console.log("....");
                

            }, 1000);
        } finally {
            setUser(null);
            setLoading(false);
            console.log("saiu");
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authorized: !!user,
                loading,
                user,
                handleSignIn,
                handleSignOut,
                handleSignUp,
                handleConfirm
            }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');

    const { loading, authorized, user, handleSignIn, handleSignOut, handleSignUp, handleConfirm } = context;
    return { loading, authorized, user, handleSignIn, handleSignOut, handleSignUp, handleConfirm};
}
