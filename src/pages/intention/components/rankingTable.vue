<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 19:32:44
 * @LastEditTime : 2024-09-11 14:01:44
 * @LastEditors  : jiangronghua
 * @Description  : 意向排名表格
-->
<template>
  <view class="ranking-table">
    <view class="table">
      <view class="tr">
        <view class="th">
          年份
        </view>
        <view class="th">
          预估分/排名
        </view>
        <view class="th">
          最高分/排名
        </view>
        <view class="th">
          最低分/排名
        </view>
        <view class="th">
          建议分/排名
        </view>
      </view>
      <view v-for="(item, index) in tableData" :key="index" class="tr" style="" :class="{ active: index % 2 === 1 }">
        <view class="td">
          {{ item.year }}
        </view>
        <view class="td">
          {{ item.assessScore || '-' }}/{{ item.assessRanking || '-' }}
        </view>
        <view class="td">
          {{ item.maxScore || '-' }}/{{ item.maxRanking || '-' }}
        </view>
        <view class="td">
          {{ item.minScore || '-' }}/{{ item.minRanking || '-' }}
        </view>
        <view class="td">
          {{ item.adviceScore || '-' }}/{{ item.adviceRanking || '-' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { intentionRanking } from '@/api/collage';

const props = defineProps({
  type: {
    type: Number,
    default: 1,
  }
});

const tableData = ref([]);


// 意向专业/意向院校排名
const getIntentionRanking = async () => {
  intentionRanking({ type: props.type }).then((res: any) => {
    tableData.value = res;
  });
};

onMounted(() => {
  getIntentionRanking();
})
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-radius: 8rpx;
  display: table;
  border-collapse: collapse;
  font-size: 24rpx;

  .active {
    background: #F9F9FA;
  }

  .th {
    text-align: center;
    color: #828282;
    padding: 20rpx 0;
    font-weight: bolder;
    display: table-cell;
    background: #F9F9FA;
  }

  .td {
    text-align: center;
    padding: 20rpx 0;
    display: table-cell;
    border-bottom: 1px solid #EFEFEF;
  }

  .tr {
    display: table-row;
  }
}
</style>
