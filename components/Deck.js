import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { purple, gray } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const Deck = ({id, title, subTitle }) => {
  
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DeckView', {idDeck: id})}>
      <View style={Styles.container}>
        <Text style={Styles.title}>{title}</Text>
        <Text style={Styles.subTitle}>{subTitle} cards</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 120,

    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
  },
  subTitle: {
    color: gray,
  },
});

export default Deck;
