import React from 'react';
import { StyleSheet, Text, View, Picker} from 'react-native';

export default class StatusPicker extends React.Component {
constructor(props){
    super(props);
    this.state = {
        status: this.props.value,
    };
}
    stateSelected(value){
            this.props.status(value);            
            this.setState({status: value});
    }
    
    render(){
        return(
            <Picker
            selectedValue= {this.state.status}
            style={{ height: 50, width: '100%', marginTop: 10, color: '#7771ab'}}
            onValueChange={(itemValue, itemIndex) => {this.stateSelected(itemValue)}}>    
            <Picker.Item label="Registered" value = "registered" />
            <Picker.Item label="Under Inverstigation" value="under investigation" />
            <Picker.Item label="Case Closed" value="case closed" />
          </Picker>
        );
    }
}