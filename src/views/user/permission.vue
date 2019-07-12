<template>
  <div>
    <el-card class="filter-container" shadow="never">
    <div class="search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="权限名称">
          <el-input v-model="searchForm.permissionName" placeholder="权限名称" clearable=""></el-input>
        </el-form-item>
        <el-form-item label="权限状态">
          <el-select v-model="searchForm.status" placeholder="权限状态" @change="getPermissions">
            <el-option label="正常" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editPermission" icon="el-icon-circle-plus">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-card>
    <el-card class="filter-container" shadow="never">
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border="true"
      >
        <el-table-column
          prop="permissionName"
          label="权限名称"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="权限描述"
        >
        </el-table-column>
        <el-table-column
          prop="authValue"
          label="权限值"
        >
        </el-table-column>
        <el-table-column
          prop="menuUrl"
          label="Url"
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
              @click.native.prevent="editPermission(scope.$index, tableData)"
              type="primary"
              size="small" icon="el-icon-edit">
              修改
            </el-button>
            <el-button
              @click.native.prevent="delPermission(scope.$index, tableData)"
              type="danger"
              size="small" icon="el-icon-delete">
              移除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="权限名称" :label-width="formLabelWidth" prop="permissionName">
          <el-input v-model="form.permissionName" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="权限状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择权限状态" style="width: 250px">
            <el-option label="正常" value=1></el-option>
            <el-option label="停用" value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth">
          <el-input v-model="form.authValue" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="Url" :label-width="formLabelWidth">
          <el-input v-model="form.menuUrl" autocomplete="off" style="width: 250px"></el-input>
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
    permissionList,
    saveOrUpdatePermission,
    delPermission
  } from '@/api/userAdmin'
  import moment from 'moment'

  export default {
    name: "permission",
    created() {
      this.getPermissions();
    },
    data() {
      //数据校验
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('权限名称不能为空'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        formLabelWidth: '150px',
        tableData: [],
        searchForm: {
          permissionName: '',
          status: '1'
        },
        totalPage: 0,
        pageSizes: [2,5,10,20],
        currentPage: 1,
        pageSize: 2,
        form:{
          permissionName:'',
          description:'',
          status:'',
          authValue:'',
          menuUrl:''
        },
        rules: {
          permissionName: [{required: true, trigger: 'blur', validator: validateUsername}],
        },
        dialogTitle:''
      }
    }
    ,
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.getPermissions()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getPermissions()
      },
      getPermissions() {
        permissionList({
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          permissionName: this.searchForm.permissionName,
          status: this.searchForm.status
        }).then(resp => {
          this.tableData = resp.data.permissions.records;
          this.totalPage = resp.data.permissions.total;
          this.currentPage = resp.data.permissions.current
        })
      },
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
      //查询按钮
      onSubmit(){
        this.getPermissions();
      }
      ,//删除按钮
      delPermission(index, rows) {
        let id = rows[index].id;
        this.$confirm("确定要删除这条数据吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPermission({id: id}).then(resp => {
            if (resp.code == 200) {
              this.successMesg('success', '恭喜你，操作成功');
              this.getPermissions();
            }
          })
        }).catch(() => {
          this.successMesg('info', '操作失败')
        });
      },
      editPermission(index, rows) {
        this.form = {
          permissionName:'',
          description:'',
          status:'',
          authValue:'',
          menuUrl:''

        };
        this.dialogFormVisible = true;
        if (rows) {
          this.dialogTitle = '编辑权限';
          this.form.id = rows[index].id;
          this.form.permissionName = rows[index].permissionName;
          this.form.status = rows[index].status + '';
          this.form.description = rows[index].description;
          this.form.authValue = rows[index].authValue;
          this.form.menuUrl = rows[index].menuUrl;
        } else {
          this.dialogTitle = '添加权限';
        }
      },
      //确定按钮
      sureEdit() {
        saveOrUpdatePermission({
          permissionName: this.form.permissionName,
          id: this.form.id,
          statue: this.form.status,
          authValue: this.form.authValue,
          description: this.form.description,
          menuUrl: this.form.menuUrl
        }).then(resp => {
            if (resp.code == 200) {
              this.successMesg('success', '恭喜你，操作成功');
              this.getPermissions();
            }
          }
        );
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>
  .search {
    margin-top: 20px;
  }

  .table {
    margin-top: 40px;
  }

  .pagination {
    margin-top: 15px;
  }
  .filter-container{
    margin-top: 20px;
  }
</style>
