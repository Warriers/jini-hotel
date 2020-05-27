
import random
import json
from tensorflow.keras.models import load_model
import numpy as np
import pickle
import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()

def clean_up_sentence(sentence):
    """return bag of words array: 0 or 1 for each word in the bag that exists in the sentence"""
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(
        word.lower()) for word in sentence_words]
    return sentence_words


def bow(sentence, words, show_details=True):
    """tokenize the pattern"""
    sentence_words = clean_up_sentence(sentence)
    """bag of words - matrix of N words, vocabulary matrix"""
    bag = [0]*len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                """assign 1 if current word is in the vocabulary position"""
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return(np.array(bag))


def predict_class(sentence, model, words, classes):
    """filter out predictions below a threshold"""
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    """sort by strength of probability"""
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append(
            {"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag'] == tag):
            result = random.choice(i['responses'])
            break
    return result


class ChatBot:
    def __init__(self, botType):
        self.model = load_model('model/{botType}/chatbot_model.h5'.format(botType=botType))
        self.intents = json.loads(open('model/{botType}/intents.json'.format(botType=botType)).read())
        self.words = pickle.load(open('model/{botType}/words.pkl'.format(botType=botType), 'rb'))
        self.classes = pickle.load(open('model/{botType}/classes.pkl'.format(botType=botType), 'rb'))

    def ask(self, msg):
        ints = predict_class(msg, self.model, self.words, self.classes)
        res = getResponse(ints, self.intents)
        return res