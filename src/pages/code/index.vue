<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-25 10:40:19
 * @LastEditTime : 2024-09-05 13:07:59
 * @LastEditors  : jiangronghua
 * @Description  : 关注页面
-->
<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="关注院校" autoBack />
    <view class="content">
      <view class="input-box">
        <up-input placeholder="请输入激活码" border="none" v-model="code"></up-input>
        <button size="small" type="default" class="btn" @click="enableCode">激 活</button>
      </view>
      <view class="mt-16rpx text-24rpx line-height-40rpx c-#A09C9E">
        下单后会收到激活码短信，如有激活问题请<text class="c-#E94650">联系客服</text>解决！
      </view>
      <view class="code-list">
        <view class="code-item" v-for="(item, index) in activeList" :key="index">
          <view class="left">
            <up-image class="logo" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/logo.png" width="96rpx"
              height="96rpx" />
          </view>
          <view class="right">
            <view class="title">{{ item.name }}</view>
            <view class="text">激活码： <text class="c-#4F4F4F">{{ item.activeCode }}</text></view>
            <view class="text">有效期至： <text class="c-#4F4F4F">{{ item.validTime }}</text></view>
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <button size="small" type="default" class="btn-buy">没有激活码？我要购买</button>
      <up-safe-bottom />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { activeCode, enableActiveCode, memberInfo } from '@/api/userinfo'
import type { UserState } from '@/store/modules/user/types';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const activeList = ref([]) // 激活码列表
const code = ref('') // 激活码输入框内容
/**
 * 获取激活码
 */
const getActiveCode = () => {
  activeCode().then(res => {
    console.log(res)
    activeList.value = res
  })
}

/**
 * 激活码激活
 */
const enableCode = () => {
  if (code.value.length === 0) {
    uni.$u.toast('请先输入激活码');
    return
  }
  enableActiveCode({ code: code.value }).then(async res => {
    uni.$u.toast('激活成功');
    getActiveCode();
    // 更新全局store
    const userinfo: UserState = await memberInfo()
    userStore.setInfo(userinfo)
  })
}

onLoad(() => {
  getActiveCode();
});
</script>

<style scoped lang="scss">
.container {
  flex: 1;
  min-height: 100vh;
}

.content {
  box-sizing: border-box;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  padding: 32rpx;

  .input-box {
    height: 104rpx;
    background-color: #ffffff;
    border-radius: 12rpx;
    border: 2rpx solid #DCDCDC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;

    .btn {
      color: #ffffff;
      background-color: #E94650;
      border-color: #E94650;
      height: 56rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 28rpx;
      color: #FFFFFF;
    }
  }
}

.btn-buy {
  width: 686rpx;
  height: 96rpx;
  background-color: #E94650;
  border-color: #E94650;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 32rpx;
  color: #FFFFFF;
  line-height: 48rpx;
  margin-top: 32rpx;
  border-radius: 48rpx;
}

.code-list {
  display: flex;
  flex-direction: column;
  margin-top: 32rpx;

  .code-item {
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-bottom: 24rpx;
    padding: 24rpx;
    display: flex;
    justify-content: space-between;
  }

  .left {
    width: 96rpx;
    height: 96rpx;
    margin-right: 24rpx;
  }

  .right {
    flex: 1;

    .title {
      font-weight: 500;
      font-size: 32rpx;
      color: #333333;
      line-height: 38rpx;
      display: flex;
      justify-content: space-between;
    }

    .text {
      margin-top: 16rpx;
      font-size: 24rpx;
      color: #BDBDBD;
      line-height: 28rpx;
    }
  }

  .status {
    font-size: 18rpx;
    background-color: #605f5f;
    padding: 2rpx 12rpx;
    box-sizing: border-box;
    color: #FFFFFF;
    border-radius: 12rpx;
  }

  .active {
    background-color: #E94650 !important;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
