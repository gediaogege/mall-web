<template>
  <div style="position: relative">

    <div class="content">
      <el-form ref="tnessForm" :model="tnessForm" label-width="100px">
        <el-form-item label="用户昵称">
          <el-input v-model="tnessForm.nickname" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select v-model="tnessForm.sex" placeholder="请选择用户性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>-->
        <el-form-item label="运动类别">
          <el-radio-group v-model="tnessForm.tnessType">
            <el-radio label="1" name="type">步行</el-radio>
            <el-radio label="2" name="type">跑步</el-radio>
            <el-radio label="3" name="type">骑行</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数据来源">
          <el-radio-group v-model="tnessForm.source">
            <el-radio label="1">Apple app</el-radio>
            <el-radio label="2">Nick app</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运动时间">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择时间" v-model="tnessForm.durationTime"
                            class="form_input"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="运动时长">
          <el-input v-model="tnessForm.duration" class="form_input">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="运动距离">
          <el-input v-model="tnessForm.range" class="form_input">
            <template slot="append">公里</template>
          </el-input>
        </el-form-item>
        <el-form-item label="消耗卡路里">
          <el-input v-model="tnessForm.calorie" class="form_input">
            <template slot="append">卡路里</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="restForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    saveData
  } from '@/api/tness'

  export default {
    name: 'add',
    data() {
      return {
        tnessForm: {
          nickname: '',
          sex: '',
          tnessType: '',
          source: '',
          remark: '',
          duration: '',
          range: '',
          calorie: '',
          durationTime: ''

        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.tnessForm.nickname);
        console.log(this.tnessForm.sex);
        console.log(this.tnessForm.tnessType);
        console.log(this.tnessForm.source);
        console.log(this.tnessForm.duration);
        console.log(this.tnessForm.range);
        console.log(this.tnessForm.calorie);
        console.log(this.tnessForm.durationTime);
        saveData({
          nickname: this.tnessForm.nickname,
          sex: this.tnessForm.sex,
          tnessType: this.tnessForm.tnessType,
          source: this.tnessForm.source,
          duration: this.tnessForm.duration,
          range: this.tnessForm.range,
          calorie: this.tnessForm.calorie,
          durationTime: this.tnessForm.durationTime,
        }).then(resp => {
          this.tnessForm.nickname = '';
          this.tnessForm.sex = '';
          this.tnessForm.tnessType = '';
          this.tnessForm.source = '';
          this.tnessForm.duration = '';
          this.tnessForm.range = '';
          this.tnessForm.calorie = '';
          this.tnessForm.durationTime = '';
          this.successMesg('success', '恭喜你，操作成功');
        })
      },
      restForm() {
        this.$refs.tnessForm.resetFields()
      },
      successMesg(type, msg) {
        this.$message({
          message: msg,
          type: type,
        })
      },
    }
  }
</script>

<style scoped>
  .content {
    width: 50%;
    margin-left: 50%;
    position: absolute;
    left: -290px;
  }

  .form_input {
    width: 220px;
  }
</style>
