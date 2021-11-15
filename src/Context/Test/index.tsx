import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
 


export interface TestContextData {
    loading: boolean;
    successed: boolean; 
}


//Cria o contexto a ser utilizado no fluxo de autentição
const TestContext = createContext<TestContextData>({} as TestContextData);
 

//Provedor do Contexto para aplicação
export const TestProvider: React.FC = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [successed, setSuccessed] = useState(true); 

 

    return (
        <TestContext.Provider
            value={{ 
                loading,
                successed
            }}>
            {children}
        </TestContext.Provider>
    );
}


export function useTest() {
    const context = useContext(TestContext);

    if (!context)
        throw new Error('useTest must be used within an TestProvider');

    const { loading,   successed } = context;
    return { loading,  successed };
}
