import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import * as Animatable from 'react-native-animatable';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class ComplainStatusScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={{ flex: 1, width: '95%', marginLeft: '2.5%' }}>
        <ScrollView>
        <Text style= {styles.heading}>Complaint Report</Text>
        <Card>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Complaint Nature: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.nature} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Complaint Details: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.details} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Complaint Status: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.status} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Complaint Remarks: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.remarks} </Text>                
        </View>
        <View style = {{alignItems: 'center', marginBottom: 5}}>
        <Button onPress={()=>this.props.history.push('/complaint')} raised primary text="Back to List" />                        
        </View>
        </Card>
        </ScrollView>
      </Animatable.View>
    );
  }
}


export default withRouter(ComplainStatusScreen);

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontSize: 20,
      },
    labels: {
       fontSize: 16, 
    },
    fieldValue: {
        fontSize: 16,
    },
    fieldView:{
        width: '100%',
        height: 35,
        flexDirection: 'row',
        marginLeft: 10,
    }
    
});