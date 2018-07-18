import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import validate from '../../../Validation/ValidationFunctions';
import {writeInDatabase, readFromDatabase} from '../../../DatabaseFunctions/DatabaseFunctions';

class ComplaintForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nature: '',
      details: '',
      status: 'registered',
      remarks: ''      
    };
    this.checkValidation = this.checkValidation.bind(this);
  }


  backToHome() {
    this.setState({
      nature: '',
      details: '',
      status: 'registered',
      remarks:''
    });
    this.props.history.push('/complaint');
  }

  checkValidation() {
      if (validate(this.state.nature,{ notEmpty: true},'Complaint Nature')){
      if (validate(this.state.details, { notEmpty: true },'Complaint Details')){
       return true;  
   }
  } 
}

  registerComplain() {
    if (this.checkValidation()){
    this.props.history.push('/busy');
    let a = this.props.loggedInUser;
    writeInDatabase('Complain',a.localId,a.idToken,this.state)
    .then(res => {
      readFromDatabase('Complain',a.localId)
      .then(res => res.json())
      .then(data => {
          const info = [];
          for (let key in data) {
              info.push({
                  ...data[key]
              })
          }
          this.props.complainRecord(info);
          this.props.history.push('/complaint');
          alert ('Your Complaint has been registered');
        })
    .catch(err=> alert('Something went wrong, try again'));
    })
    .catch(err=> alert('Something went wrong, try again'));
   
}
}

  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1,}]}>                                    
      <ScrollView style = {{ width: '95%', marginLeft:'2.5%', marginRight: '2.5%'}}>
        <Text style={styles.heading}>Complaint Form</Text>
        <Card>
          <Sae
            label={'Complaint Nature'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            height={30}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ nature: text }) }}
          />
          <Sae
            label={'Complaint Details'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            height={72}
            autoCorrect={false}
            inputStyle={styles.textInputMulti}
            onChangeText={(text) => { this.setState({ details: text }) }}
            multiline={true}
          />
        </Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button raised primary text="Save" onPress={this.registerComplain.bind(this)} />
          <Button raised primary text="Cancel" onPress={this.backToHome.bind(this)} />
        </View>
      </ScrollView>
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
      complainRecord: (details) => {
          dispatch({ type: 'COMPLAIN_RECORDS', payload: details });
  }
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintForm));

const styles = StyleSheet.create({
  textInputMulti: {
    color: 'black',
    fontSize: 16,
    textAlignVertical: 'top',
    paddingTop: 20,
  },
  textInput: {
    color: 'black',
    fontSize: 16,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
  }

});

