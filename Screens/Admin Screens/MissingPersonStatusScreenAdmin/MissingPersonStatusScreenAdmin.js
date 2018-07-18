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

class MissingPersonStatusScreenAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      status:this.props.location.state.status,
      remarks:this.props.location.state.remarks,
      name:this.props.location.state.name,
      age:this.props.location.state.age,
      contact:this.props.location.state.contact,
      details: this.props.location.state.details,
      picUrl:this.props.location.state.picUrl,
      parentKey: this.props.location.state.parentKey,
      childKey: this.props.location.state.childKey
    };
    this.selectedStatus = this.selectedStatus.bind(this);
  }

  updateRecord(){
   this.props.history.push('/busy');
    
    let parent = this.state.parentKey;
    let child = this.state.childKey;
     let res = this.props.loggedInUser;

     let missingPersonObj = {
      name:this.state.name,
      age:this.state.age,
      contact:this.state.contact,
      details: this.state.details,
      picUrl:this.state.picUrl,
      status: this.state.status,
      remarks: this.state.remarks
    }

    updateInDatabase('MissingPerson',parent,child,res.idToken,missingPersonObj)
    .then (res => {
      alert('Record Updated');
      readAllFromDatabase('MissingPerson')
      .then(res => res.json())
      .catch(err => {
          alert('Something went wrong, try again');
          this.props.history.push('/adminMissing');
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
          this.props.allMissingRecord(info);
          this.props.history.push('/adminMissing');
      });
    })
    .catch(err=> {
      alert('Something went wrong. Try Again.');
      this.props.history.push('/adminMissing');
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
        <Text style= {styles.heading}>Missing Person</Text>
        <Card>
        <View style={{alignItems: 'center'}}>
        <Image 
              source={{ uri: this.props.location.state.picUrl }} 
              indicator={ProgressCircle}
              indicatorProps={{
                size: 60,
                borderWidth: 1,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              style={{
                width: 200,
                height: 200
              }}/>
         </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Missin Person Name: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.name} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Age : </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.age} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Contact Number: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.contact} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Details: </Text>
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
        <Button onPress={()=>{this.props.history.push('/adminMissing')}} raised primary text="Back to List" />                        
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
    allMissingRecord: (details) => {
      dispatch({ type: 'ALL_MISSING_PERSON_RECORDS', payload: details });
}
}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MissingPersonStatusScreenAdmin));

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
