# Week 6

## 作业1：如何利用关联挖掘获得分类模型

分类规则和关联规则有一定相似性，都满足`IF A => B`类似的模式。

以买电脑的数据集为例，数据集的属性的包括age、income、student、credit_rating、buys_computer。

|       属性      |         取值         |  重新定义为新事件  |
| :-----------: | :----------------: | :--------: |
|      age      | &lt;30, 30~40, >40 | a1, a2, a3 |
|     income    |  High, Medium, Low | b1, b2, b3 |
|    student    |       Yes, No      |   c1, c2   |
| credit_rating |   Fair, Excellent  |   d1, d2   |
| buys_computer |       Yes, No      |   e1, e2   |

通过上表，可以把原来的关系表转变为交易数据集。其中，

数据项集`I={a1, a2, a3, b1, b2, b3, ..., e1, e2}`

Tset =

| TID |       Itemset      |
| :-: | :----------------: |
|  1  | a1, b1, c2, d1, e2 |
|  2  | a2, b2, c2, d1, e2 |
|  3  | a1, b3, c2, d2, e2 |
| ... |        ....        |

设定了最小支持度阈值和最小可信度阈值之后，利用Apriori算法进行关联规则的提取，
得到形如```IF ... => e1 ```, ```IF ... => e2 ```的关联规则之后，可以视之为分类规则。

## 作业2：BP神经网络
