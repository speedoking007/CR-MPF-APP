import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import {withRouter} from 'react-router-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

let menu1 = ['Home','Sign In', 'Register'];
let menu2 = ['Home', 'Logout']
let menu =[];

class AppToolbar extends React.Component{
constructor(props){
    super(props);
    this.state= {
      login: props.statusLogin
    };
}


componentWillReceiveProps(){
  this.setState({login: this.props.statusLogin});
}

  press(e){
    if (!this.state.login)
    {
     if (e.action === 'menu' && e.index == 0){
        this.props.history.push('/');        
      }
      else if (e.action === 'menu' && e.index == 1){
        this.props.history.push('/signin');        
      }
      else if (e.action === 'menu' && e.index == 2){
        this.props.history.push('/register');        
      }
    }
    else
    {
       if (e.action === 'menu' && e.index == 0){
          this.props.history.push('/');        
        }
        else if (e.action === 'menu' && e.index == 1){
     let that = this;
        firebase.auth().signOut()
       .then(function() {
     that.props.logoutUser();         
      alert ('You are successfully logout.');
      that.props.history.push('/');          
  })
    .catch(function(error) {
      alert ('Something went wrong. Try Again.');
      that.props.history.push('/');              
  });       
        }
    } 
  }
    
render(){
  {this.state.login ? menu = menu2 : menu = menu1 }
return(
            <Toolbar
            leftElement = 'home'
            onLeftElementPress={(e) => {
              this.props.history.push('/');
           }}
                        centerElement= "CR & MPF"
                        rightElement={{
                           menu: {labels: menu}
                        }}
                        onRightElementPress={(e) => {
                           this.press(e);
                        }} 
                  />
    );
}

}

function mapStateToProps(state) {
  return {
    statusLogin : state.statusLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
      logoutUser: () => {
          dispatch({ type: 'USER_LOGOUT', payload: [] });
      }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppToolbar));