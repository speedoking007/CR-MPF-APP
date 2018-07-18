import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import {withRouter} from 'react-router-native';

class BottomBar extends React.Component{
constructor(){
super();
this.state = {
    active: '',
};
}

registration(){
    this.setState({ 
        active: 'register'});
    this.props.history.push('/register');
}

signIn(){
    this.setState({active: 'signin'});
    this.props.history.push('/signin');
}
    render(){
        return(
            <View   >
            <BottomNavigation active={this.state.active}>
            <BottomNavigation.Action
                key="register"
                icon = 'supervisor-account'
                label="Register"
                onPress={this.registration.bind(this)}
             
            />
            <BottomNavigation.Action
                key="signin"
                icon="person"
                label="Sign In"
                onPress={this.signIn.bind(this)}
             
            />
        </BottomNavigation>
        </View> 
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
  
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BottomBar));
export default withRouter(BottomBar);