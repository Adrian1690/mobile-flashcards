import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import Deck from './Deck';
import { fetchDeckResults } from '../utils/api';
import { receiveDecks } from '../actions';
import { AsyncStorage } from 'react-native';

const ListDecks = ({ decks, ...props }) => {
  useEffect(() => {
    //AsyncStorage.clear();
    const { dispatch } = props;
    fetchDeckResults().then((decks) => {
      //alert(decks)
      return dispatch(receiveDecks(decks));
    });
    //.then()
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={{height: 50, color: 'blue'}}>{JSON.stringify(decks)}</Text> */}
      <FlatList
        data={Object.keys(decks).map((deckKey) => ({
          id: deckKey,
          title: decks[deckKey].title,
          subTitle: decks[deckKey].questions
            ? decks[deckKey].questions.length
            : 0,
        }))}
        renderItem={({ item }) => (
          <Deck id={item.id} title={item.title} subTitle={item.subTitle} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

const mapStateToProps = (decks) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(ListDecks);
