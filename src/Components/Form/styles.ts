import styled, { css } from 'styled-components/native';
import Constants from '../../Constants';


interface PropsInput {
    lBlured: boolean; 
    lFocused: boolean;
    lError: boolean;
};

export const InputContainer= styled.View<PropsInput>`
    width: 100%;  
    height: 40px;
    flex-direction: row;;
    align-items: center; 
    padding: 0px 10px;  
    border: 0.5px;
    margin-top: 5px;
    border-radius: 3px;
    background-color: white;
    border-color: ${Constants.colorLigth};

    ${({ lFocused }) => lFocused && css`
        border-color: ${Constants.colorSecundary};
        color: ${Constants.colorSecundary};
    `};

    ${({ lError }) => lError && css`
        border-color: ${Constants.colorWarning};
        color: ${Constants.colorWarning};
    `};

    /* ${({ lBlured }) => lBlured && css`
        border-color: ${Constants.colorLigth};
    `}; */
 
`;

export const IconContainer = styled.View`
    width: 30px;
    justify-content: center;
`;

export const InputContent = styled.TextInput`
    width: 100%;  
`;


export const TextContent = styled.Text`
    position: absolute;
    bottom: 0px;
    right: 5px;
    font-size: ${Constants.fontSmall}px;
    color: ${Constants.colorWarning}; 
    padding: 0px;
`;