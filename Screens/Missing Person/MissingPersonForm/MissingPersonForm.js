import React from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import PickImage from '../../../components/PickImage/PickImage';
import * as firebase from 'firebase';
import { writeInDatabase, readFromDatabase } from '../../../DatabaseFunctions/DatabaseFunctions';
import validate from '../../../Validation/ValidationFunctions';

var uri = '';
class MissingPersonForm extends React.Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      name: '',
      age: '',
      contact: '',
      details: '',
      status: 'registered',
      remarks: '',
    };
    this.checkValidation = this.checkValidation.bind(this);
    this.selectedImage = this.selectedImage.bind(this);
  }



  backToHome() {
    this.setState({
      name: '',
      age: '',
      details: '',
      contact: '',
      status: 'registered',
      remarks: ''
    });
    this.props.history.push('/');
  }

  selectedImage(value) {
    uri = value;
  }


  checkValidation() {
    if (validate(this.state.name, { notEmpty: true }, 'Missing Person Name')) {
      if (validate(this.state.age, { notEmpty: true, onlyNumber: true }, 'Missing Person Age')) {
        if (validate(this.state.contact, { notEmpty: true, onlyNumber: true }, 'Missing Person Contact')) {
          if (validate(this.state.details, { notEmpty: true }, 'Missing Person Details')) {
            if (validate(uri, { notEmpty: true }, 'Missing Person Picture')) {
              return true;
            }
          }
        }
      }
    }
  }

  uploadImageAsync = async () => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const key = firebase.database().ref().push().getKey();
    const ref = firebase.storage().ref().child('MissingPerson').child(key);
    const snapshot = await ref.put(blob);
    return ref.getDownloadURL();
  }

  registerMissingPerson() {
    let a = this.props.loggedInUser;
    if (this.checkValidation()) {
      this.props.history.push('/busy');
      this.uploadImageAsync()
        .then(snapshot => {
          var picObj = {
            picUrl: snapshot
          }
          writeInDatabase('MissingPerson', a.localId, a.idToken, { ...this.state, ...picObj })
            .catch(err => {
              alert('Something went wrong, try again');
              this.props.history.push({
                pathname: '/missing',
                state: {
                  allRecords: false
                }
              });
            })
            .then(res => {
              readFromDatabase('MissingPerson', a.localId)
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  const info = [];
                  for (let key in data) {
                    info.push({
                      ...data[key]
                    })
                  }
                  this.props.missingRecord(info);
                  alert('Missing Person Information has been registered');
                  this.props.history.push({
                    pathname: '/missing',
                    state: { allRecords: false }
                  });
                })
                .catch(err => { alert('Something went wrong, try again.') });
            })
            .catch(err => {
              console.log(err)
              this.props.history.push({
                pathname: '/missing',
                state: {
                  allRecords: false
                }
              });
            });
        })
        .catch(err => {
          alert('Something went wrong, try again');
          this.props.history.push({
            pathname: '/missing',
            state: {
              allRecords: false
            }
          });
        });
    }
  }




  render() {
    return (
      <ScrollView style={{ width: '95%', marginLeft: '2.5%' }}>
        <Text style={styles.heading}>Missing Person Form</Text>
        <Card>
          <Sae
            label={'Missing Person Name'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            height={30}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ name: text }) }}
          />
          <Sae
            label={'Missing Person Age'}
            iconClass={FontAwesomeIcon}
            style={styles.inputContainer}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ age: text }) }}
            keyboardType="numeric"
          />
          <Sae
            label={'Contact Number'}
            iconClass={FontAwesomeIcon}
            style={styles.inputContainer}
            iconName={'pencil'}
            iconColor={'grey'}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.textInput}
            onChangeText={(text) => { this.setState({ contact: text }) }}
            keyboardType="numeric"
          />
          <Sae
            label={'More Details'}
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
          <PickImage fn={this.selectedImage} />
        </Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button raised primary text="Save" onPress={this.registerMissingPerson.bind(this)} />
          <Button raised primary text="Cancel" onPress={this.backToHome.bind(this)} />
        </View>

      </ScrollView>
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
    missingRecord: (details) => {
      dispatch({ type: 'MISSING_PERSON_RECORDS', payload: details });
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MissingPersonForm));

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

