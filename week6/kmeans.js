let fs = require('fs');

let preprocess = () => {
  rawData = fs.readFileSync('data.txt', {
    encoding: 'utf8'
  }).split('\n');
  rawData.pop();

  var league = [];
  let goalFactor = 0.3
  rawData.forEach(function(ele) {
    let club = {}
    let clubName = ele.match(/\s?\d+\.([a-zA-z]+\s?)+[a-zA-z]*/);
    clubName = clubName[0].substr(0, clubName[0].length - 1);
    ele = ele.replace(clubName, '')
    ele = ele.replace(/^\s+|\s+$/g, "");
    ele = ele.replace(/(\d+)\s+(\d+)\s+(\d+)\s+((\d+):(\d+))\s+(\d+)\s+(\d+)\s+(\d+)\s+((\d+):(\d+))\s+((\d+):(\d+))\s+([+-]\d+)\s+(\d+)/g, '$1,$2,$3, goalFactor*$5, goalFactor*$6,$7,$8,$9, goalFactor*$11, goalFactor*$12')
    ele = eval('[' + ele + ']')

    club.name = clubName;
    club.data = ele;
    league.push(club);
  })
  return league
}

// 向量距离
let distance = (v1, v2) => {
  if (v1.length != v2.length)
    console.error('vector length error');
  let distance = 0;
  for (let i = 0; i < v1.length; i++) {
    distance = distance + Math.pow(v1[i] - v2[i], 2)
  }
  return Math.sqrt(distance);
}

// 随机选择k个
let randomChooseK = (length, k) => {
  if (k > length) return;
  result = [];
  while (result.length < k) {
    let index = Math.floor(Math.random() * length);
    if (result.indexOf(index) == -1) {
      result.push(index);
    }
  }
  return result;
}

let calcMean = (arr) => {
  let meanV = [];
  for (let i = 0; i < arr[0].data.length; i++) {
    let sum = 0;
    for (let j = 0; j < arr.length; j++) {
      sum = sum + arr[j].data[i];
    }
    meanV[i] = sum / arr.length;
  }
  return meanV;
}

let kmeans = (league, k) => {
  let set = [];
  for (let i = 0; i < k; i++) set.push([]);

  // 第一次迭代
  let randomK = randomChooseK(league.length, k);
  for (let i = 0; i < k; i++) {
    set[i].push(league[randomK[i]]);
    // console.log(`random choose ${league[randomK[i]].name}`)
  }
  league.forEach(function(club) {
    let minIndex = 0;
    let mindistance = distance(club.data, set[minIndex][0].data) + 1;
    for (let i = 0; i < k; i++) {
      if (club.name == set[i][0].name)
        break;
      let d = distance(club.data, set[i][0].data);
      // console.log(`${club.name} & ${league[randomK[i]].name} distance:${d}`)
      if (d < mindistance) {
        mindistance = d;
        minIndex = i;
      }
    }
    set[minIndex].push(club);
    // console.log(`${club.name} join ${set[minIndex][0].name}`)
  })

  // for (let i = 0; i < k; i++) {
  //   console.log(set[i]);
  //   console.log('----------------');
  // }


  let meanSet = [];
  let iter = 500000;
  do {
    // 算术平均数
    meanSet = [];
    for (let i = 0; i < k; i++) {
      meanSet.push(calcMean(set[i]))
    }

    set = [];
    for (let i = 0; i < k; i++) set.push([]);


    league.forEach(function(club) {
      let minIndex = 0;
      let mindistance = distance(club.data, meanSet[minIndex]) + 1;
      for (let i = 0; i < k; i++) {
        let d = distance(club.data, meanSet[i]);
        if (d < mindistance) {
          mindistance = d;
          minIndex = i;
        }
      }
      set[minIndex].push(club);
    })

    // for (let i = 0; i < k; i++) {
    //   console.log(set[i]);
    //   console.log('----------------');
    // }

    // console.log(iter);
  } while (iter--);

  for (let i = 0; i < k; i++) {
    let nameSet = [];
    set[i].forEach(function(club){
      nameSet.push(club.name);
    })
    console.log(nameSet);
    console.log('----------------');
  }

}

let league = preprocess();

kmeans(league, 3);
