<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="研攀登"
      left-icon=""
    />
    <view class="content w-100% flex flex-col items-start justify-start">
      <view v-if="!showConfig" class="description">
        <view class="btn-wrapper">
          <up-button
            text="立即配置获取报告"
            :custom-style="{
              width: '590rpx',
              height: '108rpx',
              color: '#FFFFFF',
              fontSize: '36rpx',
              background: 'linear-gradient( 89deg, #FF7F87 0%, #E94650 52%, #FE727A 100%)',
              boxShadow: 'inset 0 2 2 0 rgba(255,255,255,0.6), 0 8 20 0 rgba(109,86,88,0.2)',
              borderRadius: '54rpx 54rpx',
              border: '2rpx solid rgba(250,166,167,0.8)',
            }"
            @click="show = true"
          />
        </view>
      </view>
      <view v-else class="echart-container">
        <view class="title mb-10rpx">
          24届专业录取排名 <up-icon name="arrow-right" size="10" style="margin-left: 40rpx;" />
        </view>
        <qiun-data-charts type="area" :opts="opts" :chart-data="chart" />
      </view>
      <view class="w-100%">
        <QuickStart />
      </view>
      <view class="news mt-40rpx flex items-center justify-between">
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
      <up-modal
        :show="show"
        title="我的意向"
        :show-cancel-button="true"
        confirm-color="#FE6567"
        @cancel="show = false"
      >
        <view class="slot-content">
          <up-form
            ref="uFormRef"
            :model="form"
            :rules="rules"
            label-width="150rpx"
            :border-bottom="true"
          >
            <view class="item-wrapper">
              <up-form-item
                label="意向院校:"
                prop="school"
                required
                @click="showSchool = true;"
              >
                <up-input v-model="form.school" placeholder="请选择意向院校" border="none" disabled disabledColor="#ffffff"/>
                <template #right>
                  <up-icon
                    name="arrow-down"
                  />
                </template>
              </up-form-item>
            </view>
            <view class="item-wrapper mt-20rpx">
              <up-form-item
                label="意向专业:"
                prop="major"
                required
                @click="showMajor = true;"
              >
                <up-input v-model="form.major" placeholder="请选择意向专业" border="none" disabled disabledColor="#ffffff"/>
                <template #right>
                  <up-icon
                    name="arrow-down"
                  />
                </template>
              </up-form-item>
            </view>
            <view class="item-wrapper mt-20rpx">
              <up-form-item label="预估分数:" prop="score" required>
                <up-input v-model="form.score" type="number" placeholder="请选输入预估分数">
                  <template #suffix>
                    <text>分</text>
                  </template>
                </up-input>
              </up-form-item>
            </view>
            <up-popup :show="showSchool" closeable @close="showSchool = false">
              <view class="h-600rpx">
                <text>出淤泥而不染，濯清涟而不妖</text>
              </view>
            </up-popup>
            <up-popup :show="showMajor" closeable @close="showMajor = false">
              <view class="h-600rpx">
                <view class="subsection mt-80rpx">
                  <up-subsection :list="list" mode="subsection" :current="0" activeColor="#e94650" />
                </view>
              </view>
            </up-popup>
          </up-form>
        </view>
      </up-modal>
    </view>
  </view>
</template>

<script setup lang="ts">
import QuickStart from './components/quick-start.vue';
import steps from './components/steps.vue';
import { getToken } from '@/utils/auth';

const chart = ref();
const showConfig = ref(false); // 是否显示配置面板
const show = ref(false); // 是否显示模态框
const showSchool = ref(false); // 是否显示院校选择弹窗
const showMajor = ref(false); // 是否显示专业选择弹窗
const list = reactive(['专业学位', '学术学位']); // 专业列表
const rules = reactive({
  school: [
    { required: true, message: '请选择院校', trigger: 'blur' },
  ],
});
const form = ref({
  school: '123',
  major: '',
  score: 0,
});
const chartData = reactive({
  categories: ['2018', '2019', '2020', '2021', '2022', '202'],
  series: [
    {
      name: '成交量A',
      data: [35, 8, 25, 37, 4, 20],
    },
  ],
});
const opts = reactive({
  color: ['#FF9D9D'],
  padding: [15, 40, 20, 0],
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
      titleOffsetX: 5,
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

onShow(() => {
  chart.value = chartData;
  showConfig.value = getToken();
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
    height: 400rpx;
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
    background: rgba(120,131,247,0.08);
    width: 100%;
    border-radius: 24rpx;
    padding: 32rpx;
    box-sizing: border-box;
    .tag {
      padding: 5rpx 12rpx;
      border-radius: 4rpx;
      background: rgba(77,89,255,0.8);
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
      color: rgba(0,0,0,0.65);
    }
  }
}
.slot-content {
  width: 100%;
  .item-wrapper {
    border-radius: 16rpx;
    border: 2rpx solid #E7E7E7;
    padding: 0 20rpx 0 40rpx;
  }
}
.subsection {
  padding: 0 20rpx;
}
::v-deep .u-modal__content {
  padding: 12rpx 20rpx 25rpx 30rpx !important;
}
</style>
