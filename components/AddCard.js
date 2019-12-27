import React, {Component} from 'react';
import {addCard} from '../utils/api';
import { Alert, View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { purple, white ,gray} from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
    };

    addCard = async (event) => {
        event.preventDefault();

        const {question, answer} = this.state;

        if (question === '') {
            Alert.alert(
                
                'Sorry please fill question.'
            );

            return;
        }

        if (answer === '') {
            Alert.alert(
                
                'Sorry fill Answer .'
            );

            return;
        }

        await addCard({
            question: question,
            answer: answer
        }, this.props.navigation.state.params.deckId);

        this.setState({
            question: '',
            answer: ''
        });

        this.props.navigation.navigate('DeckDetails', {'deckId': this.props.navigation.state.params.deckId});
    };

    render() {
        const {question, answer} = this.state;

        return (

          <View style={styles.container}>
                 <View style={[styles.block]}> 

                <Text>Qusetion </Text>
                <TextInput 
                  value={question}
                  style={styles.input}
                  onChangeText={(question) => this.setState({question: question})}
                />
                </View>
                <View style={[styles.block]}> 

                <Text>Answer </Text>

                <TextInput 
                  value={answer}
                  style={styles.input}
                  onChangeText={(answer) => this.setState({answer: answer})}
                />
                </View>
            <SubmitBtn onPress={this.addCard} />
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },

  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40
  }
})

export default AddCard;