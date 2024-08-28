<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-22 19:23:54
 * @LastEditTime : 2024-08-28 09:13:59
 * @LastEditors  : jiangronghua
 * @Description  : 院校详情页面
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="院校专业详情"
      autoBack
    />
    <School :majorDetail="majorDetail" :level3Code="level3Code" :schoolId="schoolId" />
  </view>
</template>

<script lang="ts" setup>
import School from '../components/school.vue';
import {
  schoolMajorDetail,
} from '@/api/collage';

const level3Code = ref(''); // 第三级code
const schoolId = ref('');
const majorDetail = ref({});
const getScoolDetailFn = () => {
  schoolMajorDetail({
    level3Code: level3Code.value,
    schoolId: schoolId.value,
  }).then((res: any) => {
    console.log(res, 'res');
    majorDetail.value = res || {};
  });
};
onLoad((options: any) => {
  if (options?.level3Code) { // 学校库-专业-院校详情页面
    level3Code.value = options.level3Code;
    schoolId.value = options.schoolId;
    getScoolDetailFn();
  }
});
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
}
</style>
