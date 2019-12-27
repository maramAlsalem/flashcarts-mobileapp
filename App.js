import React, {Component} from 'react';
import {View, Platform, StatusBar} from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { purple, white } from './utils/colors'
import * as Constants from 'expo-constants';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import {setLocalNotification} from "./utils/api";
import { Ionicons,FontAwesome} from '@expo/vector-icons';


function UdaciStatusBar ({backgroundColor,...props}){

  return (
    <View style={{backgroundColor,height: Constants.statusBarHeight}}>
       <StatusBar translucent backgroundColor={backgroundColor}{...props} />
    </View>
  )

}

const mainTabs = {
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs = createBottomTabNavigator(mainTabs, TabNavigatorConfig)

const TabsContainer = createAppContainer(Tabs)


const MainNavigator = createStackNavigator({
    home: {
        screen: TabsContainer,
        navigationOptions: {
          headerTintColor:white,
         headerStyle:{
        backgroundColor:purple,
      },
          title: 'Mobile Flashcards',
        },
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions:{
          headerTintColor:white,
          headerStyle:{
            backgroundColor:purple,
          },
                title:'Deck Details'
         }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
          headerTintColor:white,
          headerStyle:{
          backgroundColor:purple,
         },
            title: 'Quiz',
        },
    },
    AddCard: {
        screen: AddCard,
        navigationOptions:{
          headerTintColor:white,
          headerStyle:{
            backgroundColor:purple,
          },
          title:'Add Card'
      
       }
    },
});

const MainContainer = createAppContainer(MainNavigator)

class App extends Component {

    state = {
        loading: true
    };

    async componentDidMount() {
        this.setState({ loading: false });
        setLocalNotification();
    }

    render() {
      
        return (
            <View style={{flex: 1}}>
                <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                <MainContainer />
            </View>
        );
    }
}

export default App;