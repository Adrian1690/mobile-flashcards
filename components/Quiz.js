import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { orange, purple, white, black, green } from '../utils/colors';
import { between } from '../utils/tools';
import QuizFinished from './QuizFinished';

const Quiz = ({ deck, ...props }) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [randomIdxAnswer, setRandomIdxAnswer] = useState(0);
  const [score, setScore] = useState(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);

  useEffect(() => {
    //alert('seting random anwer')
    setRandomIdxAnswer(between(0, deck.questions.length));
  }, [deck.questions.length]);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const restartQuiz = () => {
    setQuestionIdx(0);
    setRandomIdxAnswer(between(0, deck.questions.length));
    setScore(0);
  };

  const flip = () => {
    setIsShowingAnswer(true);
    Animated.sequence([
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }),
      Animated.delay(1500),
      Animated.timing(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }),
    ]).start();

    setTimeout(() => {
      setIsShowingAnswer(false);
    }, 3500);
  };

  // answer is bool
  const checkAnswer = (answer) => () => {
    const isCorrectAnswer = questionIdx === randomIdxAnswer;
    let newScore = score;

    if (answer === isCorrectAnswer) {
      newScore += 1;
    }

    setScore(newScore);

    // Setting next question
    setQuestionIdx(questionIdx + 1);

    // Changin random answer
    setRandomIdxAnswer(between(0, deck.questions.length));
  };

  if (deck.questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Add a cart to start a Quiz!</Text>
      </View>
    );
  }

  if (questionIdx > deck.questions.length - 1) {
    return (
      <QuizFinished
        score={score}
        percentageScore={(score * 100) / deck.questions.length}
        idDeck={deck.id}
        restartQuiz={restartQuiz}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.counter}>
        {questionIdx + 1}/{deck.questions.length}
      </Text>
      <View style={styles.container}>
        <View>
          <Animated.View
            style={[
              styles.flipcard,
              {
                transform: [{ rotateY: frontInterpolate }],
              },
            ]}>
            <Text style={styles.question}>
              {deck.questions[questionIdx].question}
            </Text>
            {/*<Text >{randomIdxAnswer}</Text>*/}
            <Text style={styles.question}>
              {deck.questions[randomIdxAnswer].answer}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.flipcard,
              styles.flipCardBack,
              {
                transform: [{ rotateY: backInterpolate }],
              },
            ]}>
            <Text style={styles.question}>
              {deck.questions[questionIdx].answer}
            </Text>
          </Animated.View>
        </View>

        <View style={{ height: 30, marginTop: 10 }}>
          {!isShowingAnswer && (
            <TouchableOpacity onPress={flip}>
              <Text style={styles.showAnswer}>Show correct Answer</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: green }]}
          onPress={checkAnswer(true)}>
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: 'red' }]}
          onPress={checkAnswer(false)}>
          <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipcard: {
    width: 300,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purple,
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  flipCardBack: {
    //backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  question: {
    fontSize: 25,
    marginBottom: 25,
    textAlign: 'center',
    color: white,
  },
  showAnswer: {
    color: purple,
    fontWeight: 'bold',
  },
  btn: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  btnText: {
    color: white,
    fontWeight: 'bold',
  },
  counter: {
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
});

const mapStateToProps = (state, { route }) => {
  const { idDeck } = route.params;
  return {
    deck: state[idDeck],
  };
};

export default connect(mapStateToProps)(Quiz);
