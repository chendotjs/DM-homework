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
得到形如`IF ... => e1`, `IF ... => e2`的关联规则之后，可以视之为分类规则。

## 作业2：K-means算法

采用数据集 [2015-2016英超积分榜](https://github.com/openfootball/eng-england/tree/master/2015-16)

### Standings

                                            - Home -          - Away -            - Total -
                                     Pld   W  D  L   F:A     W  D  L   F:A      F:A   +/-  Pts
     1. Leicester City                38  12  6  1  35:18   11  6  2  33:18    68:36  +32   81
     2. Arsenal                       38  12  4  3  31:11    8  7  4  34:25    65:36  +29   71
     3. Tottenham Hotspur             38  10  6  3  35:15    9  7  3  34:20    69:35  +34   70
     4. Manchester City               38  12  2  5  47:21    7  7  5  24:20    71:41  +30   66
     5. Manchester United             38  12  5  2  27:9     7  4  8  22:26    49:35  +14   66
     6. Southampton                   38  11  3  5  39:22    7  6  6  20:19    59:41  +18   63
     7. West Ham United               38   9  7  3  34:26    7  7  5  31:25    65:51  +14   62
     8. Liverpool                     38   8  8  3  33:22    8  4  7  30:28    63:50  +13   60
     9. Stoke City                    38   8  4  7  22:24    6  5  8  19:31    41:55  -14   51
    10. Chelsea                       38   5  9  5  32:30    7  5  7  27:23    59:53   +6   50
    11. Everton                       38   6  5  8  35:30    5  9  5  24:25    59:55   +4   47
    12. Swansea                       38   8  6  5  20:20    4  5 10  22:32    42:52  -10   47
    13. Watford                       38   6  6  7  20:19    6  3 10  20:31    40:50  -10   45
    14. West Bromwich Albion          38   6  5  8  20:26    4  8  7  14:22    34:48  -14   43
    15. Crystal Palace                38   6  3 10  19:23    5  6  8  20:28    39:51  -12   42
    16. Bournemouth                   38   5  5  9  23:34    6  4  9  22:33    45:67  -22   42
    17. Sunderland                    38   6  6  7  23:20    3  6 10  25:42    48:62  -14   39
    18. Newcastle United              38   7  7  5  32:24    2  3 14  12:41    44:65  -21   37
    19. Norwich                       38   6  5  8  26:30    3  2 14  13:37    39:67  -28   34
    20. Aston Villa                   38   2  5 12  14:35    1  3 15  13:41    27:76  -49   17

* * *

Pld = Matches; W = Matches won; D = Matches drawn; L = Matches lost; F = Goals for; A = Goals against; +/- = Goal differencence; Pts = Points

### 实现

将主客场因素考虑进来，找出成绩与主客场风格相近的球队。

因为进球数失球数比比赛场数要大，所以在计算时对进球失球数乘上一个系数0.3参与距离的运算。

### 结果
将结果分为3类，队名前面的数字表示球队赛季的最终排名，结果如下：
```

[ ' 9.Stoke City',
  '10.Chelsea',
  '11.Everton',
  '14.West Bromwich Albion',
  '15.Crystal Palace',
  '16.Bournemouth' ]
----------------
[ ' 1.Leicester City',
  ' 2.Arsenal',
  ' 3.Tottenham Hotspur',
  ' 4.Manchester City',
  ' 5.Manchester United',
  ' 6.Southampton',
  ' 7.West Ham United',
  ' 8.Liverpool' ]
----------------
[ '12.Swansea',
  '13.Watford',
  '17.Sunderland',
  '18.Newcastle United',
  '19.Norwich',
  '20.Aston Villa' ]
----------------

```
可见，结果确实将整个赛季的结果分为上中下游。
