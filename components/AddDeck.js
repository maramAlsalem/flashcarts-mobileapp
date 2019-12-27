import React, {Component} from 'react';
import {Alert} from "react-native";
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import {addDeckTitle} from '../utils/api';
import { purple, white } from '../utils/colors'


function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
    style={Platform.OS === 'ios'? styles.iosSubmitBtn:styles.androidSubmitBtn}
     onPress={onPress} >
        <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {

    state = {
        deckName: '',
    };

    handelDeck = async (event) => {
        event.preventDefault();

        const {deckName} = this.state;

        if (deckName === '') {
            Alert.alert('You must filled deck name.');
            return;
        }

        await addDeckTitle({[deckName]: {deckId: deckName, cards: []}});

        this.setState({
            deckName: ''
        });

        this.props.navigation.navigate('DecksList', { 'deckId': deckName});
    };

    render() {
        const { deckName } = this.state
        return (
          <View style={styles.container}>
            <Text > What is the title of new dock?</Text>
                <TextInput
                  value={deckName}
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:3 }} 
                  onChangeText={(deckName) => this.setState({deckName})}
                />
            <SubmitBtn style={styles.row} onPress={this.handelDeck} />
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor:purple,
        padding:10,
        borderRadius:2,
        height:45,
        marginLeft:30,
        marginRight:30,
        alignSelf:'flex-end',
        justifyContent:'center',
        alignItems:'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center:{
    flex:1,
    justifyContent:'center',
    marginRight:30,
    marginLeft:30,
},
 
})

export default AddDeck;