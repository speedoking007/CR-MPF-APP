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
import {updateInDatabase} from '../../../DatabaseFunctions/DatabaseFunctions';

class CrimeReportStatusScreenAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      status:this.props.location.state.status,
      remarks:this.props.location.state.remarks,
      nature:this.props.location.state.nature,
      date:this.props.location.state.date,
      location:this.props.location.state.location,
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

     let crimeObj = {
      nature:this.state.nature,
      date:this.state.date,
      location:this.state.location,
      details: this.state.details,
      picUrl:this.state.picUrl,
      status: this.state.status,
      remarks: this.state.remarks
    };

    updateInDatabase('CrimeReport',parent,child,res.idToken,crimeObj)
  //    fetch('https://xendre-login-f7129.firebaseio.com/users/CrimeReports/'+parent+'/'+child+'.json?auth='+res.idToken, {
  //     method: 'PUT',
  //     event :"PUT",
  //     body: JSON.stringify(crimeObj),
  // headers :{
  //   "content-type": "text/event-stream"
  // }
  //   })
    .then (res => {
      alert('Record Updated');
      readAllDatabase('CrimeReports')
      .then(res => res.json())
      .catch(err => {
          alert('Something went wrong, try again');
          this.props.history.push('/');
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
          this.props.allCrimeRecord(info);
          this.props.history.push('/adminCrime');
      });
    })
    .catch(err=> {
      alert('Something went wrong. Try Again.',err);
      this.props.history.push('/adminCrime');
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
        <Text style= {styles.heading}>Crime Report</Text>
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
        <Text style = {styles.labels}>Crime Nature: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.nature} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Crime Date: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.date} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Crime Location: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.location} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Crime Details: </Text>
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
        <Button onPress={()=>{this.props.history.push('/adminCrime')}} raised primary text="Back to List" />                        
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
      allCrimeRecord: (details) => {
          dispatch({ type: 'ALL_CRIME_REPORT_RECORDS', payload: details });
      }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrimeReportStatusScreenAdmin));

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
