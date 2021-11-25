import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
import Constants from '../../Constants';

const screen = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  align-items: center;
  background: ${Constants.colorBackground};

`;

export const ContentInfo = styled.View` 
  flex-direction: column;
  width: ${screen.width}px;
  margin: 40px;
  margin-top: -60px;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.colorBackground};

`;

export const ListContainer = styled.View`
  flex: 1;
  width: ${screen.width}px;
  flex-direction : column;
  background-color: ${Constants.colorBackground};
  align-self:  flex-start;
  justify-content: flex-start; 
  height: 100%;    
  box-shadow: 2px 5px 5px   rgba(0,0,0,0.1);

`;
 

export const ConternerItem = styled.TouchableOpacity` 
  flex-direction : row;
  width: 90%;
  background-color: ${Constants.colorBackground};
  align-self: center ;
  justify-content: space-evenly;    
  padding: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Constants.colorLigth};
  flex-direction: row;
  align-self: center;
`;

export const ItemDetail = styled.View`
  width: ${screen.width}px;
  height: 20%;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;


interface PropsStatus {
  colorStatus: string | null; 
};

export const ItemDetailStatus = styled.View<PropsStatus>`
  width: 80px;
  position: absolute;
  background-color: green;
  ${({ colorStatus }) => colorStatus != null && css`
    background-color: ${colorStatus}; 
    `};
  right: 10px;
  top: 60px;
  border-radius: 10px;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  box-shadow: 1px 2px 2px   rgba(0,0,0,0.2);
`;
 

export const Title = styled.Text`
  font-size: ${Constants.fontLarger}px;
  color:  ${Constants.colorPrimary};
  margin: 10px 0px 30px;
  font-weight: 700;
`;





export const ButtonSubmit = styled.TouchableOpacity`
  flex-direction: row; 
  background: ${Constants.colorError};
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;  
  align-items: center;
  justify-content: center; 
  
`;

export const ButtonRoundAdd = styled.TouchableOpacity`
  position: absolute ;
  bottom: 10px;
  right: 20px;
  background: ${Constants.colorSecundary};
  margin: 10px 0px;
  padding: 20px;
  border-radius: 15px;  
  align-items: center;
  justify-content: center; 
  box-shadow: 0px 10px 10px   rgba(0,0,0,0.5);
  
`;
 
export const TextButton = styled.Text`
  color:  ${Constants.colorLigth};
  margin-left: 10px;
  font-weight: 700;
`;
