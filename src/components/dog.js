import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

export default class DogSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            isLoading: false,
            imageURL: null
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const responseJSON = await response.json();
        const options = Object.keys(responseJSON.message).map(dogBreed => {
            return { key: dogBreed, label: dogBreed }
        });

        this.setState({
            isLoading: false,
            options
        });
    }

    onDogBreedSelect = async (value) => {
        this.setState({ isLoading: true });
        const breed = value.label;
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const responseJSON = await response.json();

        this.setState({
            imageURL: responseJSON.message,
            isLoading: false
        });
    }

    render() {
        const { isLoading, imageURL, options } = this.state;
        return (
            <View>
                <Image source={{ uri: imageURL }} style={styles.image} />
                <ModalSelector
                    data={options}
                    initValue="Select a dog breed!"
                    onChange={(value) => this.onDogBreedSelect(value)}
                />
                {isLoading ? (<ActivityIndicator color="red" size="large" style={styles.activityIndicator} />) : false}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: { 
        width: 400, 
        height: 400 
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});
