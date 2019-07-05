<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="400"
      border="true"
    >
      <el-table-column
        fixed
        prop="username"
        label="账户名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="120"
        :formatter="statusFormat"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="190">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editMenu(scope.$index, tableData)"
            type="primary"
            size="small" icon="el-icon-edit">
            修改
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="danger"
            size="small" icon="el-icon-delete">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {list} from '@/api/userAdmin'
  import moment from 'moment'
  export default {
    name: "admin",
    created() {
      this.getUsers();
    },

    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      //时间格式化
      dateFormat: function (row, column) {
        let date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      //状态格式化
      statusFormat: function (row, column) {
        let status = row[column.property];
        if (status == undefined) {
          return "";
        } else if (status == 1) {
          return '正常'
        } else if (status == 0) {
          return '停用'
        }
      },
      getUsers() {
        list().then(resp=>{
          console.log(resp.data.users)
          this.tableData = resp.data.users
        })
      }
    }
  }
</script>

<style scoped>

</style>
