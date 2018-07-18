import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ListItem } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import * as Animatable from 'react-native-animatable';
import StatusPickerAll from '../../../components/StatusPickerAll/StatusPickerAll';

class CrimeReportScreenAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimeReportsItems: [],
      selectedStatus: '',
    };
    this.selectedStatus = this.selectedStatus.bind(this);
  }

  componentDidMount() {
    this.setState({crimeReportsItems: this.props.allCrimeReportDetails});
  }

  selectedStatus(value) {
    this.setState({ selectedStatus: value });
    this.filterData(value);
  }

  filterData(value) {
    let a = [];    
    if (value != 'all')
    {
    this.props.allCrimeReportDetails.forEach(record => {
      if (record.status == value) {
        a.push(record);
      }
    });
  }
  else{
    a = [...this.props.allCrimeReportDetails]
  }
    this.setState({ crimeReportsItems: a });
  }



  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1, }]}>
        <Text style={styles.heading}>Crime Reports</Text>
          <StatusPickerAll status={this.selectedStatus} value='all'/>
          <ScrollView>
            {this.state.crimeReportsItems.map((record, key) => (
              <ListItem
                key={key}
                divider
                leftElement={
                  <Image
                    source={{ uri: record.picUrl }}
                    indicator={ProgressCircle}
                    indicatorProps={{
                      size: 30,
                      borderWidth: 1,
                      color: 'rgba(150, 150, 150, 1)',
                      unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }}
                    style={{
                      width: 50,
                      height: 50,
                    }} />
                }
                centerElement={{
                  primaryText: 'Crime Nature: ' + record.nature + ' (Date: ' + record.date + ')',
                  secondaryText: 'Location: ' + record.location,
                  tertiaryText: 'Details:' + record.details,
                }}
                onPress={() => {
                  this.props.history.push({
                      pathname: '/adminCrimeStatus',
                      state: {
                        nature: record.nature,
                        date: record.date,
                        location: record.location,
                        details: record.details,
                        picUrl: record.picUrl,
                        status: record.status,
                        remarks: record.remarks,
                        parentKey: record.parentKey,
                        childKey: record.childKey,
                        goto: '/crimeAdmin',
                      }
                    })
                }} />
            ))}
          </ScrollView>
      </Animatable.View>
    );
  }
}
function mapStateToProps(state) {
  return {
    allCrimeReportDetails: state.allCrimeReportRecords,
    statusAdmin : state.loggedInUserDetails.userLevel,    
  }
}


export default withRouter(connect(mapStateToProps, null)(CrimeReportScreenAdmin));

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: 'center',
  }
})