import { AsyncStorage } from 'react-native';

import { DECKS_STORAGE_KEY, formatDeckResults, formatDeck } from './_decks';

export const fetchDeckResults = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatDeckResults);
};

export const saveDeck = (deck) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    let data = JSON.parse(results);
    data = {
      ...data,
      [deck.id]: deck,
    };

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
};

export const addCardToDeck = (idDeck, card) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    let data = JSON.parse(results);

    data = {
      ...data,
      [idDeck]: {
        ...data[idDeck],
        questions: data[idDeck].questions.concat([card]),
      },
    };

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
};
