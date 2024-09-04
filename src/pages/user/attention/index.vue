<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-07-25 10:40:19
 * @LastEditTime : 2024-09-04 08:30:36
 * @LastEditors  : jiangronghua
 * @Description  : 关注页面
-->
<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="关注院校" autoBack />
    <view class="content">
      <view class="list-wrapper">
        <view v-for="(item, index) in dataList" :key="index" class="school-item">
          <view class="top">
            <view class="top-left">
              <up-image :src="`https://ypdsc.oss-cn-shanghai.aliyuncs.com/app/${item.schoolId}.jpg`" width="100rpx"
                height="100rpx" />
              <view class="school-info">
                <view class="school-name">
                  <text>{{ item.schoolName }}</text>
                </view>
                <view class="tags">
                  <view class="tag tag-1">
                    {{ item.typeName }}
                  </view>
                  <view v-if="item.is985 === 1" class="tag tag-2">
                    985
                  </view>
                  <view v-if="item.is211 === 1" class="tag tag-2">
                    211
                  </view>
                  <view v-if="item.subjectRanking" class="tag tag-3">
                    {{ item.subjectRanking }}
                  </view>
                </view>
              </view>
            </view>
            <up-image class="edit-icon" :src="item.collected === 1 ? star : unstar" width="40rpx" height="40rpx"
              @click="changeCollecte(item)" />
          </view>
          <view class="bottom">
            <view class="detail-item flex justify-between">
              <view class="item left">
                <view class="label">
                  专业:
                </view>
                <text>{{ item.level3Name }}({{ item.level3Code }})</text>
              </view>
              <view class="item right">
                <view class="label">
                  学位类型:
                </view>
                <text>{{ item.degreeType }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { listMajorCollege, majorCollegeSave } from '@/api/userinfo';

const dataList = ref<any[]>([]); // 存放请求回来的数据
const star = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/star.png');
const unstar = ref('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/unstar.png');

/**
 * 请求院校信息
 * @param pageNo
 * @param pageSize
 */
function queryList() {
  listMajorCollege().then((res) => {
    dataList.value = res;
  });
}

/**
 * 切换收藏状态
 */
const changeCollecte = (school: any) => {
  const action = school.collected === 1 ? 2 : 1;
  const params = {
    action,
    schoolId: school.schoolId,
    level3Code: school.level3Code,
  };
  majorCollegeSave(params).then(() => {
    school.collected = action;
  });
};

onLoad(() => {
  queryList();
});
</script>

<style scoped lang="scss">
.container {
  flex: 1;
}

.content {
  min-height: 1000rpx;
  box-sizing: border-box;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #F6F5F8 100%);
}

.list-wrapper {
  padding: 0 32rpx;

  .school-item {
    padding: 32rpx;
    border-radius: 16rpx;
    background: #FFFFFF;
    margin-bottom: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ::v-deep .u-iconfont {
        color: #E94650 !important;
      }

      .top-left {
        display: flex;
      }

      .btn-right {
        padding: 12rpx 16rpx;
        border-radius: 8rpx;
        font-weight: 600;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.25);
      }

      .selected {
        background: #F2F2F7;
      }

      .unselected {
        background: rgba(252, 227, 229, 0.4);
      }

      .school-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 24rpx;
        height: 100rpx;
      }

      .school-name {
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 48rpx;
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
}
</style>
