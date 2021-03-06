import styled from 'styled-components/native';
import Constants from '../../Constants';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  align-items: center;
  background: ${Constants.colorBackground};

`;

export const Content = styled.View`
  flex-direction: column;
  margin: 40px;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  justify-content: center;

`;
 

export const Title = styled.Text`
  font-size: ${Constants.fontLarger}px;
  color:  ${Constants.colorPrimary};
  margin: 10px 0px 30px;
  font-weight: 700;
`;





export const ButtonSubmit = styled.TouchableOpacity`
  flex-direction: row; 
  background: ${Constants.colorPrimary};
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
  background: ${Constants.colorPrimary};
  margin: 10px 0px;
  padding: 20px;
  border-radius: 10px;  
  align-items: center;
  justify-content: center; 
  box-shadow: 0px 10px 10px   rgba(0,0,0,0.3);
  
`;


export const TextButton = styled.Text`
  color:  ${Constants.colorLigth};
  margin-left: 10px;
  font-weight: 700;
`; 