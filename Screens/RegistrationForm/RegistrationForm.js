import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import CityPicker from '../../components/CityPicker/CityPicker';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {firebaseSignUp} from '../../Auth/Auth';
import {writeInDatabasePut} from '../../DatabaseFunctions/DatabaseFunctions';
import validate from '../../Validation/ValidationFunctions';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      age: '',
      password: '',
      city: '',
      phoneNo: '',
      userLevel:'user'
    };
    this.checkValidation = this.checkValidation.bind(this);    
    this.selectedCity = this.selectedCity.bind(this);
  }

  selectedCity(value) {
    this.setState({ city: value });
  }

  checkValidation() {
      if (validate(this.state.name,{ notEmpty: true},'Name')){
      if (validate(this.state.email, { isEmail: true },'Email')){
      if (validate(this.state.age, { notEmpty: true }, 'Crime Location')){
      if (validate(this.state.password, { notEmpty: true, minLength: 8 }, 'Password')){
      if (validate(this.state.city, { notEmpty: true }, 'City')){
      if (validate(this.state.phoneNo, { notEmpty: true }, 'Phone Number')){
       return true;
       }    
       }
      }
   }
  } 
  }
}

  registerUser() {
    if (this.checkValidation())
    {
    this.props.history.push('/busy');      
    firebaseSignUp(this.state.email, this.state.password)
      .catch(function (err) {
        alert('Authentication Failed');
        this.props.history.push('/');
      })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error.message);
          this.props.history.push('/');          
        }
        else {
          this.props.regUser(res);
        writeInDatabasePut('info',res.localId,res.idToken,this.state)
          .then (res => {
          this.props.regUserDetails(this.state);
          alert('Thanks for register, account has been created Successfully.');
          this.props.history.push('/');
        })
        .catch(err=> {
          alert('Something went wrong. Try Again.');
          this.props.history.push('/');
      });
        }
      });
    }
  }

  backToHome() {
    this.setState({
      name: '',
      email: '',
      age: '',
      password: '',
      city: '',
      phoneNo: '',
      userLevel: 'user',
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1,  }]}>                              
      <ScrollView style={{ width: '95%', marginLeft: '2.5%' }}>
      {/* <KeyboardAvoidingView style={styles.container} behavior="position" enabled > */}
        <Text style={styles.heading}>Registration Form</Text>
        <Card>
          <Sae
            label={'Name'}
            iconClass={FontAwesomeIcon}
            style={styles.inputContainer}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ name: text }) }}
          />
          <Sae
            label={'Email Address'}
            iconClass={FontAwesomeIcon}
            style={styles.inputContainer}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ email: text }) }}
            keyboardType="email-address"
          />
          <Sae
            label={'Age'}
            style={styles.inputContainer}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => { this.setState({ age: text }) }}
          />
          <Sae
            label={'Password'}
            iconClass={FontAwesomeIcon}
            style={styles.inputContainer}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ password: text }) }}
            secureTextEntry={true}
          />
          <Sae
            label={'Phone Number'}
            iconClass={FontAwesomeIcon}
            style={styles.inputContainer}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ phoneNo: text }) }}
            keyboardType="numeric"
          />
          <CityPicker city={this.selectedCity} />
        </Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button raised primary text="Save" onPress={this.registerUser.bind(this)} />
          <Button raised primary text="Cancel" onPress={this.backToHome.bind(this)} />
        </View>
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    color: 'black',
    fontSize: 16,
  },
  inputContainer: {
    marginLeft: 5,
    marginRight: 5,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
  }

});

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    regUser: (userDetails) => {
      dispatch({ type: 'REG_USER', payload: userDetails });
    },
    regUserDetails: (userDetails) => {
      dispatch({ type: 'USER_DETAILS', payload: userDetails });
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));