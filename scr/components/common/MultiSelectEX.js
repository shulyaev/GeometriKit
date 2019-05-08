import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity } from 'react-native'
import MultiSelect from 'react-native-multiple-select';

export default class MultiSelectEX extends Component {

    state = {
      selectedItems : [],
    };

    onSelectedItemsChange = selectedItems => {
      this.props.updateSelectedSubjects(selectedItems);
      this.setState({ selectedItems });
    }

    render() {
      const { selectedItems } = this.state;
      return (
        <View>
          <MultiSelect
            hideTags
            items={this.props.subjects}
            uniqueKey="subjectID"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="בחר נושאים"
            searchInputPlaceholderText="בחר נושאים"
            onChangeInput={(text)=> console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="subjectName"
            searchInputStyle={{ color: '#CCC', textAlign: 'right', fontSize: 20 }}
            submitButtonColor="grey"
            submitButtonText="אשר"
          />
          <View>
            {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
          </View>
        </View>
      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})