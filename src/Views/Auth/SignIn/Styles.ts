import styled from 'styled-components/native';
import Constants from '../../../Constants';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  align-items: center;
  background: ${Constants.colorBackground};

`;

export const Content = styled.View`
  flex-direction: column;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  justify-content: center;

`;

export const LogoBottom = styled.Image`
  width: 120px;
  height: 120px;
`;


export const Title = styled.Text`
  font-size: 22px;
  color:  ${Constants.colorPrimary};
  font-family: 'Archivo-Medium';
  margin: 10px 0px 10px;
`;





export const ButtonSubmit = styled.TouchableOpacity`
  background: ${Constants.colorPrimary};
  margin: 10px 0px;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
`;


export const TextButton = styled.Text`
  color:  ${Constants.colorPrimary};
`;
