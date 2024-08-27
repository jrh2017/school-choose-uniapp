<template>
  <view class="container">
    <up-navbar
      :placeholder="true"
      bg-color="#F8EFF2"
      title="对比详情"
      autoBack
    />
    <view class="comparison-details">
      <view class="de-table">
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">院校对比信息</view>
          </view>
          <view class="list-box">
            <view class="de-th position-box">
              <view class="flex-left de-td width-200 height-188">共3所院校</view>
              <view class="de-td pd-right-2 height-188" v-for="(item, index) in schoolList" :key="index">
                <div class="connect-flex-box">
                  <img class="img-icon" :src="logo || 'https://ypdsc.oss-cn-shanghai.aliyuncs.com/app/2.jpg'" alt="">
                  <div>{{  item.schoolName  }}</div>
                </div>
              </view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">省份</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">归属地区</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">院校水平</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">院校类型</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200 height-138">专业</view>
              <view class="de-td pd-right-2 height-138" v-for="(item, index) in schoolList" :key="index">
                <view>{{ item.level3Name }}</view>
                <view>{{ item.level3Code }}</view>
              </view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">学科排名</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200 height-138">所有学院</view>
              <view class="de-td pd-right-2 height-138" v-for="(item, index) in schoolList" :key="index">
                <view v-for="(code, codeIndex) in item.collegeMajorList" :key="codeIndex">{{ code.collegeName }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">总录取人数</view>
          </view>
          <view class="list-box">
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2024</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2023</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2022</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">录取最高分</view>
          </view>
          <view class="list-box">
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2024</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2023</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2022</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">录取中位分</view>
          </view>
          <view class="list-box">
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2024</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2023</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2022</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">录取最低分</view>
          </view>
          <view class="list-box">
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2024</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2023</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2022</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">建议分</view>
          </view>
          <view class="list-box">
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2024</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2023</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">2022</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
          </view>
        </view>
        <view class="segmentation-bg-F8F2F5">
          <view class="segmentation-item" v-for="(item, index) in schoolList" :key="index"></view>
        </view>
        <view class="de-th height-98">
          <view class="model-title flex-left">学院对比信息</view>
        </view>
        <view class="college-item" v-for="(collegeItem, collegeIndex) in collegeMaxLength" :key="collegeIndex">
          <view class="model-box">
            <view class="list-box">
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154"></view>
                <view class="de-td pd-right-2 height-154" v-for="(item, index) in schoolList" :key="index">{{ item.collegeList[collegeIndex] ? item.collegeList[collegeIndex].collegeName : '' }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">学习方式</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.collegeList[collegeIndex] ? item.collegeList[collegeIndex].studyType : '' }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154">研究方向</view>
                <view class="de-td pd-right-2 height-154" v-for="(item, index) in schoolList" :key="index">{{ item.collegeList[collegeIndex] ? item.collegeList[collegeIndex].direction : '' }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154">考试科目</view>
                <view class="de-td pd-right-2 height-154" v-for="(item, index) in schoolList" :key="index">{{ item.collegeList[collegeIndex] ? item.collegeList[collegeIndex].discipline : '' }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154">参考书目</view>
                <view class="de-td pd-right-2 height-154" v-for="(item, index) in schoolList" :key="index">{{ item.collegeList[collegeIndex] ? item.collegeList[collegeIndex].book : '' }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">总录取人数</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2024</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.collegeList[collegeIndex] ? item.collegeList[collegeIndex].Year2024 : '' }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2023</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.collegeList[collegeIndex] ? item.collegeList[collegeIndex].Year2023 : '' }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2022</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">录取高位分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2024</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2023</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2022</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">录取中位分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2024</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2023</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2022</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">录取最低分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2024</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2023</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2022</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">建议分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2024</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{  item.province  }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2023</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">2022</view>
                <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { majorCompare } from '@/api/compare';

const ids = ref('');
const collegeMaxLength = ref(0)
const schoolList = ref([{
  schoolName: '清华大学',
  province: '江苏省',
  localArea: 'A区',
  level: '985',
  type: '理工类',
  degree: '本科',
  level3Name: '应用心理',
  level3Code: '045400',
  ranking: '1',
  collegeNameList: ['信息科学与工程学院', '计算机科学与技术学院', '生命科学学院'],
  Year2024: 100,
  Year2023: 120,
  Year2022: 220,
  Year2024Max: 100,
  Year2023Max: 120,
  Year2022Max: 220,
  Year2024Mid: 100,
  Year2023Mid: 120,
  Year2022Mid: 220,
  Year2024Mim: 100,
  Year2023Mim: 120,
  Year2022Mim: 220,
  Year2024SuggestedPoints: 100,
  Year2023SuggestedPoints: 120,
  Year2022SuggestedPoints: 220,
  collegeList: [{
    collegeName: '信息科学与工程学院',
    studyType: '全日制',
    direction: '太空',
    discipline: '科一，科二',
    book: '书一',
    Year2024: 100,
    Year2023: 120,
    Year2022: 220,
    Year2024Max: 100,
    Year2023Max: 120,
    Year2022Max: 220,
    Year2024Mid: 100,
    Year2023Mid: 120,
    Year2022Mid: 220,
    Year2024Mim: 100,
    Year2023Mim: 120,
    Year2022Mim: 220,
    Year2024SuggestedPoints: 100,
    Year2023SuggestedPoints: 120,
    Year2022SuggestedPoints: 220,
  }]
},{
  schoolName: '清华大学',
  province: '江苏省',
  localArea: 'A区',
  majorId: '10000101',
  degree: '本科',
  score: '90',
  rank: '1',
  isMajor: true,
  collegeList: [{
    collegeName: '信息科学与工程学院',
    studyType: '全日制',
    direction: '太空',
    discipline: '科一，科二',
    book: '书一',
    Year2024: 100,
    Year2023: 120,
    Year2022: 220,
    Year2024Max: 100,
    Year2023Max: 120,
    Year2022Max: 220,
    Year2024Mid: 100,
    Year2023Mid: 120,
    Year2022Mid: 220,
    Year2024Mim: 100,
    Year2023Mim: 120,
    Year2022Mim: 220,
    Year2024SuggestedPoints: 100,
    Year2023SuggestedPoints: 120,
    Year2022SuggestedPoints: 220,
  }]
},{
  schoolName: '清华大学',
  province: '江苏省',
  localArea: 'A区',
  majorId: '10000101',
  degree: '本科',
  score: '90',
  rank: '1',
  isMajor: true,
  collegeList: [{
    collegeName: '信息科学与工程学院',
    studyType: '全日制',
    direction: '太空',
    discipline: '科一，科二',
    book: '书一',
    Year2024: 100,
    Year2023: 120,
    Year2022: 220,
    Year2024Max: 100,
    Year2023Max: 120,
    Year2022Max: 220,
    Year2024Mid: 100,
    Year2023Mid: 120,
    Year2022Mid: 220,
    Year2024Mim: 100,
    Year2023Mim: 120,
    Year2022Mim: 220,
    Year2024SuggestedPoints: 100,
    Year2023SuggestedPoints: 120,
    Year2022SuggestedPoints: 220,
  }]
},{
  schoolName: '清华大学',
  province: '江苏省',
  localArea: 'A区',
  majorId: '10000101',
  degree: '本科',
  score: '90',
  rank: '1',
  isMajor: true,
  collegeList: [{
    collegeName: '信息科学与工程学院',
    studyType: '全日制',
    direction: '太空',
    discipline: '科一，科二',
    book: '书一',
    Year2024: 100,
    Year2023: 120,
    Year2022: 220,
    Year2024Max: 100,
    Year2023Max: 120,
    Year2022Max: 220,
    Year2024Mid: 100,
    Year2023Mid: 120,
    Year2022Mid: 220,
    Year2024Mim: 100,
    Year2023Mim: 120,
    Year2022Mim: 220,
    Year2024SuggestedPoints: 100,
    Year2023SuggestedPoints: 120,
    Year2022SuggestedPoints: 220,
  }]
}]);
const getCompareData = () => {
  console.log(ids.value, 'ids')
  majorCompare({ ids: ids.value }).then((res) => {
    console.log(res);
  });
};
watchEffect(() => { //
    let list: any = []
    schoolList.value.forEach((item: any) => {
      if (item.collegeList && item.collegeList.length) {
        list.push(item.collegeList.length)
      } else {
        list.push(0)
      }
    })
    collegeMaxLength.value = Math.max(...list)
})
onLoad((options) => {
  ids.value = options!.ids;
  getCompareData();
});
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.comparison-details {
  position: relative;
  background-color: #fff;
}
.de-table {
  width: 100%;
  overflow-x: auto;
  .de-th {
    display: flex;
    .de-td {
      flex:  0 0 232rpx;
      width: 232rpx;
      border: 2rpx solid #F2F2F7;
      border-left: none;
      padding-left: 32rpx;
      padding-top: 24rpx;
      padding-bottom: 24rpx;
      padding-right: 32rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(0,0,0,0.85);
      line-height: 44rpx;
      height: 94rpx;
    }
    .width-200 {
      width: 200rpx;
      padding-bottom: 20rpx;
    }
    .height-188 {
      height: 188rpx;
    }
    .height-138 {
      height: 138rpx;
      display: inline-block;
    }
    .height-154 {
      height: 154rpx;
    }
  }
  .position-box {
    padding-left: 202rpx;
    .flex-left {
      font-weight: 400;
      font-size: 28rpx;
      color: #F1878D;
      line-height: 44rpx;
      background-color: #fff;
    }
  }
  .de-th .de-td:first-child {
    border-left: 2rpx solid #F2F2F7;
  }
}
.flex-left {
  position: absolute;
  left: 0;
}
.model-title {
  font-weight: 500;
  font-size: 32rpx;
  color: rgba(0,0,0,0.85);
  line-height: 48rpx;
  padding: 24rpx 32rpx 26rpx 32rpx;
}
.model-box .de-th {
  .de-td {
    border-top: none;
  }
}
.list-box .position-box:first-child {
  .de-td {
    border-top: 2rpx solid #F2F2F7;
  }
}
.height-98 {
  height: 98rpx;
}
.img-icon {
  width: 88rpx;
  height: 88rpx;
}
.connect-flex-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.segmentation-bg-F8F2F5 {
  height: 24rpx;
  width: 100%;
  background-color: #F7F2F5;
  display: flex;
  padding-left: 200rpx;
  .segmentation-item {
    flex: 0 0 235rpx;
    background-color: #F7F2F5;
  }
}
</style>
