<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <el-button type="primary" @click="lastWeek">最近一周数据</el-button>
      <el-button type="success" @click="lastMonth">最近一个月数据</el-button>
    </el-card>
    <el-card class="filter-container" shadow="never">
      <ve-pie :data="chartData1" theme-name="燃烧卡路里"></ve-pie>
    </el-card>
    <el-card class="filter-container" shadow="never">
      <ve-line :data="chartData2"></ve-line>
    </el-card>
  </div>
</template>

<script>
  import {
    getTnessDataByDate
  } from '@/api/tness'

  export default {
    created() {
      this.initDatas('week');
    },
    data() {
      return {
        chartData1: {
          columns: ['日期', '燃烧卡路里'],
          rows: []
        },

        chartData2: {
          columns: ['日期', '运动距离', '运动时长', '燃烧卡路里'],
          rows: []
        }
      }
    },
    methods: {
      initDatas(queryType) {
        getTnessDataByDate({queryDataType: queryType}).then(resp => {
          let pieRows = resp.data.pieRows;
          let lineRows = resp.data.lineRows;
          this.chartData1.rows = pieRows;
          this.chartData2.rows = lineRows;
        })
      }
      ,
      lastWeek() {
        this.initDatas('week')
      },
      lastMonth() {
        this.initDatas('month')
      }
    }

  }
</script>

<style scoped>
  .filter-container {
    margin-top: 20px;
  }
</style>
