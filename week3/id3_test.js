const DecisionTree = require('decision-tree');
const fs = require('fs');

let total_predicted_right = 0;

trainingData = fs.readFileSync('data.json', encoding = 'utf8')
trainingData = JSON.parse(trainingData)

trainingDataGroup = []; //分成10组
for (let i = 0; i < 10; i++)
  trainingDataGroup.push([])

for (let i = 0; i < trainingData.length; i++) {
  let random = null;
  do {
    random = Math.floor(Math.random() * 10);
  } while (trainingDataGroup[random].length >= trainingData.length / 10);
  trainingDataGroup[random].push(trainingData[i]) // 每组15个元素
}

//交叉验证
for (let i = 0; i < 10; i++) {
  let sampleTrainingData = [];
  for (let j = 0; j < 10; j++) {
    if (i != j) {
      for (let k = 0; k < trainingData.length / 10; k++)
        sampleTrainingData.push(trainingDataGroup[j][k])
    }
  }

  let dt = new DecisionTree(sampleTrainingData, 'performance', ['TA_gender', 'title', 'semister', 'category', 'size']);
  let predicted_right = 0;
  for (let j = 0; j < trainingData.length / 10; j++) {
    let predicted_class = dt.predict(trainingDataGroup[i][j]);
    console.log(predicted_class, trainingDataGroup[i][j].performance);
    if (predicted_class == trainingDataGroup[i][j].performance) {
      predicted_right++;
      total_predicted_right++;
    }
  }
  console.log("accuracy:", predicted_right / (trainingData.length / 10) * 100 + "%");
  console.log(`=============================${i}=================================`)
}
console.log("global accuracy:", total_predicted_right / trainingData.length * 100 + "%");
