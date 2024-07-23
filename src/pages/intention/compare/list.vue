<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-23 08:16:30
 * @LastEditTime : 2024-07-23 16:09:23
 * @LastEditors  : jiangronghua
 * @Description  : 择校对比列表
-->
<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="择校对比"
      autoBack
    />
    <view class="op-box">
      <view v-if="isEdit" class="select">
        <text class="btn-text !color-#E94650" @click="selectAllItem">
          全选
        </text>
        <text class="btn-text" @click="closeManage">
          取消
        </text>
      </view>
      <view v-else class="manage">
        <view class="add-btn">
          <up-icon name="plus" space="20rpx" labelColor="#E94650" label="添加院校专业" />
        </view>
        <text class="btn-text" @click="openManage">
          管理
        </text>
      </view>
    </view>
    <view class="content w-100%">
      <view class="scrool-main">
        <scroll-view style="height: 100%;" scroll-y="true" :scroll-top="scrollTop" @scroll="onScroll">
          <up-checkbox-group v-model="selectedSchools">
            <view v-for="(school, index) in schoolList" :key="index" class="school-info">
              <view class="checkbox">
                <up-checkbox activeColor="red" :name="school.id" />
              </view>
              <view class="right-info">
                <view class="top">
                  <up-image class="logo" :src="school.logo" width="96rpx" height="96rpx" />
                  <view class="right">
                    <view class="school-name">
                      <text>{{ school.name }}</text>
                      <up-image class="edit-icon" :src="school.star ? star : unstar" width="40rpx" height="40rpx" @click="school.star = !school.star" />
                    </view>
                    <view class="tags">
                      <view class="tag tag-1">
                        {{ school.tag1 }}
                      </view>
                      <view v-for="(tag, tindex) in school.tag2" :key="tindex" class="tag tag-2">
                        {{ tag }}
                      </view>
                      <view class="tag tag-3">
                        {{ school.tag3 }}
                      </view>
                    </view>
                  </view>
                </view>
                <view class="bottom">
                  <view class="detail-item flex justify-between">
                    <view class="item left">
                      <view class="label">
                        专业:
                      </view>
                      <text>{{ school.major }}({{ school.majorCode }})</text>
                    </view>
                    <view class="item right">
                      <view class="label">
                        学位类型:
                      </view>
                      <text>{{ school.type }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="h-2rpx" />
          </up-checkbox-group>
        </scroll-view>
      </view>
    </view>
    <view class="bottom-box">
      <button
        v-if="isEdit"
        size="default"
        type="warn"
        class="btn-start"
        :disabled="selectedSchools.length === 0"
        @click="openConfirm"
      >
        删除
      </button>
      <button v-else size="default" type="warn" class="btn-start" :disabled="selectedSchools.length === 0">
        开始对比({{ selectedSchools.length }}/{{ schoolList.length }})
      </button>
    </view>
    <up-safe-bottom />
  </view>
</template>

<script setup lang="ts">
import { deepClone } from 'uview-plus';

const isEdit = ref(false);
const star = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/star.png');
const unstar = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/unstar.png');
const schoolList = ref<any>([]);
const selectedSchools = ref<any>([]);
const scrollTop = ref(0);
const oldScrollTop = ref(0);

const onScroll = (e: any) => {
  oldScrollTop.value = e.detail.scrollTop;
};
const schoolInfo = {
  name: '上海交通大学',
  logo: 'https://static.kaoyan.cn/image/logo/470_log.jpg',
  major: '应用心理',
  majorCode: '025872',
  type: '学术学位',
  score: 400,
  tag1: '综合类',
  tag2: ['985', '211'],
  tag3: 'A+',
  editAble: true,
  star: false,
  id: 0,
};

/**
 * 删除学校
 */
const deleteSchools = () => {
  const newList = schoolList.value.filter((item: any) => !selectedSchools.value.includes(item.id));
  schoolList.value = newList;
  selectedSchools.value = [];
};

/**
 * 实现滚动到顶部
 */
const scrollToTop = () => {
  scrollTop.value = oldScrollTop.value;
  nextTick(() => {
    scrollTop.value = 0;
  });
};

/**
 * 打开管理界面
 */
const openManage = () => {
  scrollToTop();
  selectedSchools.value = [];
  isEdit.value = true;
};

/**
 * 管理管理界面
 */
const closeManage = () => {
  scrollToTop();
  selectedSchools.value = [];
  isEdit.value = false;
};

/**
 * 全选所有学校
 */
const selectAllItem = () => {
  selectedSchools.value = schoolList.value.map((item: any) => item.id);
};

/**
 * 打开删除确认
 */
const openConfirm = () => {
  uni.showModal({
    title: '删除确认',
    content: '确定要删除所选学校吗？',
    success: (res) => {
      if (res.confirm) {
        deleteSchools();
      }
    },
  });
};

onLoad(() => {
  for (let i = 0; i < 10; i++) {
    const copy = deepClone(schoolInfo);
    copy.id = i;
    schoolList.value.push(copy);
  }
});
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
  flex: 1;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 1 auto;
  position: relative;
  .scrool-main {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding: 0 32rpx;
    box-sizing: border-box;
  }
}
.op-box {
  padding: 0 32rpx;
  height: 112rpx;
  display: flex;
  align-items: center;
  .btn-text {
    font-size: 32rpx;
    color: #252424;
    line-height: 48rpx;
  }
  .select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .manage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .add-btn {
      width: 400rpx;
      height: 64rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: #E94650;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFFFFF;
      border-radius: 32rpx;
      ::v-deep .u-iconfont {
        color: #E94650 !important;
      }
    }
  }
}
.school-info {
  padding: 32rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  width: 100%;
  .checkbox {
    width: 60rpx;
    flex-shrink: 0;
  }
  .right-info {
    flex: 1;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      flex-shrink: 0;
    }
    .right {
      flex: 1;
      margin-left: 24rpx;
      height: 96rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .school-name {
      display: flex;
      justify-content: space-between;
    }
    .tags {
      display: flex;
    }
    .tag {
      padding: 4rpx 8rpx;
      border-radius: 4rpx;
      font-size: 20rpx;
      margin-right: 16rpx;
    }
    .tag-1 {
      color: #E94650;
      background-color: #FFECEB;
    }
    .tag-2 {
      color: #4D59FF;
      background-color: #EBEFFF;
    }
    .tag-3 {
      color: #0EAEB4;
      background-color: #E0F8F5;
    }
  }
  .bottom {
    margin-top: 24rpx;
    background-color: #F9F9FA;
    border-radius: 8rpx;
    padding: 16rpx 24rpx;
    font-size: 24rpx;
    line-height: 36rpx;
  }
  .detail-item {
    margin: 4rpx 0;
    .left {
      flex: 6;
      flex-shrink: 0;
    }
    .right {
      flex: 4;
      flex-shrink: 0;
    }
    .item {
      display: flex;
    }
    .label {
      color: #898989;
      margin-right: 10rpx;
    }
  }
}
.bottom-box {
  padding: 24rpx 64rpx;
  background: #FFFFFF;
  box-shadow: -10px 0 rgba(0,0,0,0.1);
  .btn-start {
    border-radius: 40rpx;
    color:#ffffff;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
}
</style>
