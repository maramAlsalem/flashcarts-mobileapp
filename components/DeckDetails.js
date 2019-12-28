import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { purple, white } from '../utils/colors'
import {getAllDecks} from '../utils/api';


class DeckDetails extends Component {

    state = {
        decks: {},
    };

    async componentDidMount() {
        const decks = await getAllDecks();

        this.setState({
            decks: decks
        });
    };

    async componentDidUpdate() {
        const decks = await getAllDecks();

        this.setState({
            decks: decks
        });
    }

    render() {
        const decks = this.state.decks;
        const deckId = this.props.navigation.state.params.deckId;

        if (Object.keys(decks).length > 0) {
            return (
                <View key={deckId} style={styles.container}>
                    <View style={styles.deckContainer}>
                        <Text style={styles.deckText}>{decks[deckId].deckId}</Text>
                        <Text style={styles.deckText}>{decks[deckId].cards.length} Cards</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.deckText}></Text>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                          onPress={() => this.props.navigation.navigate('AddCard', {'deckId': deckId})}>
                            <Text style={styles.submitBtnText}>Add Card</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                        <TouchableOpacity
                          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                          onPress={() => this.props.navigation.navigate('Quiz', {'deckDetails': decks[deckId]})}>
                            <Text style={styles.submitBtnText}>Take Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container} />
            );
        }
    }
}

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  deckText: {
    fontSize: 40
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 60,
    width:"100%",
    alignItems: 'center',
   
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 10,
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
 
})

export default DeckDetails;
