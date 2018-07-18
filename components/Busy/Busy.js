import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class Busy extends React.Component{

    render(){
        return(
            <View style={styles.container}>
             <Image source = {require('../../images/police3.gif')}/>
             <Text style = {styles.heading}>Loading .... </Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
heading:{
    fontSize: 14,
    fontWeight: 'bold'
}
});