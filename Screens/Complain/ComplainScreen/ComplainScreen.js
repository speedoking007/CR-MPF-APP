import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import  ActionButton from 'react-native-action-button';
import { ListItem } from 'react-native-material-ui';
import {withRouter} from 'react-router-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {readFromDatabase} from '../../../DatabaseFunctions/DatabaseFunctions';
 
class ComplainScreen extends React.Component{
constructor(props){
  super(props);
  this.state = {
    complainItems : []
  }
}

componentDidMount(){
  this.setState({complainItems: this.props.complainDetails});  
}

    render(){
        return(
          <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1,  }]}>                                        
            <ScrollView style = {{flex: 1}}>
        <Text style= {styles.heading}>Complaints</Text>            
          {this.state.complainItems.map ( (record,key) => (
      <ListItem
      key = {key}
       divider 
      centerElement={{
        primaryText: record.nature,
        secondaryText: record.details
      }} 
      onPress={() => {
        this.props.history.push({
          pathname: '/complaintStatus',
          state: {
            nature: record.nature,
            details: record.details,
            status: record.status,
            remarks: record.remarks
          }
        })
      }} />)
    )}
    </ScrollView>          
         <ActionButton
    position = 'right'
    buttonColor = 'rgba(231,76,60,1)'
      onPress={() => { this.props.history.push('/complaintForm')}}
      offsetY= {10}
    />
 </Animatable.View>
        );
    }
}

function mapStateToProps(state) {
  return {
    complainDetails: state.complainRecords,  
  }
}

export default withRouter(connect(mapStateToProps, null)(ComplainScreen));

const styles = StyleSheet.create({
  heading:{
    fontSize: 20,
    textAlign: 'center',
  }
})