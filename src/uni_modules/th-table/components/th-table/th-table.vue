<template>
	<uni-table :loading="loading" :border="border" :stripe="stripe" :emptyText="emptyText ? emptyText : '暂无更多数据'" :type="type">
		<uni-tr>
			<uni-th v-for="item in column " :align="item.align || 'center'"
				:style="{ position: item.isFixed ? 'sticky' : '', left: item.fixedW || 0, background: '#F7F8FA', zIndex: item.isFixed ? '1' : '', width: `${item.width * 100}rpx`, minHeight: '70rpx' }"
				style="font-size: 26rpx;"
				:class="[item.isSort ? 'sortDefault' : '', item.key == st ? (sr == -1 ? 'sortBottom' : 'sortTop') : '']"
				@click="item.isSort ? checkSort(item.key, item.key === st ? (sr === -1 ? 1 : -1) : -1) : ''">

				<view class="span">{{ item.title }}</view>
			</uni-th>
		</uni-tr>

		<uni-tr v-for="item in listData" :key="item.SECURITY_CODE">
			<uni-td v-for="item1, index in column" :key="index"
				:style="{ position: item1.isFixed ? 'sticky' : '', left: item1.fixedW || 0, background: '#fff', zIndex: item1.isFixed ? '1' : '', height: `${height * 100}rpx`, minHeight: '80rpx' }"
				:align="item.align || 'center'" @click="tdClick(item)">
				<template v-if="item1.slot">
					<slot :item="item" :name="item1.slot"></slot>
				</template>
				<template v-else>
					{{ item[item1.key] }}
				</template>
			</uni-td>
		</uni-tr>
	</uni-table>
</template>

<script setup>
const props = defineProps({
	stripe: Boolean,
	border: Boolean,
	column: Array,
	listData: Array,
	checkSort: Function,
	tdClick: Function,
	st: String,
	sr: Number,
	loading: Boolean,
	height:String,
	type:String
})

</script>

<style lang="scss" scoped>
.sortDefault {
	.span {
		position: relative;
	}

	.span::after {
		position: absolute;
		/* display: inline-block; */
		content: '';
		right: 20rpx;
		bottom: 0;
		border-bottom: 10rpx solid #999;
		border-left: 10rpx solid transparent;
	}
}

.sortBottom,
.sortTop {
	.span {
		position: relative;
		color: #ff9900;
	}

	.span::after {
		right: 20rpx;
		top: 50%;
		bottom: initial;
		transform: translateY(-50%);
		border: none;
	}
}

.sortBottom {
	.span::after {
		content: '↓';
	}
}

.sortTop {
	.span::after {
		content: '↑';
	}
}
</style>