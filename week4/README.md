# Week 4

## 作业1：KNN对手写数字的识别

### 数据集

数据集在trainingDigits目录下，测试集在testDigits目录下。每个手写数字已经事先处理成32*32的二进制文本，存储为txt文件。0～9每个数字都有10个训练样本，5个测试样本。

### 实现步骤
（1）将每个图片（即txt文本，以下提到图片都指txt文本）转化为一个向量，即32\*32的数组转化为1\*1024的数组，这个1\*1024的数组用机器学习的术语来说就是特征向量。

（2）训练样本中有10\*10个图片，可以合并成一个100\*1024的矩阵，每一行对应一个图片。（这是为了方便计算，很多机器学习算法在计算的时候采用矩阵运算，可以简化代码，有时还可以减少计算复杂度）。

（3）测试样本中有10\*5个图片，我们要让程序自动判断每个图片所表示的数字。同样的，对于测试图片，将其转化为1\*1024的向量，然后计算它与训练样本中各个图片的“距离”（这里两个向量的距离采用欧式距离），然后对距离排序，选出较小的前k个，因为这k个样本来自训练集，是已知其代表的数字的，所以被测试图片所代表的数字就可以确定为这k个中出现次数最多的那个数字。

### python代码

[kNN.py](kNN.py)

### 测试结果
```
the classifier came back with: 6, the real answer is: 6
the classifier came back with: 3, the real answer is: 3
the classifier came back with: 7, the real answer is: 7
the classifier came back with: 6, the real answer is: 6
the classifier came back with: 5, the real answer is: 5
the classifier came back with: 6, the real answer is: 6
the classifier came back with: 1, the real answer is: 1
the classifier came back with: 7, the real answer is: 7
the classifier came back with: 0, the real answer is: 0
the classifier came back with: 0, the real answer is: 0
the classifier came back with: 6, the real answer is: 6
the classifier came back with: 1, the real answer is: 1
the classifier came back with: 2, the real answer is: 2
the classifier came back with: 1, the real answer is: 1
the classifier came back with: 2, the real answer is: 2
the classifier came back with: 0, the real answer is: 0
the classifier came back with: 3, the real answer is: 3
the classifier came back with: 1, the real answer is: 1
the classifier came back with: 2, the real answer is: 2
the classifier came back with: 5, the real answer is: 5
the classifier came back with: 9, the real answer is: 9
the classifier came back with: 9, the real answer is: 9
the classifier came back with: 8, the real answer is: 8
the classifier came back with: 4, the real answer is: 4
the classifier came back with: 3, the real answer is: 3
the classifier came back with: 5, the real answer is: 5
the classifier came back with: 6, the real answer is: 6
the classifier came back with: 3, the real answer is: 3
the classifier came back with: 8, the real answer is: 8
the classifier came back with: 1, the real answer is: 1
the classifier came back with: 4, the real answer is: 4
the classifier came back with: 0, the real answer is: 0
the classifier came back with: 3, the real answer is: 3
the classifier came back with: 4, the real answer is: 4
the classifier came back with: 7, the real answer is: 7
the classifier came back with: 9, the real answer is: 9
the classifier came back with: 5, the real answer is: 5
the classifier came back with: 0, the real answer is: 0
the classifier came back with: 9, the real answer is: 9
the classifier came back with: 5, the real answer is: 5
the classifier came back with: 2, the real answer is: 2
the classifier came back with: 8, the real answer is: 8
the classifier came back with: 2, the real answer is: 2
the classifier came back with: 7, the real answer is: 7
the classifier came back with: 9, the real answer is: 9
the classifier came back with: 7, the real answer is: 7
the classifier came back with: 8, the real answer is: 8
the classifier came back with: 4, the real answer is: 4
the classifier came back with: 8, the real answer is: 8
the classifier came back with: 4, the real answer is: 4

the total number of errors is: 0

the total error rate is: 0.000000
```


## 作业2：BP神经网络
对于下图的训练集，使用一个简单的ANN对其进行预测。

![训练集与新形势](https://jizhi-10061919.file.myqcloud.com/blog/caaf2e4de6029b93d9d5faef56d2020c.png)

经过观察可以发现，第三列是无关的，而前两列成“异或”关系——相等为0，相异为1。所以正确答案应为0。

运行结果：

```
Stage 1) 随机初始突触权重：
    Layer 1 (4 neurons, each with 3 inputs):
[[-0.16595599  0.44064899 -0.99977125 -0.39533485]
 [-0.70648822 -0.81532281 -0.62747958 -0.30887855]
 [-0.20646505  0.07763347 -0.16161097  0.370439  ]]
    Layer 2 (1 neuron, with 4 inputs):
[[-0.5910955 ]
 [ 0.75623487]
 [-0.94522481]
 [ 0.34093502]]
Stage 2) 训练后的新权重值：
    Layer 1 (4 neurons, each with 3 inputs):
[[ 0.3122465   4.57704063 -6.15329916 -8.75834924]
 [ 0.19676933 -8.74975548 -6.1638187   4.40720501]
 [-0.03327074 -0.58272995  0.08319184 -0.39787635]]
    Layer 2 (1 neuron, with 4 inputs):
[[ -8.18850925]
 [ 10.13210706]
 [-21.33532796]
 [  9.90935111]]
Stage 3) 思考新形势 [1, 1, 0] -> ?:
[ 0.0078876]
```
