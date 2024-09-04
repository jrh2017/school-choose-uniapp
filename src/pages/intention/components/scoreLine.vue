<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-26 17:40:04
 * @LastEditTime : 2024-09-04 08:10:00
 * @LastEditors  : jiangronghua
 * @Description  : 国家线
-->
<template>
  <div>
    <view class="ranking-table">
      <view class="title">
        复试线
      </view>
      <maskLayer :isShowMask="true">
        <view class="table">
          <view class="tr">
            <view class="th" style="width: 25%;">
              科目/年份
            </view>
            <view class="th">
              2024
            </view>
            <view class="th">
              2023
            </view>
            <view class="th">
              2022
            </view>
          </view>
          <view v-for="(item, index) in tableSchoolData" :key="index" class="tr" style=""
            :class="{ active: index % 2 === 1 }">
            <view class="td">
              {{ item.name }}
            </view>
            <view class="td">
              {{ item[2024] }}
            </view>
            <view class="td">
              {{ item[2023] }}
            </view>
            <view class="td">
              {{ item[2022] }}
            </view>
          </view>
        </view>
      </maskLayer>
    </view>
    <view class="ranking-table">
      <view class="title">
        国家线
      </view>
      <view class="tips">
        <text>单科=100: 满分为100的科目，即英语和政治</text>
        <text>单科>100: 满分大于100的科目，即专业课一和专业课二</text>
      </view>
      <view class="table">
        <view class="tr">
          <view class="th" style="width: 35%;">
            科目
          </view>
          <view class="th">
            2024
          </view>
          <view class="th">
            2023
          </view>
          <view class="th">
            2022
          </view>
        </view>
        <view v-for="(item, index) in tableCountryData" :key="index" class="tr" style=""
          :class="{ active: index % 2 === 1 }">
          <view class="td">
            {{ item.name }}
          </view>
          <view class="td">
            {{ item[2024] }}
          </view>
          <view class="td">
            {{ item[2023] }}
          </view>
          <view class="td">
            {{ item[2022] }}
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script lang="ts" setup>
import {
  interviewLine,
  nationalLine,
} from '@/api/collage';
import maskLayer from '@/components/mask-layer/mask-layer.vue'
const props = defineProps({
  level3Code: {
    type: String,
    default: '',
  },
  schoolId: {
    type: String,
    default: '',
  },
});

const tableCountryData = ref([]);
const tableSchoolData = ref([]);

// 复试线,国家线
const getCurveFn = () => {
  interviewLine({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
  }).then((res: any) => { // 复试线
    const list: any = [{ name: '初试总成绩' }, { name: '政治' }, { name: '英语' }, { name: '专业课一' }, { name: '专业课二' }];
    res?.forEach((item: any) => {
      list[0][item.year] = item.total;
      list[1][item.year] = item.politics;
      list[2][item.year] = item.english;
      list[3][item.year] = item.specialOne;
      list[4][item.year] = item.specialTwo;
    });
    tableSchoolData.value = list;
  });
  nationalLine({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
  }).then((res: any) => { // 国家线
    const list: any = [{ name: '初试总成绩' }, { name: '单科=100' }, { name: '单科>100' }];
    res?.forEach((item: any) => {
      list[0][item.year] = item.scoreTotal;
      list[1][item.year] = item.scoreSingle1;
      list[2][item.year] = item.scoreSingle2;
    });
    tableCountryData.value = list;
  });
};

onMounted(() => {
  getCurveFn();
});
</script>

<style lang="scss" scoped>
.ranking-table {
  margin-bottom: 16rpx;

  .title {
    font-weight: 500;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 48rpx;
    margin-bottom: 16rpx;
  }

  .tips {
    background: #F2F2F7;
    border-radius: 16rpx;
    padding: 16rpx 24rpx;
    display: flex;
    flex-direction: column;
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.65);
    line-height: 40rpx;
    margin-bottom: 16rpx;
  }
}

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
