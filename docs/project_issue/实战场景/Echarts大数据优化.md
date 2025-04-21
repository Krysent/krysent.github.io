# Echarts 大数据优化方案
实际场景中会遇到一些大量数据，比如10w+，如何优化处理页面卡顿呢

## 数据分段加载（dataZoom）
echarts内置的配置
```js
dataZoom:[{
    type:'slider',
    xAxisIndex:[0],
    start:0,//数据窗口范围起始百分比
    end:2,//数据窗口范围结束百分比
    minSpan:0,//窗口大小最小值
    maxSpan:20  //窗口大小最大值
}]

```


## 降采样策略（Sampling）

```js
series:[{
    ...,
    sampling:'lttb' ,//最大程度保证采样后线条的趋势，形状和极值
}]

```