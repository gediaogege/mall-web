<template>
  <div>
    <el-card class="filter-container" shadow="never">
    <div>
      <el-button type="primary" @click.native.prevent="editRole()" icon="el-icon-circle-plus" size="mini">新增角色
      </el-button>
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
            <el-form-item label="角色名称">
              <span>{{ props.row.roleName }}</span>
            </el-form-item>
            <el-form-item label="角色状态">
              <span v-if="props.row.status==1">正常</span>
              <span v-if="props.row.status==0" style="color: red">停用</span>
            </el-form-item>
            <el-form-item label="拥有权限">
              <span>{{ props.row.permissions }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"

        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRole(scope.$index, tableData)"
            type="primary"
            size="small" icon="el-icon-edit">
            修改
          </el-button>
          <el-button
            @click.native.prevent="delRole(scope.$index, tableData)"
            type="danger"
            size="small" icon="el-icon-delete">
            移除
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    </el-card>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择角色状态" style="width: 250px">
            <el-option label="正常" value=1></el-option>
            <el-option label="停用" value=0></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分配角色" :label-width="formLabelWidth">
          <el-transfer v-model="value" :data="permissionData" :titles="titles"></el-transfer>
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
    roleList,
    rolePermissions,
    saveOrUpdateRole,
    delRole
  } from '@/api/userAdmin'
  import moment from 'moment'
  export default {
    name: "role",
    created() {
      this.getRoles();
    },

    data() {
      //数据校验
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('角色名称不能为空'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {
          status: '',
          id: '',
          roleName: '',
          description:''

        },
        permissionData: [],
        value: [],
        dialogTitle: '',
        titles: ['可分配权限', '已拥有权限'],
        formLabelWidth: '150px',
        rules: {
          roleName: [{required: true, trigger: 'blur', validator: validateUsername}],
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
      getRoles() {
        roleList().then(resp => {
          this.tableData = resp.data.roles;
          this.permissionData = resp.data.sysPermission
        })
      },
      getRolePermissions() {
        rolePermissions({roleId: this.form.id}).then(resp => {
          this.value = resp.data.rolePermissions
        })
      },
      editRole(index, rows) {
        this.form = {
          roleName: '',
          id: '',
          status: '',
          description:''

        };
        this.dialogFormVisible = true;
        if (rows) {
          this.dialogTitle = '编辑角色';
          this.form.id = rows[index].id;
          this.form.roleName = rows[index].roleName;
          this.form.status = rows[index].status + '';
          this.form.description = rows[index].description;
          this.getRolePermissions();
        } else {
          this.value = [];
          this.dialogTitle = '添加角色';
        }
      },
      //删除按钮
      delRole(index, rows) {
        let id = rows[index].id;
        this.$confirm("确定要删除这条数据吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRole({id: id}).then(resp => {
            if (resp.code == 200) {
              this.successMesg('success', '恭喜你，操作成功');
              this.getRoles();
            }
          })
        }).catch(() => {
          this.successMesg('info', '操作失败')
        });


      },
      //确定按钮
      sureEdit() {
        saveOrUpdateRole({
          roleName: this.form.roleName,
          id: this.form.id,
          statue: this.form.status,
          permissions: this.value,
          description: this.form.description
        }).then(resp => {
            if (resp.code == 200) {
              this.successMesg('success', '恭喜你，操作成功')
              this.getRoles();
            }
          }
        );
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>
.filter-container{
  margin-top: 20px;
}

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
</style>
