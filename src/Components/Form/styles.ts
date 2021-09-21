import styled, { css } from 'styled-components/native';
import Constants from '../../Constants';


interface PropsInput {
    lBlured: boolean;
    lFocused: boolean;
    lError: boolean;
};

export const InputContainer = styled.View<PropsInput>`
    height: 45px; 
    box-shadow: -0.5px 0px 0px   rgba(0,0,0,0.1);
    width: 100%;
    flex-direction: row;;
    align-items: center; 
    padding: 0px 10px;  
    border: 0.5px;
    margin-top: 5px;
    border-radius: 5px;
    background-color: white;
    border-color: ${Constants.colorLigth};

    ${({ lFocused }) => lFocused && css`
        border-color: ${Constants.colorSecundary};
        color: ${Constants.colorSecundary};
        box-shadow: -2px 2px 2px   rgba(0,0,0,0.1);
    `};

    ${({ lError }) => lError && css`
        border-color: ${Constants.colorError};
        color: ${Constants.colorError};
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