import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import * as Animatable from 'react-native-animatable';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import StatusPicker from '../../../components/StatusPicker/StatusPicker';
import {updateInDatabase, readAllFromDatabase} from '../../../DatabaseFunctions/DatabaseFunctions';

class ComplainStatusScreenAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      status:this.props.location.state.status,
      remarks:this.props.location.state.remarks,
      nature:this.props.location.state.nature,
      details: this.props.location.state.details,
      parentKey: this.props.location.state.parentKey,
      childKey: this.props.location.state.childKey
    };
    this.selectedStatus = this.selectedStatus.bind(this);
  }

  updateRecord(){
    let parent = this.state.parentKey;
    let child = this.state.childKey;
     let res = this.props.loggedInUser;

    let complainObj = {
      nature:this.state.nature,
      details: this.state.details,
      status: this.state.status,
      remarks: this.state.remarks
    };
    this.props.history.push('/busy');
    
    updateInDatabase('Complain',parent,child,res.idToken,complainObj)
    .then (res => {
      alert('Record Updated', res);
      readAllFromDatabase('Complain')
      .then(res => res.json())
      .catch(err => {
          alert('Something went wrong, try again');
          this.props.history.push('/adminComplain');
      })
      .then(data => {
          const info = [];
          let temp = [];
          for (let parentKey in data) {
              temp.push({
                  ...data[parentKey], parentKey
              })
          }
          temp.forEach(item => {
              let parentKey = item.parentKey
              for (let childKey in item) {
                  if (childKey != 'parentKey') {
                      info.push({
                          ...item[childKey], childKey, parentKey
                      })
                  }
              }
          });
          this.props.allComplainRecord(info);
          this.props.history.push('/adminComplain');
      });
    })
    .catch(err=> {
      alert('Something went wrong. Try Again.');
      this.props.history.push('/adminComplain');
  });
  }

  selectedStatus(value) {
    this.setState({ status: value });      
  }
  
  render() {
    return (
     <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={{ flex: 1, width: '95%', marginLeft: '2.5%' }}>   
      <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset ={60} enabled>
        <ScrollView>         
        <Text style= {styles.heading}>Complain Report</Text>
        <Card>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Complain Nature: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.nature} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Complain Details: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.details} </Text>                
        </View>
        <View>
        <StatusPicker status={this.selectedStatus} value = {this.state.status}/></View>
        <View>
        <Sae
              label={'Remarks *'}
              iconClass={FontAwesomeIcon}
              style={styles.inputContainer}
              iconName={'pencil'}
              iconColor={'grey'}
              autoCapitalize={'none'}
              height={72}
              autoCorrect={false}
              inputStyle={styles.textInputMulti}
              value={this.state.remarks}
              multiline={true}
              onChangeText={(text) => { this.setState({ remarks: text }) }}
            />
        </View>
        <View style = {{flexDirection: 'row',alignItems: 'center', justifyContent: 'space-around', marginBottom: 5}}>
        <Button onPress ={this.updateRecord.bind(this)} raised primary text= "Save"/>
        <Button onPress={()=>{this.props.history.push('/adminComplain')}} raised primary text="Back to List" />                        
        </View>
        </Card>   
        </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    allComplainRecord: (details) => {
      dispatch({ type: 'ALL_COMPLAIN_RECORDS', payload: details });
  }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplainStatusScreenAdmin));

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontSize: 20,
      },
    labels: {
       fontSize: 16,
       textDecorationLine: 'underline', 
       fontWeight: 'bold',
    },
    fieldValue: {
        fontSize: 16,
        
    },
    fieldView:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: "wrap",
        margin: 5 ,
    },
    textInput: {
      color: 'black',
      fontSize: 16,
    },
    textInputMulti: {
      color: 'black',
      fontSize: 16,
      textAlignVertical: 'top',
      paddingTop: 20,
    }
});
