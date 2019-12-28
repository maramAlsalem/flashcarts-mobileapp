import React, {Component} from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native'
import {getAllDecks} from '../utils/api';
import { purple, white } from '../utils/colors'



class DecksList extends Component {

    state = {
        decks: []
    };

    async componentDidMount() {
        const decks = await getAllDecks();

        this.setState({
            decks: decks
        });
    }

    async componentDidUpdate() {
        const decks = await getAllDecks();

        this.setState({
            decks: decks
        });
    }

  

    render() {
        const decks = this.state.decks;

        if (decks) {
            return (
                <ScrollView style={styles.container}>
                  {
                    Object.keys(decks).map((deckId) => {
                        return  <TouchableOpacity
                          key={decks[deckId].deckId} 
                          onPress={() =>
                            this.props.navigation.navigate('DeckDetails', { 'deckId': deckId})} >
                                  <View style={styles.deckContainer}>
                                <View>
                                  <Text style={styles.deckText}>{decks[deckId].deckId}</Text>
                                </View>
                                <View>
                                  <Text style={styles.cardText}>{decks[deckId].cards.length} Cards</Text>
                                </View>
                            </View> 
                        </TouchableOpacity>;
                    })
                  }
                </ScrollView>
            )
        } else {
            return (
                <View style={styles.container} />
            );
        }
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 5,
    padding: 10
  },
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10
  },
  deckText: {
    fontSize: 28
  },
  cardText: {
    fontSize: 18,
    color: purple
  }

});



export default DecksList;
