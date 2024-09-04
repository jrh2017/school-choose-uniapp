<template>
  <view class="container">
    <up-navbar :placeholder="true" bg-color="#F8EFF2" title="对比详情" autoBack />
    <view class="comparison-details">
      <view class="de-table">
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left max-model-title">
              <view class="title-icon-box">
                <view class="pd-right-20">院校对比信息</view>
                <up-icon v-if="schoolFold" name="arrow-up-fill"></up-icon>
                <up-icon v-else name="arrow-down-fill"></up-icon>
              </view>
            </view>
          </view>
          <view class="list-box">
            <view class="de-th position-box">
              <view class="flex-left de-td width-200 height-188">共3所院校</view>
              <view class="de-td pd-right-2 height-188" v-for="(item, index) in schoolList" :key="index">
                <view class="add-box" v-if="item.id === 0" @click="goBackFn">
                  +
                </view>
                <view class="connect-flex-box" v-else>
                  <img class="img-icon" :src="item.logo" alt="">
                  <view>{{ item.schoolName }}</view>
                </view>
              </view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">省份</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.province }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">归属地区</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.localArea }}
              </view>
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
                <view>
                  <view v-if="item.level3Code">({{ item.level3Code }})</view>
                </view>
              </view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200">学科排名</view>
              <view class="de-td pd-right-2" v-for="(item, index) in schoolList" :key="index">{{ item.level }}</view>
            </view>
            <view class="de-th position-box">
              <view class="flex-left de-td width-200 height-138 height-auto-box">
                所有学院
                <view class="height-auto-item" v-for="(item, index) in schoolList" :key="index">
                  <view v-for="(code, codeIndex) in item.collegeMajorList" :key="codeIndex">{{ code.collegeName }}
                  </view>
                </view>
              </view>
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
          <view class="list-box" v-if="schoolList.length">
            <view class="de-th position-box" v-for="(item, index) in schoolList[0].schoolScoreStatisVOList"
              :key="index">
              <view class="flex-left de-td width-200">{{ item.year }}</view>
              <view class="de-td pd-right-2" v-for="(item2, index2) in schoolList" :key="index2">
                <view v-for="(item3, index4) in item2.schoolScoreStatisVOList" :key="index4">
                  <view v-if="item3.year == item.year">{{ item3.people }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">录取最高分</view>
          </view>
          <view class="list-box" v-if="schoolList.length">
            <view class="de-th position-box" v-for="(item, index) in schoolList[0].schoolScoreStatisVOList"
              :key="index">
              <view class="flex-left de-td width-200">{{ item.year }}</view>
              <view class="de-td pd-right-2" v-for="(item2, index2) in schoolList" :key="index2">
                <view v-for="(item3, index4) in item2.schoolScoreStatisVOList" :key="index4">
                  <view v-if="item3.year == item.year">{{ item3.maxScore }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">录取中位分</view>
          </view>
          <view class="list-box" v-if="schoolList.length">
            <view class="de-th position-box" v-for="(item, index) in schoolList[0].schoolScoreStatisVOList"
              :key="index">
              <view class="flex-left de-td width-200">{{ item.year }}</view>
              <view class="de-td pd-right-2" v-for="(item2, index2) in schoolList" :key="index2">
                <view v-for="(item3, index4) in item2.schoolScoreStatisVOList" :key="index4">
                  <view v-if="item3.year == item.year">{{ item3.middleScore }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">录取最低分</view>
          </view>
          <view class="list-box" v-if="schoolList.length">
            <view class="de-th position-box" v-for="(item, index) in schoolList[0].schoolScoreStatisVOList"
              :key="index">
              <view class="flex-left de-td width-200">{{ item.year }}</view>
              <view class="de-td pd-right-2" v-for="(item2, index2) in schoolList" :key="index2">
                <view v-for="(item3, index4) in item2.schoolScoreStatisVOList" :key="index4">
                  <view v-if="item3.year == item.year">{{ item3.minScore }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="model-box">
          <view class="de-th height-98">
            <view class="model-title flex-left">建议分</view>
          </view>
          <view class="list-box" v-if="schoolList.length">
            <view class="de-th position-box" v-for="(item, index) in schoolList[0].schoolScoreStatisVOList"
              :key="index">
              <view class="flex-left de-td width-200">{{ item.year }}</view>
              <view class="de-td pd-right-2" v-for="(item2, index2) in schoolList" :key="index2">
                <view v-for="(item3, index4) in item2.schoolScoreStatisVOList" :key="index4">
                  <view v-if="item3.year == item.year">{{ item3.adviceScore }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="segmentation-bg-F8F2F5">
          <view class="segmentation-item" v-for="(item, index) in schoolList" :key="index"></view>
        </view>
        <view class="de-th height-98">
          <view class="model-title flex-left max-model-title">
            <view class="title-icon-box">
              <view class="pd-right-20">学院对比信息</view>
              <up-icon v-if="collegeFold" name="arrow-up-fill"></up-icon>
              <up-icon v-else name="arrow-down-fill"></up-icon>
            </view>
          </view>
        </view>
        <view class="college-item" v-for="(collegeItem, collegeIndex) in collegeList" :key="collegeIndex">
          <view class="model-box">
            <view class="list-box">
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154"></view>
                <view class="de-td pd-right-2 height-154 icon-tips-box" v-for="(value, index) in collegeItem"
                  :key="index">
                  <view v-if="value.id" :class="[{ 'is-active': value.isActive }, 'icon-tips']"
                    @click="topUpFn(collegeIndex, index)"><up-icon name="arrow-upward"
                      :color="value.isActive ? '#E94650' : '#000000'" size="10"></up-icon>{{ value.isActive ? '已置顶' :
                        '未置顶' }}</view>
                  {{ value.collegeName }}
                </view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200">学习方式</view>
                <view class="de-td pd-right-2" v-for="(value, index) in collegeItem" :key="index">{{
                  value.collegeName }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154">研究方向</view>
                <view class="de-td pd-right-2 height-154" v-for="(value, index) in collegeItem" :key="index">{{
                  value.collegeName }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154">考试科目</view>
                <view class="de-td pd-right-2 height-154" v-for="(value, index) in collegeItem" :key="index">{{
                  value.collegeName }}</view>
              </view>
              <view class="de-th position-box">
                <view class="flex-left de-td width-200 height-154">参考书目</view>
                <view class="de-td pd-right-2 height-154" v-for="(value, index) in collegeItem" :key="index">{{
                  value.collegeName }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">总录取人数</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box" v-for="(value, key, index) in collegeYearList[collegeIndex]"
                :key="index">
                <view class="flex-left de-td width-200">{{ key }}</view>
                <view class="de-td pd-right-2" v-for="(item, index) in value" :key="index">{{ item.people }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">录取高位分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box" v-for="(value, key, index) in collegeYearList[collegeIndex]"
                :key="index">
                <view class="flex-left de-td width-200">{{ key }}</view>
                <view class="de-td pd-right-2" v-for="(item, index) in value" :key="index">{{ item.maxScore }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">录取中位分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box" v-for="(value, key, index) in collegeYearList[collegeIndex]"
                :key="index">
                <view class="flex-left de-td width-200">{{ key }}</view>
                <view class="de-td pd-right-2" v-for="(item, index) in value" :key="index">{{ item.middleScore }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">录取最低分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box" v-for="(value, key, index) in collegeYearList[collegeIndex]"
                :key="index">
                <view class="flex-left de-td width-200">{{ key }}</view>
                <view class="de-td pd-right-2" v-for="(item, index) in value" :key="index">{{ item.minScore }}</view>
              </view>
            </view>
          </view>
          <view class="model-box">
            <view class="de-th height-98">
              <view class="model-title flex-left">建议分</view>
            </view>
            <view class="list-box">
              <view class="de-th position-box" v-for="(value, key, index) in collegeYearList[collegeIndex]"
                :key="index">
                <view class="flex-left de-td width-200">{{ key }}</view>
                <view class="de-td pd-right-2" v-for="(item, index) in value" :key="index">{{ item.adviceScore }}</view>
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
interface yearItem {
  year: number,
  people: number,
  maxScore: number,
  middleScore: number,
  minScore: number,
  adviceScore: number
}
interface collegeItem {
  collegeId: number,
  collegeName: string,
  schoolId: number,
  collegeScoreStatisVOList: yearItem[]
}
interface schoolItem {
  id: number,
  schoolName: string,
  logo: string,
  province: string,
  localArea: string,
  level: string,
  level3Name: string,
  level3Code: string,
  collegeMajorList: collegeItem[],
  schoolScoreStatisVOList: yearItem[]
}
const schoolFold = ref(false);// 学校的折叠
const collegeFold = ref(false);// 学院的折叠
const ids = ref('');
const collegeList = ref<Array<any>>([])
const collegeYearList = ref<Array<any>>([])
const schoolList = ref<Array<schoolItem>>([]);
const templateItem = ref<schoolItem>({
  id: 0,
  schoolName: '',
  logo: '',
  province: '',
  localArea: '',
  level: '',
  level3Name: '',
  level3Code: '',
  collegeMajorList: [],
  schoolScoreStatisVOList: []
})
const getCompareData = () => {
  majorCompare({ ids: ids.value }).then((res: any) => {
    schoolList.value = [...res, templateItem.value]
    let listRes = schoolList.value || [];
    let list: any = []
    listRes.forEach((item: any) => {
      if (item.collegeMajorList && item.collegeMajorList.length) {
        list.push(item.collegeMajorList.length)
      } else {
        list.push(0)
      }
    })
    let maxLength = Math.max(...list)
    let receiveList = [] // 接收仓
    let newCyl = []
    for (let i = 0; i < maxLength; i++) {
      receiveList.push([])
      newCyl.push({})
    }
    receiveList.forEach((item: any, index: number) => { // 学院最大数量循环
      listRes.forEach((item2: object, index2: number) => { // 学校循环
        let schoolObj: any = {} // 学校数据
        let college = {} // 学院数据
        if (listRes[index2] && listRes[index2].collegeMajorList && listRes[index2].collegeMajorList[index]) {
          schoolObj = listRes[index2]
          college = { ...schoolObj.collegeMajorList[index], id: schoolObj.id }
        }
        item.push(college)
      })
    })
    collegeList.value = receiveList

    let yearlist: any = [] // 所有年份的集合
    listRes.forEach((item: schoolItem, index: number) => {
      if (item.collegeMajorList && item.collegeMajorList.length) {
        item.collegeMajorList.forEach((college: any) => {
          if (college.collegeScoreStatisVOList && college.collegeScoreStatisVOList.length) {
            college.collegeScoreStatisVOList.forEach((year: any) => {
              if (year.year) {
                yearlist.push(year.year)
              }
            })
          }
        })
      }
    })
    let newYearList = yearlist.filter((item: any, index: number) => yearlist.indexOf(item) === index);
    newCyl.forEach((item: any, index: number) => {
      newYearList.forEach((year: any) => {
        item[year] = []
        let itemYearList: any = []
        listRes.forEach((item2: schoolItem, index2: number) => { // 学校循环
          if (item2.collegeMajorList && item2.collegeMajorList.length && item2.collegeMajorList[index] && item2.collegeMajorList[index].collegeScoreStatisVOList) {
            item2.collegeMajorList[index].collegeScoreStatisVOList.forEach(item3 => {
              if (item3.year == year) {
                itemYearList.push(item3)
              }
            })
          } else {
            itemYearList.push({})
          }
        })
        item[year] = itemYearList
      })
    })
    collegeYearList.value = newCyl
  });
};
// 置顶
const topUpFn = (collegeIndex: number, index: number) => {
  collegeList.value.forEach((itemList: any, index2: number) => {
    itemList.forEach((item: any, index3: number) => {
      if (index === index3) {
        item.isActive = false
      }
    })
  })
  let firstItemList = collegeList.value[0] // 第一行
  let firstItem = firstItemList[index] // 待替换项
  let clickItemList = collegeList.value[collegeIndex] // 目标行
  let clickItem = { ...clickItemList[index], isActive: true } // 待置顶项
  firstItemList.splice(index, 1, clickItem)
  clickItemList.splice(index, 1, firstItem)
  collegeList.value[0] = firstItemList
  collegeList.value[collegeIndex] = clickItemList
}
// 返回上一页
const goBackFn = () => {
  uni.navigateBack();
}
onLoad((options) => {
  ids.value = options!.ids;
  schoolList.value = [templateItem.value]
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
    box-sizing: border-box;

    .de-td {
      flex: 0 0 232rpx;
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
      color: rgba(0, 0, 0, 0.85);
      line-height: 44rpx;
      min-height: 94rpx;
    }

    .width-200 {
      width: 200rpx;
      padding-bottom: 20rpx;
    }

    .height-188 {
      min-height: 188rpx;
    }

    .height-138 {
      min-height: 138rpx;
      display: inline-block;
    }

    .height-154 {
      min-height: 154rpx;
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
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.85);
  line-height: 44rpx;
  padding: 24rpx 32rpx 26rpx 32rpx;
}

.max-model-title {
  font-size: 32rpx;
  line-height: 48rpx;
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
  background-color: #F7F2F5;
  display: flex;
  padding-left: 200rpx;

  .segmentation-item {
    flex: 0 0 235rpx;
    background-color: #F7F2F5;
  }
}

.add-box {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 70rpx;
  line-height: 140rpx;
}

.height-auto-box {
  .height-auto-item {
    opacity: 0;
  }
}

.title-icon-box {
  display: flex;
  align-items: center;

  .pd-right-20 {
    padding-right: 20rpx;
  }
}

.icon-tips-box {
  position: relative;

  .icon-tips {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 400;
    font-size: 20rpx;
    line-height: 24rpx;
    padding: 6rpx 24rpx;
    border-bottom-right-radius: 20rpx;
    overflow: hidden;
    background-color: #F2F2F7;
  }

  .is-active {
    color: #E94650;
    background-color: #FCE3E5;
  }
}
</style>
