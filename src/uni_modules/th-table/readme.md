
``` html
	<template>
		<view>
			<!-- height 单元格高度  border 是否带有纵向边框 type值为type="selection" 时开启多选 loading显示加载中(默认false) emptyText 空数据时显示的文本内容-->
			<th-table :column="column" :listData="data" :checkSort="checkSort" :st="st" :sr="sr" :tdClick="tdClick" height="0.5" :stripe="true" :border="true" :loading="false">
				<!-- 具名作用域插槽 #后面写column里slot的值 -->
				<template #b="Props">
					<!-- 子组件传递的参数 整个item  -->
					<span style="color: red;">{{ Props.item.b }}</span>
				</template>
				<template #c="Props">
					<span style="color: green;" @click="log(Props.item)">{{ Props.item.c }}</span>
				</template>
				<template #a="Props">
					<div style="color: pink;">{{ Props.item.a }}</div>
					<div>{{ Props.item.e }}</div>
				</template>
			</th-table>
		</view>
	</template>
```
``` javascript
// 自定义插槽单元格点击事件
const log = (item) => {
	console.log(item)
}
import { ref } from 'vue'
// 表头配置参数
const column = ref([
	{
		title: '名称/代码',// th标题
		isSort: false, // 是否可排序
		isFixed: true, // 是否固定
		key: 'a',// 对应字段，
		width: 3, // 宽度 width * 100 rpx,
		slot: 'a'

	},
	{
		title: '股份金额(万)',// th标题
		isSort: true, // 是否可排序
		isFixed: false, // 是否固定
		key: 'b', // 对应字段
		slot: 'b' // 插槽名
	},
	{
		title: '股份数量(股)',// th标题
		isSort: true, // 是否可排序
		isFixed: false, // 是否固定
		key: 'c', // 对应字段
		slot: 'c' // 插槽名
	},
	{
		title: '增减持均价(元)',// th标题
		isSort: false, // 是否可排序
		isFixed: false, // 是否固定
		key: 'd'
	},
	{
		title: '最新价(元)',// th标题
		isSort: false, // 是否可排序
		isFixed: false, // 是否固定
		key: 'f2'
	},
	{
		title: '涨跌幅',// th标题
		isSort: true, // 是否可排序
		isFixed: false, // 是否固定
		key: 'f3'
	},

])
// 表身数据
const data = ref([])
// 排序字段
const st = ref('b')
// sr 排序 1降序 -1升序
const sr = ref(-1)
// 切换排序事件 name:column里面的key type 排序 1降序 -1 升序
const checkSort = (name, type) => {
	console.log(1);
	st.value = name
	sr.value = type
}
// 行点击事件 可不传 默认参数: 整行数据
const tdClick = (item) => {
	console.log(item);
}
// 模拟请求数据
setTimeout(() => {
	data.value = [
		{
			"e": "600521",
			"a": "华海药业",
			"b": "4444.26",
			"c": "285.00万",
			"d": "15.59",
			"f2": "15.39",
			"f3": 0.79,
		},
		{
			"e": "600817",
			"a": "宇通重工",
			"b": "4199.74",
			"c": "438.92万",
			"d": "9.57",
			"f2": "9.75",
			"f3": 0.31,
		},
		{
			"e": "300896",
			"a": "爱美客",
			"b": "3948.31",
			"c": "12.01万",
			"d": "328.75",
			"f2": "282.46",
			"f3": 1.72,
		},
		{
			"e": "601619",
			"a": "嘉泽新能",
			"b": "3519.69",
			"c": "984.06万",
			"d": "3.58",
			"f2": "3.44",
			"f3": 0.29,
		},
		{
			"e": "002408",
			"a": "齐翔腾达",
			"b": "2813.75",
			"c": "484.23万",
			"d": "5.81",
			"f14": "齐翔腾达",
			"f2": "5.39",
			"f3": 0.37,
		}
	]
}, 500)

```