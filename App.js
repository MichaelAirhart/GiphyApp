import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

import apiKey from './config/apiKey';

export default class App extends React.Component {
  state = {
    url: '#',
    previousGiphs: [],
    searchedGiph: ''
  }

  // function to show a random giph
  randomGiph = () => {
    axios.get('https://api.giphy.com/v1/gifs/random?api_key=' + apiKey + '&tag=&rating=G')
      .then(res => {
        this.setState({
          url: res.data.data.image_original_url,
        })
      })
  }

  // function to show a searched giph
  showMeTheGiph = () => {
    let random = (Math.random() * 25 + 1);
    axios.get('http://api.giphy.com/v1/gifs/search?q=' + this.state.searchedGiph + '&api_key=' + apiKey + '&limit=25&offset=' + random)
      .then(res => {
        this.setState({
          url: res.data.data[1].images.original.url,
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Giphs & Giphs & Giphs & Giphs</Text>
        {
          this.state.url !== "#"
            ?
            <Image
              style={styles.giphViewer}
              source={{ uri: this.state.url }}
            />
            :
            null
        }
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset='80'>
          <TextInput
            style={styles.textInput}
            placeholder="search giphs"
            value={this.state.inputField}
            onChangeText={(text) => { this.setState({ searchedGiph: text }) }}
          />
          <TouchableOpacity style={styles.button} onPress={this.showMeTheGiph}>
            <Text>Search Giph</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={this.randomGiph}>
            <Text>Make it Random</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  giphViewer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black"
  },
  textInput: {
    width: 300,
    height: 45,
    borderColor: 'red',
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'aquamarine',
    height: 45,
    width: 300,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    backgroundColor: 'lawngreen',
    height: 45,
    width: 300,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  }
});
