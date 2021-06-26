import React, { useState } from 'react';
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
import { black, white } from '../utils/colors';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { formatCard } from '../utils/_decks';
import { addCardToDeck } from '../utils/api';

const AddCard = ({ route, navigation, ...props }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const add = () => {
    if (!question || !answer) return;

    const { dispatch } = props;
    const { idDeck } = route.params;
    const card = formatCard(question, answer);

    //alert(JSON.stringify(card))
    dispatch(addCard(idDeck, card));

    // update Async Storage
    addCardToDeck(idDeck, card);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/*<Text>{JSON.stringify(route.params)}</Text>*/}

          <TextInput
            style={styles.input}
            onChangeText={setQuestion}
            value={question}
            placeholder="Question"
          />

          <TextInput
            style={styles.input}
            onChangeText={setAnswer}
            value={answer}
            placeholder="Answer"
          />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 50,
  },
  input: {
    height: 40,
    width: 300,
    padding: 12,
    borderWidth: 1,
    marginBottom: 30,
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

export default connect()(AddCard);
