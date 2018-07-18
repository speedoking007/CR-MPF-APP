import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { Card, Button, BottomNavigation } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { readFromDatabase, readAllFromDatabase } from '../../DatabaseFunctions/DatabaseFunctions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnContainer: {
        flex: 0.15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cardText: {
        margin: 10,
        fontSize: 16,
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login:''
        }
    }


    
    componentDidMount() {
        if (this.props.statusAdmin == 'admin') {
            this.props.history.push('/adminPanel');
        }
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

    missingPersonScreenOpen() {
    this.props.history.push('/busy');
    let res = this.props.loggedInUser;
        readFromDatabase('MissingPerson',res.localId)
        .then(res => res.json())
                .then(data => {
                    const info = [];
                    for (let key in data) {
                        info.push({
                            ...data[key]
                        })
                    }
                    this.props.missingRecord(info);
                    this.props.history.push({
                        pathname: '/missing',
                        state: { allRecords: false }
                    });    
              })
              .catch(err => {alert('Something went wrong, try again.')});     
      }

    complaintScreenOpen() {
        this.props.history.push('/busy');
        let res = this.props.loggedInUser;
        readFromDatabase('Complain', res.localId)
            .then(res => res.json())
            .then(data => {
                const info = [];
                for (let key in data) {
                    info.push({
                        ...data[key]
                    })
                }
                this.props.complainRecord(info);
                this.props.history.push('/complaint');                
            });
    }

    crimeReportScreenOpen() {
        this.props.history.push('/busy');
        let res = this.props.loggedInUser;
            readFromDatabase('CrimeReport',res.localId)
            .then(res => res.json())
                    .then(data => {
                        const info = [];
                        for (let key in data) {
                            info.push({
                                ...data[key]
                            })
                        }
                        this.props.crimeRecord(info);
                        this.props.history.push({
                            pathname: '/crime',
                            state: { allRecords: false }
                        });    
                  })
                  .catch(err => {alert('Something went wrong, try again.')});    
                }
       
    getAllRecords() {
        this.props.history.push('/busy');    
        Promise.all ([readAllFromDatabase('CrimeReport'), readAllFromDatabase('MissingPerson')])
       .then (res => res.map((r,index) => r.json()
       .then (data => {
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
        if (index == 0)
        {
            this.props.allCrimeRecord(info);
        }
        else{
            this.props.allMissingRecord(info);                        
            this.props.history.push('/viewReports');
        }
        }   
        )
    )    
    )
    }
       

    render() {
        return (
            <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1, }]}>
                <View style={styles.container}>
                    <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems:'center'}}>
                    <Image source = {require('../../images/logo.png')}/>
                        <Text style={styles.heading}>Crime Report </Text>
                        <Text style={styles.heading}> & </Text>
                        <Text style={styles.heading}>Missing Person Finder App</Text>
                        <Text></Text>
                    </View>
                    <Card style={{ flex: 0.2 }}>
                        <Text style={styles.cardText}>This app allows you to file complaints, crime reports and missing person reports and keep a track of it. For filing complaints you have to register / sign in to our app by clicking below register or sign in button.</Text>
                    </Card>
                    <View style={styles.btnContainer}>
                        <View style={{ width: '45%' }}>
                            <Button onPress={this.complaintScreenOpen.bind(this)} raised disabled={!this.state.login} primary text="Complaints" />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Button raised disabled={!this.state.login} onPress={this.missingPersonScreenOpen.bind(this)} primary text="Missing Persons" />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={{ width: '45%' }}>
                            <Button raised primary text="View Reports" onPress={this.getAllRecords.bind(this)} />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Button raised disabled={!this.state.login} onPress={this.crimeReportScreenOpen.bind(this)} primary text="Crime Reports" />
                        </View>
                    </View>
                </View>
            </Animatable.View>
        );
    }
}


function mapStateToProps(state) {
    return {
        statusLogin: state.statusLogin,
        loggedInUser : state.loggedInUser,
        statusAdmin: state.loggedInUserDetails.userLevel,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        complainRecord: (details) => {
            dispatch({ type: 'COMPLAIN_RECORDS', payload: details });
        },
        missingRecord: (details) => {
            dispatch({ type: 'MISSING_PERSON_RECORDS', payload: details });
        },
        crimeRecord: (details) => {
            dispatch({ type: 'CRIME_REPORT_RECORDS', payload: details });
        },
        allCrimeRecord: (details) => {
            dispatch({ type: 'ALL_CRIME_REPORT_RECORDS', payload: details });
        },
        allMissingRecord: (details) => {
            dispatch({ type: 'ALL_MISSING_PERSON_RECORDS', payload: details });
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));