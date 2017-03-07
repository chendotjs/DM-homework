#!/usr/bin/env python3

from os import walk
from os import listdir

basePath = './mini_newsgroups'
dataSet = []

for (dirpath, dirnames, filenames) in walk(basePath):
    for category in dirnames:
        # print(category)
        txtFiles = listdir(basePath + '/' + category)
        for txtFile in txtFiles:
            # print('txt:' + txtFile)
            file_object = open(basePath + '/' + category +
                               '/' + txtFile, "r+", encoding="iso-8859-15")
            dict = {}
            try:
                file_context = file_object.read()
                dict['text'] = file_context
                dict['category'] = category
                # print(dict)
                dataSet.append(dict)
            finally:
                file_object.close()
    break

print(dataSet)
print(len(dataSet))
