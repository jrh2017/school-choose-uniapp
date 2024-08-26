<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 21:42:19
 * @LastEditTime : 2024-08-26 15:19:32
 * @LastEditors  : jiangronghua
 * @Description  : 意向院校组件
-->
<template>
  <div class="school">
    <view class="top">
      <schoolInfo :magorDetail="magorDetail" />
    </view>
    <view class="main">
      <up-tabs :list="list1" :current="currentIndex" lineColor="#E94650" :activeStyle="{ color: '#E94650' }" :inactiveStyle="{ color: '#8C8C8C' }" @click="tabsClickFn" />
      <!-- 拟录取分析 -->
      <view v-if="currentIndex === 0">
        <analysis :scoreStatisDetail="scoreStatisDetail" :collegeList="collegeList" @get-matriculation-record-fn="getMatriculationRecordFn" />
      </view>
    </view>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import schoolInfo from './schoolInfo.vue';
import analysis from './analysis.vue';
import {
  interviewLine,
  matriculationRecord,
  nationalLine,
  schoolScoreStatis,
} from '@/api/collage';
import { useCollege } from '@/store/index';

const props = defineProps({
  magorDetail: {
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
const collegeStore = useCollege();
const { magorDetail, level3Code, schoolId } = toRefs(props);
const {
  collegeItem,
  recruitType,
} = storeToRefs(collegeStore);
const list1 = reactive([
  { name: '拟录取分析' },
  { name: '复试/国家线' },
  { name: '考试科目' },
  { name: '招生简章' },
  { name: '院校信息' },
]);
const currentIndex = ref(0);
const scoreStatisDetail = ref({});
const collegeList = ref([]);
// 查录取与分数分布
const getSchoolScoreStatisFn = () => {
  schoolScoreStatis({
    level3Code: level3Code.value,
    schoolId: schoolId.value,
  }).then((res: any) => {
    scoreStatisDetail.value = res || {};
  });
};
// 一志愿录取名单
const getMatriculationRecordFn = () => {
  matriculationRecord({
    level3Code: level3Code.value,
    schoolId: schoolId.value,
    collegeId: collegeItem.value.collegeId,
    recruitType: recruitType.value,
  }).then((res: any) => {
    console.log(res, '一志愿录取名单');
  });
};
// 复试线,国家线
const getCurveFn = () => {
  interviewLine({
    level3Code: level3Code.value,
    schoolId: schoolId.value,
  }).then((res: any) => { // 复试线
    console.log(res, '复试线');
  });
  nationalLine({
    level3Code: level3Code.value,
  }).then((res: any) => { // 国家线
    console.log(res, '国家线');
  });
};
const tabsClickFn = (item: any, index: number) => {
  currentIndex.value = index;
  if (index === 0) {
    getMatriculationRecordFn();
  }
  if (index === 1) {
    getCurveFn();
  }
};
onMounted(() => {
  getSchoolScoreStatisFn();
  getMatriculationRecordFn();
});
watchEffect(() => {
  collegeList.value = magorDetail.value.collegeList || [];
});
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
