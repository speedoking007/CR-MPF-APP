import React from 'react';
import { StyleSheet, Text, View, Picker} from 'react-native';

export default class CityPicker extends React.Component {
constructor(props){
    super(props);
    this.state = {
        city : 'null'
    };
}
    citySelected(value){
        if (value !== 'null')
        {
            this.setState({city: value});
        this.props.city(value);
        }
    }
    render(){
        return(
            <Picker
            selectedValue= {this.state.city}
            style={{ height: 50, width: '100%', marginTop: 10, color: '#7771ab'}}
            onValueChange={(itemValue, itemIndex) => {this.citySelected(itemValue)}}>
            <Picker.Item label="Please Select a City" value = "null" />
            <Picker.Item label="Huntsville" value="Huntsville" />
            <Picker.Item label="Anchorage" value="Anchorage" />
            <Picker.Item label="Phoenix" value="Phoenix" />
            <Picker.Item label="Los Angeles" value="Los Angeles" />
            <Picker.Item label="Washington" value="Washington" />
            <Picker.Item label="Miami" value="Miami" />
            <Picker.Item label="Chicago" value="Chicago" />
            <Picker.Item label="Boston" value="Boston" />
            <Picker.Item label="New York" value="New York" />
            <Picker.Item label="Newport" value="Newport" />
          </Picker>
        );
    }
}