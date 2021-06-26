import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { gray, black, white } from '../utils/colors';

const Card = ({ deck, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: deck.title,
    });
  }, [deck.id]);

  return (
    <View style={styles.container}>
      {/*<Text>{JSON.stringify(deck)}</Text>*/}
      <View style={styles.info}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
      </View>

      <TouchableOpacity
        style={[styles.btn, styles.btnWhite]}
        onPress={() => navigation.navigate('AddCard', { idDeck: deck.id })}>
        <Text style={[styles.btnText, { color: black }]}>Add card</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => navigation.navigate('Quiz', { idDeck: deck.id })}>
          <Text style={styles.btnText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: gray,
    fontSize: 20,
  },
  btn: {
    backgroundColor: black,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: 200,
  },
  btnWhite: {
    backgroundColor: white,
    borderWidth: 1,
  },
  btnText: {
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state, { route }) => {
  const { idDeck } = route.params;
  return {
    deck: state[idDeck],
  };
};

export default connect(mapStateToProps)(Card);
