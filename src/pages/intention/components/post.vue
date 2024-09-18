<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-26 17:59:11
 * @LastEditTime : 2024-09-12 13:30:35
 * @LastEditors  : jiangronghua
 * @Description  : 招生简章
-->
<template>
  <maskLayer :isShowMask="status !== 1">
    <view class="post-main">
      <rich-text v-if="postMain.content" :nodes="postMain.content" class="text-main" />
    </view>
  </maskLayer>
</template>

<script lang="ts" setup>
import {
  getSchoolPost,
} from '@/api/collage';
import { useUserStore } from '@/store';
const userStore = useUserStore();
const { status } = storeToRefs(userStore)

const props = defineProps({
  schoolId: {
    type: String,
    default: '',
  },
});

const postMain = ref<any>({}); // 简章内容

onMounted(() => {
  getSchoolPost({ schoolId: props.schoolId }).then((res) => {
    postMain.value = res;
  });
});
</script>

<style scoped lang="scss">
.post-main {
  font-size: 20rpx !important;
  color: rgba(0, 0, 0, 0.85);
  line-height: 44rpx;
}

.text-main {
  font-size: 28rpx !important;
}
</style>
