import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { white, black } from '../utils/colors';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { formatDeck } from '../utils/_decks';
import { saveDeck } from '../utils/api';

const AddDeck = (props) => {
  const [text, setText] = React.useState('');

  const add = () => {
    const { dispatch } = props;

    const formatedDeck = formatDeck(text);

    dispatch(addDeck({ [formatedDeck.id]: formatedDeck }));

    saveDeck(formatedDeck);

    setText('');

    props.navigation.navigate('Deck');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput style={styles.input} onChangeText={setText} value={text} />
          <TouchableOpacity style={styles.btn} onPress={add}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 300,
    padding: 12,
    borderWidth: 1,
  },
  btn: {
    backgroundColor: black,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  btnText: {
    color: white,
    fontWeight: 'bold',
  },
});

export default connect()(AddDeck);
