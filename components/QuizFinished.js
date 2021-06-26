import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { white, black } from '../utils/colors';
import { clearNotifications, setNotification } from '../utils/tools';

const QuizFinished = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    //alert('Clear notification and set new one for tomorrow')

    clearNotifications().then(setNotification);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.btnText, { color: black, fontSize: 30 }]}>
        Quiz Finished
      </Text>
      <Text style={[styles.btnText, { color: black }]}>
        Score: {props.score} ({Math.round(props.percentageScore * 100) / 100} %)
      </Text>
      <TouchableOpacity
        style={[styles.btn, styles.btnWhite]}
        onPress={() =>
          navigation.navigate('DeckView', { idDeck: props.idDeck })
        }>
        <Text style={[styles.btnText, { color: black }]}>Back to Deck</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={props.restartQuiz}>
        <Text style={styles.btnText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default QuizFinished;
