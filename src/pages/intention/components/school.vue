<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 21:42:19
 * @LastEditTime : 2024-09-01 10:37:51
 * @LastEditors  : jiangronghua
 * @Description  : 意向院校组件
-->
<template>
  <div class="school">
    <view class="top">
      <schoolInfo :majorDetail="majorDetail" />
    </view>
    <view class="main">
      <up-tabs :list="list1" :current="currentIndex" lineColor="#E94650" :activeStyle="{ color: '#E94650' }"
        :inactiveStyle="{ color: '#8C8C8C' }" @click="tabsClickFn" />
      <!-- 拟录取分析 -->
      <view v-if="currentIndex === 0">
        <analysis :majorDetail="majorDetail" :level3Code="level3Code" :schoolId="schoolId" />
      </view>
      <view v-if="currentIndex === 1">
        <scoreLine :level3Code="level3Code" :schoolId="schoolId" />
      </view>
      <view v-if="currentIndex === 2">
        <subject :level3Code="level3Code" :schoolId="schoolId" />
      </view>
      <view v-if="currentIndex === 3">
        <post :schoolId="schoolId" />
      </view>
      <view v-if="currentIndex === 4">
        <collageInfo :schoolId="schoolId" />
      </view>
    </view>
  </div>
</template>

<script setup lang="ts">
import schoolInfo from './schoolInfo.vue';
import analysis from './analysis.vue';
import scoreLine from './scoreLine.vue';
import post from './post.vue';
import subject from './subject.vue';
import collageInfo from './collageInfo.vue';

const props = defineProps({
  majorDetail: {
    type: Object,
    default: () => ({}),
  },
  level3Code: {
    type: String,
    default: '',
  },
  schoolId: {
    type: String,
    default: '',
  },
});
const { majorDetail, level3Code, schoolId } = toRefs(props);

const list1 = reactive([
  { name: '拟录取分析' },
  { name: '复试/国家线' },
  { name: '考试科目' },
  { name: '招生简章' },
  { name: '院校信息' },
]);
const currentIndex = ref(0);

const tabsClickFn = (item: any, index: number) => {
  currentIndex.value = index;
};
</script>

<style scoped lang="scss">
.school {
  .top {
    padding: 0 32rpx;
  }

  .main {
    margin-top: 32rpx;
    background-color: #ffffff;
    padding: 32rpx;
  }
}
</style>
