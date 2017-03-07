from naiveBayesClassifier import tokenizer
from naiveBayesClassifier.trainer import Trainer
from naiveBayesClassifier.classifier import Classifier


file_object = open('news.data')
newsSet = ''
try:
    file_context = file_object.read()
    newsSet = eval(file_context)
    print(len(newsSet))
finally:
    file_object.close()


newsTrainer = Trainer(tokenizer.Tokenizer(stop_words = [], signs_to_remove = ["?!#%&"]))


for news in newsSet:
    newsTrainer.train(news['text'], news['category'])

# a classifier.
newsClassifier = Classifier(newsTrainer.data, tokenizer.Tokenizer(stop_words = [], signs_to_remove = ["?!#%&"]))

# Now you have a classifier which can give a try to classifiy text of news whose
# category is unknown, yet.
unknownInstance = "Even if I eat too much, is not it possible to lose some weight"
classification = newsClassifier.classify(unknownInstance)

# the classification variable holds the possible categories sorted by
# their probablity value
print classification
