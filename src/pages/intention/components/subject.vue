<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-26 17:40:04
 * @LastEditTime : 2024-08-26 18:55:10
 * @LastEditors  : jiangronghua
 * @Description  : 考试科目
-->
<template>
  <view class="subject-main">
    <view v-for="(item, index) in subjectList" :key="index" class="subject-cell">
      <view class="subject-name">
        {{ item.collegeName }}
      </view>
      <view class="subject-item">
        <view class="label">
          研究方向:
        </view>
        <view>{{ item.researchArea }}</view>
      </view>
      <view class="subject-item">
        <view class="label">
          初始科目:
        </view>
        <rich-text :nodes="item.examSubject" />
      </view>
      <view class="subject-item">
        <view class="label">
          参考书目:
        </view>
        <view>{{ item.examBook }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {
  enrollPlan,
} from '@/api/collage';

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

const subjectList = ref([]);

// 复试线,国家线
const getCurveFn = () => {
  enrollPlan({
    level3Code: props.level3Code,
    schoolId: props.schoolId,
  }).then((res: any) => { // 复试线
    subjectList.value = res;
  });
};

onMounted(() => {
  getCurveFn();
});
</script>

<style lang="scss" scoped>
.subject-cell {
  padding: 32rpx;
  background: rgba(246,245,248,0.65);
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  color: rgba(0,0,0,0.85);
  .subject-name {
    font-weight: 500;
    font-size: 32rpx;
    line-height: 48rpx;
    margin-bottom: 24rpx;
  }
  .subject-item {
    font-size: 28rpx;
    line-height: 44rpx;
    margin-bottom: 24rpx;
    .label {
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 44rpx;
    }
  }
}
</style>
