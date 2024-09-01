<template>
  <web-view class="h-full" :src="url" />
</template>

<script setup lang="ts">
const url = ref<string>('');

onLoad((params: any) => {
  if (params.url) {
    const linkUrl =
      "https://mp.weixin.qq.com/s?__biz=MzkyODYwMzQ3NQ==&mid=2247483659&idx=1&sn=77afd5cdcc89efe45eef8657c99d22ee&chksm=c2170d37f5608421fa03b7faba0d66af1bb3d8e055ce088667de7f0f4eb348a61285ab200ab3#rd";
    url.value = linkUrl;
    console.log(url.value, '--->');
  }
});
</script>
