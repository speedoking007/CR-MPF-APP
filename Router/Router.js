import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Dimensions, TouchableWithoutFeedback,Keyboard,AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { NativeRouter, Route, Link } from 'react-router-native';
import { BottomNavigation } from 'react-native-material-ui';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import Home from '../Screens/Home/Home';
import BottomBar from '../components/BottomBar/BottomBar';
import RegistrationForm from '../Screens/RegistrationForm/RegistrationForm';
import SignIn from '../Screens/SignIn/SignIn';
import Busy from '../components/Busy/Busy';

import ComplainScreen from '../Screens/Complain/ComplainScreen/ComplainScreen';
import ComplaintForm from '../Screens/Complain/ComplaintForm/ComplaintForm';
import ComplainStatusScreen from '../Screens/Complain/ComplainStatusScreen/ComplainStatusScreen';

import CrimeReportScreen from  '../Screens/Crime Report/CrimeReportScreen/CrimeReportScreen';
import CrimeReportForm from '../Screens/Crime Report/CrimeReportForm/CrimeReportForm';
import CrimeReportStatusScreen from '../Screens/Crime Report/CrimeReportStatusScreen/CrimeReportStatusScreen';

import MissingPersonScreen from '../Screens/Missing Person/MissingPersonScreen/MissingPersonScreen';
import MissingPersonForm from '../Screens/Missing Person/MissingPersonForm/MissingPersonForm';
import MissingPersonStatusScreen from '../Screens/Missing Person/MissingPersonStatusScreen/MissingPersonStatusScreen';

import ViewReportScreen from '../Screens/ViewReportScreen/ViewReportScreen';

import HomeAdmin from '../Screens/Admin Screens/HomeAdmin/HomeAdmin';

import CrimeReportScreenAdmin from '../Screens/Admin Screens/CrimeReportScreenAdmin/CrimeReportScreenAdmin';
import CrimeReportStatusScreenAdmin from '../Screens/Admin Screens/CrimeReportStatusScreenAdmin/CrimeReportStatusScreenAdmin';

import ComplainScreenAdmin from '../Screens/Admin Screens/ComplainScreenAdmin/ComplainScreenAdmin';
import ComplainStatusScreenAdmin from '../Screens/Admin Screens/ComplainStatusScreenAdmin/ComplainStatusScreenAdmin';

import MissingPersonScreenAdmin from '../Screens/Admin Screens/MissingPersonScreenAdmin/MissingPersonScreenAdmin';
import MissingPersonStatusScreenAdmin from '../Screens/Admin Screens/MissingPersonStatusScreenAdmin/MissingPersonStatusScreenAdmin';

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCvQM-osJvMeJVIrTUXETRasaB_bzj7AbI",
    authDomain: "xendre-login-f7129.firebaseapp.com",
    databaseURL: "https://xendre-login-f7129.firebaseio.com",
    storageBucket: "xendre-login-f7129.appspot.com"
  };
  
  firebase.initializeApp(firebaseConfig);

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginBar: '',
        };
    }

componentWillMount(){
    //  AsyncStorage.getItem('userDetails')
    //     .then (res=>{
    //       if (JSON.parse(res) !== null) {
    //         this.props.regUserDetails(JSON.parse(res));
    //       }
    //     });
    
    let login = !this.props.statusLogin
    if (login) {
        this.setState({
            loginBar: true
        });
    }
    else {
        this.setState({
            loginBar: false
        });
    }
}

    componentWillReceiveProps() {
        let login = this.props.statusLogin
        if (login) {
            this.setState({
                loginBar: true
            });
        }
        else {
            this.setState({
                loginBar: false
            });
        }
    }
   
    render() {
        const animatedStyle = {opacity : this.animatedValue}
        return (
            <NativeRouter>
                <View style={styles.ToolbarContainer}>
                    <AppToolbar login = {this.state.loginBar}/>
                    <ImageBackground source={require('../images/back3.jpg')} style={{flex: 1,width: '100%', height: Dimensions.get('window').height}}>                    
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    
                    <View style={styles.container}>
                        <Route path='/' component={Home} exact />
                        <Route path='/register' component={RegistrationForm} />
                        <Route path='/signin' component={SignIn} />
                        <Route path='/complaint' component={ComplainScreen} />                        
                        <Route path='/complaintForm' component={ComplaintForm}  />
                        <Route path='/complaintStatus' component ={ComplainStatusScreen}/>                        
                        <Route path='/missing' component={MissingPersonScreen} />                        
                        <Route path='/missingForm' component={MissingPersonForm} /> 
                        <Route path='/missingStatus' component ={MissingPersonStatusScreen}/>                        
                        <Route path='/crime' component={CrimeReportScreen} />                        
                        <Route path='/crimeForm' component={CrimeReportForm} />
                        <Route path='/crimeStatus' component ={CrimeReportStatusScreen}/>
                        <Route path='/viewReports' component ={ViewReportScreen}/>                                                                                                                                                                                                                                                                                                                                                                   
                        <Route path='/adminPanel' component ={HomeAdmin}/>
                        <Route path='/adminCrime' component ={CrimeReportScreenAdmin}/>                                                                                                                                                                                                                                                                                                                                                                   
                        <Route path='/adminCrimeStatus' component ={CrimeReportStatusScreenAdmin}/>                                                                                                                                                                                                                                                                                                                                                                   
                        <Route path='/adminComplain' component ={ComplainScreenAdmin}/>                                                                                                                                                                                                                                                                                                                                                                   
                        <Route path='/adminComplainStatus' component ={ComplainStatusScreenAdmin}/> 
                        <Route path='/adminMissing' component ={MissingPersonScreenAdmin}/>                                                                                                                                                                                                                                                                                                                                                                   
                        <Route path='/adminMissingStatus' component ={MissingPersonStatusScreenAdmin}/> 
                        <Route path='/busy' component={Busy} />
                    </View>
            </TouchableWithoutFeedback>
                    
                    </ImageBackground>
                    {this.state.loginBar ?
                        <View style={styles.footerContainer}>
                            <BottomBar />
                        </View> : null}
                </View>
            </NativeRouter>
        );
    }
}
function mapStateToProps(state) {
    return {
        statusLogin : state.statusLogin
        //loggedInUser: state.loggedInUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        regUserDetails: (userDetails) => {
            dispatch({ type: 'USER_DETAILS', payload: userDetails });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);


const styles = StyleSheet.create({
    ToolbarContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    footerContainer: {
        backgroundColor: 'teal'
    }

});
