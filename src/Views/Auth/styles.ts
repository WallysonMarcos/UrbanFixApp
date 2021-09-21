import styled from 'styled-components/native';
import Constants from './../../Constants';

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

export const LogoBottom = styled.Image`
  width: 120px;
  height: 120px;
`;


export const Title = styled.Text`
  font-size: ${Constants.fontLarger}px;
  color:  ${Constants.colorPrimary};
  margin: 10px 0px 30px;
  font-weight: 700;
`;

export const RegisterText = styled.Text`
  font-size: ${Constants.fontMedium}px;
  color:  ${Constants.colorPrimary};
  margin: 5px 0px;
  font-weight: 500;
`;


export const InfoText = styled.Text`
  font-size: ${Constants.fontMedium}px;
  color:  ${Constants.colorPrimary};
  margin: 5px 0px;
  font-weight: 500;
`;




export const ButtonSubmit = styled.TouchableOpacity`
  flex-direction: row;
  background: ${Constants.colorPrimary};
  margin: 10px 0px 10px 0px;
  padding: 12px;
  border-radius: 5px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`;


export const TextButton = styled.Text`
  color:  ${Constants.colorLigth};
  margin-left: 10px;
`;
