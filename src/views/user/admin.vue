<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
    <div class="add-menu">
      <el-button type="primary" @click.native.prevent="editUserAdmin()" icon="el-icon-circle-plus" size="mini">新增用户</el-button>
    </div>
    </el-card>
    <el-card class="filter-container" shadow="never">
    <el-table
      :data="tableData"
      style="width: 100%"
      border="true"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="账户名称">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="账户状态">
              <span v-if="props.row.state==1">正常</span>
              <span v-if="props.row.state==0" style="color: red">停用</span>
            </el-form-item>
            <el-form-item label="拥有角色">
              <span>{{ props.row.roles }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="账户名称"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"

        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        :formatter="statusFormat"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editUserAdmin(scope.$index, tableData)"
            type="primary"
            size="small" icon="el-icon-edit">
            修改
          </el-button>
        <!--  <el-button
            @click.native.prevent="dialogFormVisible = true"
            type="danger"
            size="small" icon="el-icon-delete">
            移除
          </el-button>-->

        </template>
      </el-table-column>
    </el-table>
    </el-card>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="账户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="账户密码" :label-width="formLabelWidth"  v-if="passwordShow">
          <el-input v-model="form.password" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="账户状态" :label-width="formLabelWidth">
          <el-select v-model="form.state" placeholder="请选择账户状态" style="width: 250px">
            <el-option label="正常" value=1></el-option>
            <el-option label="停用" value=0></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分配角色" :label-width="formLabelWidth">
          <el-transfer v-model="value" :data="rolesData" :titles="titles"></el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    list,
    userRoles,
    saveOrUpdateUser
  } from '@/api/userAdmin'
  import moment from 'moment'

  export default {
    name: "admin",
    created() {
      this.getUsers();
    },

    data() {
      //数据校验
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('账户名称不能为空'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {
          state: '',
          id: '',
          username: '',
          password:''

        },
        rolesData: [],
        value: [],
        dialogTitle: '',
        titles :['可分配角色','已拥有角色'],
        passwordShow:true,
        formLabelWidth: '150px',
        rules:{
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
        }
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
      successMesg(type, msg) {
        this.$message({
          message: msg,
          type: type,
        })
      },
      getUsers() {
        list().then(resp => {
          this.tableData = resp.data.users;
          this.rolesData = resp.data.sysRoles
        })
      },
      getUserRoles() {
        userRoles({userId: this.form.id}).then(resp => {
          this.value = resp.data.userRoles
        })
      },
      editUserAdmin(index, rows) {
        this.form = {
          username: '',
          id: '',
          state: '',
          password:''
        };
        this.dialogFormVisible = true;
        if (rows) {
          this.passwordShow = false;
          this.dialogTitle = '编辑用户';
          this.form.id = rows[index].id;
          this.form.username = rows[index].username;
          this.form.state = rows[index].state + '';
          this.getUserRoles();
        } else {
          this.value = [];
          this.dialogTitle = '添加用户';
          this.passwordShow = true;
        }
      },
      //确定按钮
      sureEdit() {
        saveOrUpdateUser({
          username: this.form.username,
          userId: this.form.id,
          statue: this.form.state,
          roles: this.value,
          password:this.form.password
        }).then(resp => {
            if (resp.code == 200) {
              this.successMesg('success', '恭喜你，操作成功')
              this.getUsers();
            }
          }
        );
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .add-menu {
   /* margin-bottom: 30px;
   margin-top: 20px;*/
  }
  .filter-container{
    margin-top: 20px;
  }
</style>
