<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="研攀登" left-icon="" />
    <view class="content w-100% flex flex-col items-start justify-start">
      <view v-if="status !== 1" class="description">
        <view class="btn-wrapper">
          <up-button text="立即匹配获取建议分和排名" :custom-style="{
            width: '590rpx',
            height: '108rpx',
            color: '#FFFFFF',
            fontSize: '36rpx',
            background: 'linear-gradient( 89deg, #FF7F87 0%, #E94650 52%, #FE727A 100%)',
            boxShadow: 'inset 0 2 2 0 rgba(255,255,255,0.6), 0 8 20 0 rgba(109,86,88,0.2)',
            borderRadius: '54rpx 54rpx',
            border: '2rpx solid rgba(250,166,167,0.8)',
          }" @click="toConfigPage" />
        </view>
      </view>
      <view v-else class="echart-container">
        <view class="title mb-10rpx" @click="toSchoolLibrary">
          24级专业录取排名 <up-icon name="arrow-right" size="10" style="margin-left: 40rpx;" />
        </view>
        <qiun-data-charts :reload="reload" :canvas2d="true" type="area" :opts="opts" :chart-data="chart" />
      </view>
      <view class="w-100%">
        <QuickStart />
      </view>
      <view class="news mt-40rpx flex items-center justify-between" @click="toSchoolRank">
        <view class="left flex items-center">
          <view class="tag">
            最新版
          </view>
          <view class="name flex">
            大学排名 <up-icon name="arrow-right" size="10" style="margin-left: 40rpx;" />
          </view>
        </view>
        <text class="right">
          全国大学完整榜单
        </text>
      </view>
      <view class="steps-wrapper mt-40rpx w-100%">
        <steps />
      </view>
    </view>
    <view class="free-school-selection">
      <up-transition :show="imgShow" :mode="'slide-right'">
        <image class="img-wrapper" src="https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/free-school-selection.png"
          mode="scaleToFill" @click="show = true" />
      </up-transition>
    </view>
    <FreeSchoolPop :show="show" @close="show = false" />
  </view>
</template>

<script setup lang="ts">
import QuickStart from './components/quick-start.vue';
import steps from './components/steps.vue';
import { chartIntention } from '@/api/userinfo';
import FreeSchoolPop from '@/components/free-school-selection/free-school-selection.vue'
import { useUserStore } from '@/store';
const userStore = useUserStore();
const { status } = storeToRefs(userStore)
const chart = ref();
const imgShow = ref(false); // 是否显示免费学校选择图片
const show = ref(false); // 是否显示二维码弹窗
const reload = ref(false); // 图表是否需要重新加载
const chartData = reactive({
  categories: [],
  series: [
    {
      name: '录取人数',
      data: [],
    },
  ],
});
const opts = reactive({
  color: ['#FF9D9D'],
  padding: [15, 40, 20, 10],
  enableScroll: false,
  legend: {
    show: false,
  },
  dataLabel: false,
  dataPointShape: false,
  xAxis: {
    disableGrid: true,
    boundaryGap: 'justify',
    labelCount: 2,
    title: '分数',
    titleOffsetX: 15,
  },
  yAxis: {
    disableGrid: true,
    gridType: 'dash',
    splitNumber: 1,
    dashLength: 2,
    showTitle: true,
    data: [{
      title: '录取人数',
      calibration: false,
      titleOffsetX: 20,
    }],
  },
  extra: {
    area: {
      type: 'curve',
      opacity: 0.9,
      addLine: true,
      width: 2,
      gradient: true,
      activeType: 'hollow',
    },
  },
});

/**
 * 获取图表信息
 */
const getChatData = () => {
  nextTick(() => {
    reload.value = true;
  })
  chartIntention().then((res: any) => {
    const chartBase = res.chartBase.reverse()
    chartData.categories = []
    chartData.series[0].data = []
    chartBase?.forEach((item: any) => {
      chartData.categories.push(item.score)
      chartData.series[0].data.push(item.people)
    })
    chart.value = chartData;
  })
};

const toSchoolLibrary = () => {
  uni.navigateTo({
    url: '/pages/intention/detail/index',
  });
};

/**
 * 跳转到学校排名
 */
const toSchoolRank = () => {
  uni.navigateTo({
    url: '/pages/intention/rank/index',
  });
};


const toConfigPage = () => {
  uni.navigateTo({
    url: '/pages/intention/detail/index',
  });
};
onShow(async () => {
  reload.value = false
  if (status.value === 1) {
    getChatData();
  }
});
onUpdated(() => {
  imgShow.value = true;
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8EFF2 0%, #FFFFFF 100%);
  flex: 1;
}

.content {
  min-height: 1000rpx;
  padding: 32rpx;
  box-sizing: border-box;

  .description {
    margin: 0 -32rpx;
    background: url('https://ypdsc.oss-cn-shanghai.aliyuncs.com/zxapp/home/home-default.png') no-repeat center;
    background-size: cover;
    width: 750rpx;
    height: 528rpx;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    .btn-wrapper {
      margin-bottom: 55rpx;
    }
  }

  .echart-container {
    width: 100%;
    height: 450rpx;
    box-sizing: border-box;
    padding: 32rpx 20rpx;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 24rpx 24rpx;

    .title {
      display: flex;
      height: 28rpx;
      border-left: 8rpx solid #F1878D;
      font-size: 28rpx;
      align-items: center;
      padding-left: 20rpx;
      font-weight: 600;
    }
  }

  .news {
    background: rgba(120, 131, 247, 0.08);
    width: 100%;
    border-radius: 24rpx;
    padding: 32rpx;
    box-sizing: border-box;

    .tag {
      padding: 5rpx 12rpx;
      border-radius: 4rpx;
      background: rgba(77, 89, 255, 0.8);
      font-size: 20rpx;
      color: #FFFFFF;
      margin-right: 32rpx;
    }

    .name {
      font-weight: 600;
      font-size: 36rpx;
    }

    .right {
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}

.free-school-selection {
  position: fixed;
  bottom: 100rpx;
  right: 20rpx;
  width: 160rpx;
  height: 120rpx;

  .img-wrapper {
    width: 160rpx;
    height: 120rpx;
  }
}

.popup-box {
  width: 686rpx;
  height: 664rpx;
  border-radius: 24rpx;

  .popup-title {
    height: 112rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 48rpx;
  }

  .popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24rpx;

    .text {
      margin-top: 24rpx;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
      line-height: 36rpx;
    }
  }
}
</style>
