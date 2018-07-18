import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Card, Button, BottomNavigation } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { readAllFromDatabase } from '../../../DatabaseFunctions/DatabaseFunctions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    btnContainer: {
        flex: 0.25,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',      
    },
    btn: {
        flex: 1,
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },

});

class HomeAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
        }
    }

    componentDidMount() {
        let login = this.props.statusLogin;
        if (!login) {
            this.setState({
                login: false
            });
        }
        else {
            this.setState({
                login: true
            });
        }
    }

    componentWillReceiveProps() {
        let login = this.props.statusLogin;
        if (!login) {
            this.setState({
                login: false
            });
        }
        else {
            this.setState({
                login: true
            });
        }
    }

    openCrimeReportAdmin() {
        this.props.history.push('/busy');
        if (this.props.statusAdmin == 'admin') {
            readAllFromDatabase('CrimeReport')
                .then(res => res.json())
                .catch(err => {
                    alert('Something went wrong, try again');
                    this.props.history.push('/');
                })
                .then(data => {
                    console.log(data);
                    const info = [];
                    let temp = [];
                    for (let parentKey in data) {
                        temp.push({
                            ...data[parentKey], parentKey
                        })
                    }
                    temp.forEach(item => {
                        let parentKey = item.parentKey
                        for (let childKey in item) {
                            if (childKey != 'parentKey') {
                                info.push({
                                    ...item[childKey], childKey, parentKey
                                })
                            }
                        }
                    });
                    this.props.allCrimeRecord(info);
                    this.props.history.push('/adminCrime');
                });
        }
    }

    openMissingPersonAdmin() {
        this.props.history.push('/busy');
        if (this.props.statusAdmin == 'admin') {
            readAllFromDatabase('MissingPerson')
                .then(res => res.json())
                .catch(err => {
                    alert('Something went wrong, try again');
                    this.props.history.push('/');
                })
                .then(data => {
                    const info = [];
                    let temp = [];
                    for (let parentKey in data) {
                        temp.push({
                            ...data[parentKey], parentKey
                        })
                    }
                    temp.forEach(item => {
                        let parentKey = item.parentKey
                        for (let childKey in item) {
                            if (childKey != 'parentKey') {
                                info.push({
                                    ...item[childKey], childKey, parentKey
                                })
                            }
                        }
                    });
                    console.log(info);
                    this.props.allMissingRecord(info);
                    this.props.history.push('/adminMissing');
                });
        }
    }

    openComplainAdmin() {
        this.props.history.push('/busy');
        if (this.props.statusAdmin == 'admin') {
            readAllFromDatabase('Complain')
                .then(res => res.json())
                .catch(err => {
                    alert('Something went wrong, try again');
                    this.props.history.push('/');
                })
                .then(data => {
                    const info = [];
                    let temp = [];
                    for (let parentKey in data) {
                        temp.push({
                            ...data[parentKey], parentKey
                        })
                    }
                    temp.forEach(item => {
                        let parentKey = item.parentKey
                        for (let childKey in item) {
                            if (childKey != 'parentKey') {
                                info.push({
                                    ...item[childKey], childKey, parentKey
                                })
                            }
                        }
                    });
                    this.props.allComplainRecord(info);
                    this.props.history.push('/adminComplain');
                });
        }
    }



    render() {
        return (
                <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1, }]}>
                    <View style={styles.container}>
                        <Image source={require('../../../images/admin.png')} style={{ marginLeft: 10 }} />
                        {/* <View style={{ width: '100%',flex: 0.1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={[styles.heading,{textDecorationLine: 'underline'}]}>ADMIN PANEL</Text>
                    </View> */}
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={this.openComplainAdmin.bind(this)}>
                            <Image source={require('../../../images/complain_btn.png')} style={{ marginLeft: 10 }} />                                
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                    <Image source={require('../../../images/CrimeReport-50.png')} />
                                    <Text style={{ fontSize: 18, marginLeft: 5 }}>Crime Reports</Text>
                                </View> */}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={this.openCrimeReportAdmin.bind(this)}>
                                <Image source={require('../../../images/crime_report_btn.png')} style={{ marginLeft: 10 }} />
                                {/* <View style = {{flexDirection: 'row',alignItems: 'center', marginLeft: 10}}>
                            <Image source={require('../../images/missingPerson.png')} />
                            <Text style={{ fontSize: 18, marginLeft: 5 }}>Missing Persons</Text>
                            </View> */}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={this.openMissingPersonAdmin.bind(this)}>
                                <Image source={require('../../../images/missing_person_btn.png')} style={{ marginLeft: 10 }} />
                                {/* <View style = {{flexDirection: 'row',alignItems: 'center', marginLeft: 10}}>
                            <Image source={require('../../images/complain.png')} />
                            <Text style={{ fontSize: 18, marginLeft: 5 }}>Complaints</Text>
                            </View> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
        );
    }
}


function mapStateToProps(state) {
    return {
        statusLogin: state.statusLogin,
        loggedInUser: state.loggedInUser,
        statusAdmin: state.loggedInUserDetails.userLevel,
        allCrimeRecordItems: state.allCrimeReportRecords,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        allCrimeRecord: (details) => {
            dispatch({ type: 'ALL_CRIME_REPORT_RECORDS', payload: details });
        },
        allMissingRecord: (details) => {
            dispatch({ type: 'ALL_MISSING_PERSON_RECORDS', payload: details });
        },
        allComplainRecord: (details) => {
            dispatch({ type: 'ALL_COMPLAIN_RECORDS', payload: details });
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeAdmin));