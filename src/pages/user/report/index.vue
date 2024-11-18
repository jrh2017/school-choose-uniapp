<!--
 * @Author       : jiangronghua 613870505@qq.com
 * @Date         : 2024-08-27 15:28:59
 * @LastEditTime : 2024-09-20 11:32:19
 * @LastEditors  : jiangronghua
 * @Description  : 我的报告列表页面
-->
<template>
  <view class="container">
    <view class="content">
      <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
        <template #top>
          <up-navbar :placeholder="true" bg-color="#F8EFF2" title="我的报告" autoBack />
        </template>
        <view class="list-wrapper">
          <view v-for="(item, index) in dataList" :key="index" class="report-item" @click="handleClick(item)">
            <view v-if="item.status === 2" class="report-status">
              <!-- <up-image src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/icon-warning.png" class="icon"
                width="44rpx" height="44rpx" /> -->
              <view class="report-status-text">
                生成失败：{{ item.failedReason }}
              </view>
            </view>
            <view class="report-conteng p-32rpx">
              <view class="report-title">
                <view class="report-title-left">
                  个人择校报告
                  <view class="report-date">
                    {{ dayjs(item.createTime).format('YYYY-MM-DD') }}
                  </view>
                </view>
                <view class="report-title-right">
                  <text v-if="item.status === 0">生成中...</text>
                  <template v-if="item.status === 1">
                    <text>详情</text>
                    <up-icon name="arrow-right" />
                  </template>
                </view>
              </view>
              <view class="report-cell">
                <view class="report-cell-line">
                  <view class="label">
                    目标专业：
                  </view>
                  <view class="value">
                    {{ item.level3Name }}({{ item.level3Code }})
                  </view>
                </view>
                <view class="report-cell-line">
                  <view class="label">
                    预估分数：
                  </view>
                  <view class="value">
                    {{ item.assessScore }}
                  </view>
                </view>
                <view class="report-cell-line">
                  <view class="label">
                    学习方式：
                  </view>
                  <view class="value">
                    {{ recruitTypeList[item.recruitTypeIndex] }}
                  </view>
                </view>
                <view class="report-cell-line">
                  <view class="label">
                    院校水平：
                  </view>
                  <view class="value">
                    {{ item.schoolLevelStr }}
                  </view>
                </view>
                <view class="report-cell-line">
                  <view class="label">
                    报考省份：
                  </view>
                  <view class="value">
                    {{ item.provinces }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type zPaging from 'z-paging/components/z-paging/z-paging.vue';
import { reportList } from '@/api/choice';

const pagingRef = ref<InstanceType<typeof zPaging> | null>(null); // 实例化z-paging组件的ref
const dataList = ref<any[]>([]); // 存放请求回来的数据

const recruitTypeList = ['不限', '全日制', '非全日制']; // 存放报考类型列表
const schoolLevelList = ['不限', '985', '211', '双一流', '普通院校']; // 存放院校层次列表
let timeout // 设置定时器，如果返回的结果中存在生成报告中的状态需要隔5秒重新获取一次

/**
 * 请求院校信息
 * @param pageNo
 * @param pageSize
 */
function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo, '[ pageSize ] >', pageSize);
  const params = {
    length: 10,
    start: (pageNo - 1) * 10,
  };
  reportList(params).then((res: any) => {
    const list = res.data;
    list?.forEach((item: any) => {
      const schoolLevel = item.schoolLevel.split(',');
      let schoolLevelIndexList: number[] = [];
      const schoolLevelStrList: string[] = [];
      schoolLevel.forEach((item: string) => {
        schoolLevelIndexList.push(Number(item));
      });
      schoolLevelIndexList = schoolLevelIndexList.sort((a: number, b: number) => a - b);
      // 0表示不限,只要包含不限，显示的时候只显示不限
      if (schoolLevelIndexList.includes(0)) {
        schoolLevelIndexList = [0];
      }
      schoolLevelIndexList?.forEach((item: number) => {
        schoolLevelStrList.push(schoolLevelList[item].toString());
      });
      item.recruitTypeIndex = Number(item.recruitType);
      item.schoolLevelStr = schoolLevelStrList.join(',');
    });
    const listReporting = list.filter((item: any) => item.status === 0);
    if (listReporting.length > 0) {
      timeout = setTimeout(() => {
        pagingRef.value.reload();
      }, 20000);
    }
    pagingRef.value?.complete(list);
  }).catch(() => {
    pagingRef.value.complete(false);
  });
}

/**
 * 点击跳转到报告详情页
 */
const handleClick = (item: any) => {
  // 只有已经生成成功的报告可以跳转
  if (item.status === 1) {
    uni.navigateTo({
      url: `/pages/user/report/detail?id=${item.id}`,
    });
  }
}

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

  .report-item {
    background: #FFFFFF;
    border-radius: 24rpx;
    margin-bottom: 24rpx;
    overflow: hidden;
  }

  .report-status {
    height: 96rpx;
    padding: 0 26rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: #FFC9C7;

    .report-status-text {
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.9);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 16rpx;
    }

    .icon {
      flex-shrink: 0;
    }
  }

  .report-date {
    width: 128rpx;
    height: 32rpx;
    background: #FFECEB;
    border-radius: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 20rpx;
    color: #E94650;
    line-height: 24rpx;
    margin-left: 20rpx;
  }

  .report-title {
    font-weight: 500;
    font-size: 32rpx;
    color: #333333;
    line-height: 38rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .report-title-left {
      display: flex;
      align-items: center;
    }

    .report-title-right {
      font-size: 32rpx;
      color: #828282;
      line-height: 38rpx;
      display: flex;
      align-items: center;
    }
  }

  .report-cell {
    background: rgba(246, 245, 248, 0.65);
    border-radius: 16rpx;
    margin-top: 20rpx;
    padding: 16px;
  }

  .report-cell-line {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-size: 24rpx;
      color: #BDBDBD;
      line-height: 28rpx;
      flex-shrink: 0;
    }

    .value {
      font-size: 24rpx;
      color: #4F4F4F;
      line-height: 28rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
