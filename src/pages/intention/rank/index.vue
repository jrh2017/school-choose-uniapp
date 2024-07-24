<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-20 17:56:35
 * @LastEditTime : 2024-07-24 13:29:42
 * @LastEditors  : jiangronghua
 * @Description  : 学校排行榜
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="大学排名"
      autoBack
    />
    <view class="content">
      <view class="search-wrapper">
        <view class="search-box">
          <up-search shape="square" bgColor="#FFFFFF" :showAction="false" height="88rpx" placeholder="请输入院校名称" />
        </view>
      </view>
      <view class="condition-wrapper">
        <view class="subsection">
          <up-subsection :list="list" :current="currentIndex" mode="subsection" activeColor="#e94650" />
        </view>
        <view class="table-box">
          <view class="left">
            <SchoolRank />
          </view>
          <view class="right">
            <SchoolRank title="软科" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import SchoolRank from '../components/schoolRank.vue';

const list = ref(['中国排名', '世界排名']); // subsection分段
const currentIndex = ref(0); // 当前选择的分段
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  box-sizing: border-box;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
  display: flex;
  flex-direction: column;
  .search-wrapper {
    padding: 24rpx 32rpx;
  }
  .condition-wrapper {
    flex: 1;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    .subsection {
      padding: 32rpx;
    }
  }
  .table-box {
    background-color: #ffffff;
    display: flex;
    flex: 1;
    .left {
      flex:1;
      flex-shrink: 1;
    }
    .right {
      flex:1;
      flex-shrink: 1;
    }
  }
}
</style>
