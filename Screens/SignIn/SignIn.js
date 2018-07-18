import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import * as Animatable from 'react-native-animatable';
import { firebaseSignIn } from '../../Auth/Auth';
import { readFromDatabase } from '../../DatabaseFunctions/DatabaseFunctions';
import validate from '../../Validation/ValidationFunctions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    backToHome() {
        this.setState({
            email: '',
            password: '',
        });
        this.props.history.push('/');
    }

    checkValidation() {
        if (validate(this.state.email, { notEmpty: true, isEmail: true }, 'User Name')) {
            if (validate(this.state.password, { notEmpty: true, minLength: 8 }, 'Password')) {
                return true;
            }
        }
    }

    signInUser() {
        if (this.checkValidation()){
        this.props.history.push('/busy');
        firebaseSignIn(this.state.email, this.state.password)
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
                    readFromDatabase('info', res.localId)
                        .then(res => res.json())
                        .then(data => {
                            this.props.regUserDetails(data);
                            alert('Welcome ' + data.name);
                            this.props.history.push('/');
                        });
                }
            })
            .catch(err => {
                alert('Something went wrong. Try Again.');
                this.props.history.push('/');
            });
    }
}
    

    render() {
        return (
            <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1, }]}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={60} enabled >
                    <Text style={styles.heading}>Login Form</Text>
                    <Card>
                        <Sae
                            label={'Email Address'}
                            iconClass={FontAwesomeIcon}
                            style={styles.inputContainer}
                            iconName={'pencil'}
                            iconColor={'grey'}
                            // TextInput props
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            inputStyle={styles.textInput}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            keyboardType="email-address"
                        />
                        <Sae
                            label={'Password'}
                            iconClass={FontAwesomeIcon}
                            iconName={'pencil'}
                            style={styles.inputContainer}
                            iconColor={'grey'}
                            // TextInput props
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            inputStyle={styles.textInput}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            secureTextEntry={true}
                        />
                        <Text></Text>
                    </Card>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <Button raised primary text="Sign In" onPress={this.signInUser.bind(this)} />
                        <Button raised primary text="Cancel" onPress={this.backToHome.bind(this)} />
                    </View>
                </KeyboardAvoidingView>
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
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '95%', marginLeft: '2.5%'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));

