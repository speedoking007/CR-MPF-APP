import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ScreenOrientation } from 'expo';
import { ThemeProvider } from 'react-native-material-ui';
import Router from './Router/Router';
import { Provider } from 'react-redux';
import Busy from './components/Busy/Busy';
import {createStore} from 'redux';
import reducer from './store';

let defaultState = {
  statusLogin: false,
  loggedInUser: null,
  loggedInUserDetails :[],
  complainRecords : [],
  missingPersonRecords :[],
  crimeReportRecords: [],
  allCrimeReportRecords :[],
  allMissingPersonRecords:[],
  allComplainRecords: [],
};

 class App extends React.Component {
constructor(props){
super(props);
this.state={
loadData : false
}
}
componentWillMount(){  
 AsyncStorage.getItem('userDetails')
        .then (res=>{
          if (JSON.parse(res) !== null) {
            defaultState.loggedInUserDetails = JSON.parse(res);
            AsyncStorage.getItem('userToken')
            .then(data =>{
            defaultState.statusLogin = true;
            defaultState.loggedInUser = JSON.parse(data);
            this.setState({loadData : true}); 
            });
          }
          else{
            this.setState({loadData: true});
          }
        });
  }
  changeScreenOrientation() {
    ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }
 
  
  render() {
    return (
      <View style={{flex: 1}}>
      {this.state.loadData ? 
      <Provider store={createStore(reducer,defaultState)}>
        <ThemeProvider>
          <View style={styles.container}>
            {this.changeScreenOrientation()}
            <Router />
          </View>
        </ThemeProvider>
      </Provider>
      : 
      <Busy/>
      }
      </View>  
  )
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

