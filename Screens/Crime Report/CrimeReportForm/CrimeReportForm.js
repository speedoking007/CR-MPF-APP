import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CityPicker from '../../../components/CityPicker/CityPicker';
import { Sae } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import PickImage from '../../../components/PickImage/PickImage';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import validate from '../../../Validation/ValidationFunctions';
import { writeInDatabase, readFromDatabase } from '../../../DatabaseFunctions/DatabaseFunctions';

var uri = '';

class CrimeReportForm extends React.Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      nature: '',
      date: '',
      location: '',
      details: '',
      status: 'registered',
      remarks: '',
    };
    this.checkValidation = this.checkValidation.bind(this);
    this.selectedCity = this.selectedCity.bind(this);    
  }


  backToHome() {
    this.setState({
      nature: '',
      date: '',
      location: '',
      details: '',
      status: 'registered',
      remarks: '',
    });
    this.props.history.push('/');
  }

  selectedImage(value) {
    uri = value;
  }

  uploadImageAsync = async () => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const key = firebase.database().ref().push().getKey();
    const ref = firebase.storage().ref().child('CrimeReport').child(this.props.loggedInUser.localId).child(key);
    const snapshot = await ref.put(blob);
    return ref.getDownloadURL();
  }

  checkValidation() {
    if (validate(this.state.nature, { notEmpty: true }, 'Crime Nature')) {
      if (validate(this.state.date, { notEmpty: true }, 'Date')) {
        if (validate(this.state.location, { notEmpty: true }, 'Crime Location')) {
          if (validate(this.state.details, { notEmpty: true }, 'Crime Details')) {
            if (validate(uri, { notEmpty: true }, 'Picture')) {
              return true;
            }
          }
        }
      }
    }
  }

  selectedCity(value) {
    this.setState({location: value });
  }

  registerCrimeReport() {
    let a = this.props.loggedInUser;
    if (this.checkValidation()) {
      this.props.history.push('/busy');
      this.uploadImageAsync()
        .then(snapshot => {
          var picObj = {
            picUrl: snapshot
          }
          writeInDatabase('CrimeReport', a.localId, a.idToken, { ...this.state, ...picObj })
            .catch(err => {
              alert('Something went wrong, try again');
              this.props.history.push({
                pathname: '/crime',
                state: {
                  allRecords: false
                }
              });
            })
            .then(res => {
              readFromDatabase('CrimeReport', a.localId)
                .then(res => res.json())
                .then(data => {
                  const info = [];
                  for (let key in data) {
                    info.push({
                      ...data[key]
                    })
                  }
                  this.props.crimeRecord(info);
                  alert('Crime Report has been registered');
                  this.props.history.push({
                    pathname: '/crime',
                    state: { allRecords: false }
                  });
                })
                .catch(err => { alert('Something went wrong, try again. ') });
            })
            .catch(err => {
              alert('Something went wrong, try again ');
              this.props.history.push({
                pathname: '/crime',
                state: {
                  allRecords: false
                }
              });
            });
        })
        .catch(err => {
          alert('Something went wrong, try again ');
          this.props.history.push({
            pathname: '/crime',
            state: {
              allRecords: false
            }
          });
        });
    }
  }

  openDatePicker = async () => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    });

    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({ date: day + '-' + month + '-' + year });
    }
  }


  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1, }]}>
        <ScrollView style={{ width: '95%', marginLeft: '2.5%' }}>
          <Text style={styles.heading}>Crime Report Form</Text>
          <Card>
          <CityPicker city={this.selectedCity} />            
            <Sae
              label={'Crime Nature *'}
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
              label={'Crime Date *'}
              iconClass={FontAwesomeIcon}
              style={styles.inputContainer}
              iconName={'pencil'}
              iconColor={'grey'}
              autoCapitalize={'none'}
              autoCorrect={false}
              inputStyle={styles.textInput}
              value={this.state.date}
              keyboardType="numeric"
              onFocus={() => this.openDatePicker()}
            />
            <Sae
              label={'Crime Details *'}
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
            <Button raised primary text="Save" onPress={this.registerCrimeReport.bind(this)} />
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
    crimeRecord: (details) => {
      dispatch({ type: 'CRIME_REPORT_RECORDS', payload: details });
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrimeReportForm));

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

