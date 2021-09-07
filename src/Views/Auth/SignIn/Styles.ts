import { StyleSheet } from 'react-native';
import Constants from '../../../Constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Constants.colorBackground,
        justifyContent: 'center'

    },

    content: {
        height: 300,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: Constants.colorBackground,
        borderRadius: 5,
        elevation: 5,
        paddingTop: 70,
        alignItems: 'center',
        marginTop: '30%'
    },

    logoContainer: {
        maxHeight: 200,
        position: 'absolute',
        top: -60,
        alignSelf: 'center',

    },

    logoImg: {
        margin: 10,
        width: 120,
        height: 120,
        resizeMode: 'center',
    },

    inputIcon: {
        width: 30,
        justifyContent: 'center'
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 8,
        paddingHorizontal: 10,
        borderRadius: 3,
        elevation: 1,
        flexDirection: 'row',
        alignContent: 'center',
    },

    
    loginInput: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 8,
        padding: 10,
        borderRadius: 3,
        elevation: 1
    },

    loginButton: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: Constants.colorPrimary,
        padding: 10,
        marginBottom: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000'

    },

    inputData: {
        flex: 1
    },

    loginButtonText: {
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10
    },

    loginRegister: {
        fontWeight: 'bold',
        color: Constants.colorGray,
        marginTop: 5,
        textAlign: 'center',
    },
});