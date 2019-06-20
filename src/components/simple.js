import React, { useState } from 'react';
import { Button, Picker, Platform, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import ProgressComponent from './progress';

const SimpleComponents = () => {
    const [pickerValue, setPickerValue] = useState(null);
    const [switchValue, setSwitchValue] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');

    return (
        <View>
            <Text>These are some simple components!</Text>

            <View style={styles.osDiv}></View>

            <Button title="Sample button" onPress={()=> console.log('Pressed!')}/>

            <Picker selectedValue={pickerValue} onValueChange={(value) => setPickerValue(value)}>
                <Picker.Item label="Dog" value="Dog" />
                <Picker.Item label="Cat" value="Cat" />
            </Picker>

            <Switch value={switchValue} onValueChange={(value) => setSwitchValue(value)}/>

            <TextInput value={textInputValue} onChangeText={(value) => setTextInputValue(value)} style={styles.textInput}/>

            <ProgressComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    osDiv: {
        width: 100,
        height: 50,
        backgroundColor: Platform.OS == 'ios' ? 'red' : 'blue'
    },
    textInput: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: 20
    }
});


export default SimpleComponents;