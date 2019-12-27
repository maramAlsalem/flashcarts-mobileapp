import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

export const STORAGE_KEY = 'udaci-mobile-flashcards:deck';
export const NOTIF_KEY = 'udaci-mobile-flashcards:notification';



let initaialData = {
    Animals: {
        deckId: 'Animals',
        cards: [
            {
                question: 'If you touch a baby bird its mother will reject it?',
                answer: 'False',
            },
            {
                question: 'The smallest bird in the world, the Bee Hummingbird, weighs less than a penny?',
                answer: 'True',
            }
        ]
    }


};

export function getAllDecks() {
   
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((decks) => {
            if (!decks) {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initaialData));
                return initaialData;
            } else {
                return JSON.parse(decks);
            }
        });
}

export function addDeckTitle(deck) {
   
return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
}

export function addCard(card, deckId) {
  
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            let decks = JSON.parse(results);

            decks[deckId].cards.push(card);

            AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
                [deckId]: {
                    deckId: deckId,
                    cards: decks[deckId].cards
                }
            }));
        });
}

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIF_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export function createNotification() {
    return {
        title: 'Time is too short!',
        body: "👋  Review flashcards and take quiz to reach what you want!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIF_KEY)
        .then(data => JSON.parse(data))
        .then((data) => {
            if (data == null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            );

                            AsyncStorage.setItem(NOTIF_KEY, JSON.stringify(true));
                        }
                    });
            }
        })
}