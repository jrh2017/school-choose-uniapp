<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 13:18:42
 * @LastEditTime : 2024-07-20 14:14:42
 * @LastEditors  : jiangronghua
 * @Description  :
-->
<template>
  <view class="steps">
    <view v-for="(item, index) in process" :key="index" class="step-item" :class="{ 'process-passed': index < activeIndex, 'process-active': index === activeIndex }">
      <view class="name">
        {{ item.name }}
      </view>
      <view class="doit pos-relative">
        <view class="line" />
        <view class="circle-wrap">
          <view class="circle" />
        </view>
      </view>
      <view class="date">
        {{ dayjs(item.startDate).format('M.DD') }}-{{ dayjs(item.endDate).format('M.DD') }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
const today = dayjs('2024-10-01');
const activeIndex = ref(0);
const process = reactive([
  {
    name: '填写报名',
    startDate: '2024-07-10',
    endDate: '2024-09-27',
  },
  {
    name: '预报名',
    startDate: '2024-09-28',
    endDate: '2024-10-08',
  },
  {
    name: '正式报名',
    startDate: '2024-10-09',
    endDate: '2024-10-25',
  },
  {
    name: '确认报名',
    startDate: '2024-10-25',
    endDate: '2024-11-05',
  },
  {
    name: '准考证打印',
    startDate: '2024-11-06',
    endDate: '2024-12-05',
  },
]);

onMounted(() => {
  process.forEach((item, index) => {
    const start = dayjs(item.startDate);
    const end = dayjs(item.endDate);
    if (today.isBetween(start, end)) {
      activeIndex.value = index;
    }
  });
});
</script>

<style scoped lang="scss">
.steps {
  display: flex;
  overflow-x: scroll;
  .step-item {
    min-width: 150rpx;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    .name {
      padding: 20rpx 25rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: rgba(0,0,0,0.85);
      line-height: 44rpx;
      border-radius: 8rpx;
    }
    .doit {
      margin-top: 20rpx;
      margin-bottom: 40rpx;
      width: 100%;
      .line {
        height: 4rpx;
        width: 100%;
        background-color: #D4D4D4;
      }
      .circle-wrap {
        width: 20rpx;
        height: 20rpx;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -10rpx;
        margin-top: -10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .circle {
          width: 12rpx;
          height: 12rpx;
          background-color: #D4D4D4;
          border-radius: 50%;
        }
      }
    }
    .date {
      font-size: 24rpx;
      color: rgba(0,0,0,0.45);
      line-height: 36rpx;
    }
  }
  .process-active {
    .name {
      background-color: #FE6567;
      color: #fff;
    }
    .doit {
      .line {
        background-color: #FE6567;
      }
      .circle-wrap {
        .circle {
          background-color: #FE6567;
        }
      }
    }
    .date {
      color: #FE6567;
    }
  }
  .process-passed {
    .name {
      color: #FE6567;
    }
    .doit {
      .line {
        background-color: #FE6567;
      }
      .circle-wrap {
        .circle {
          background-color: #FE6567;
        }
      }
    }
  }
}
</style>
