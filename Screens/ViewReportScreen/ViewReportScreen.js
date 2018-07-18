import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import CrimeReportScreen from '../Crime Report/CrimeReportScreen/CrimeReportScreen';
import MissingPersonScreen from '../Missing Person/MissingPersonScreen/MissingPersonScreen';
import {readAllFromDatabase} from '../../DatabaseFunctions/DatabaseFunctions';

class ViewReportScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  crimeReportScreenOpen() {
    this.props.history.push('/busy');    
    fetch('https://xendre-login-f7129.firebaseio.com/users/CrimeReport/.json')
      .then(res => res.json())
      .catch(err => {
        alert('Something went wrong, try again');
        this.props.history.push('/');
      })
      .then(data => {
        const info = [];
        let temp = [];
        for (let key in data) {
          temp.push({
            ...data[key]
          })
        }
        temp.forEach(item => {
          for (let key in item) {
            info.push({
              ...item[key]
            })
          }
        });
        this.props.allCrimeRecord(info);
        // console.log(info);
        this.props.history.push({
          pathname: '/crime',
          state: { allRecords: true }
        });
      });
  }
  render() {

    return (
      <View style={{ flex: 1 }}>
      <ScrollableTabView
      initialPage ={0}
    renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
    tabBarPosition='top'
  >
  <ScrollView tabLabel='Crime Reports'>
  <CrimeReportScreen allRecords ={true}/>
    </ScrollView>
    <ScrollView tabLabel='Missing Persons'>
    <MissingPersonScreen allRecords = {true}/>
    </ScrollView>
  </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    allCrimeRecord: (details) => {
      dispatch({ type: 'ALL_CRIME_REPORT_RECORDS', payload: details });
  },
  allMissingRecord: (details) => {
      dispatch({ type: 'ALL_MISSING_PERSON_RECORDS', payload: details });
}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewReportScreen));
