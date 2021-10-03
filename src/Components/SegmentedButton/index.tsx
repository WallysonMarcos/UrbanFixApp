import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Constants from '../../Constants';

import {   ProblemsData } from '../../Types';
 
import { useTicket } from '../../Context/Ticket';

const SegmentedButton = ( ) => {
    
    const { ticket, problems, selected, handleSetIdProblem } = useTicket();
    

    return (
        <View style={styles.issuesContent}>
            <Text style={{ color: Constants.colorGray, marginTop: 10 }} >{'Selecione um Defeito'}</Text>
            <View style={styles.issuesBnt}>
                {
                    problems.map((item : ProblemsData, index: number) => {
                        let _name = item.description.split(' ');// .replace('LÂMPADA ', '');
                        let _descrition = _name[1].charAt(0).toUpperCase() + _name[1].slice(1).toLowerCase();
                        let _selected = selected == item.id;
                        return (
                            <TouchableOpacity style={styles.bntOptions} key={item.id.toString()} onPress={() => { handleSetIdProblem(problems[index].id)}}>
                                <Icon style={styles.icon} name={item.icon} size={35} color={_selected ? Constants.colorPrimary : Constants.colorGray} />
                                <Text allowFontScaling={false} style={[styles.bntText, { color: _selected ? Constants.colorPrimary : Constants.colorGray }]}>{_descrition}</Text>
                            </TouchableOpacity>);
                    })
                }
            </View>
        </View>
    );

}

export default SegmentedButton;

const styles = StyleSheet.create({
    issuesContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: '12%',
        width: '90%',
        marginVertical: 10,
        paddingHorizontal: 5,
        paddingBottom: 5, 
        height: '14%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 5,
    },
    issuesBnt: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 5,
        alignSelf: 'center',
        backgroundColor: '#fff',
    },

    icon: {
        marginBottom: 5
    },

    bntOptions: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    bntText: { 
        fontSize: Constants.fontSmall,
        textAlign: 'center',
    }

});  