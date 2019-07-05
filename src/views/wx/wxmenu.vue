<template>
  <div>

    <div class="shop">
      <el-select v-model="shopId" placeholder="请选择店铺" @change="changeByShop">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="comtent">
      <div class="add-menu">
        <el-button type="primary" @click.native.prevent="editMenu()" icon="el-icon-circle-plus">添加菜单</el-button>
        <el-button type="success" icon="el-icon-s-promotion" @click.native.prevent="createMenu()">发布菜单</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
        border="true"
      >
        <el-table-column
          fixed
          prop="wxMenuName"
          label="菜单名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="菜单排序"
          width="120">
        </el-table-column>
        <el-table-column
          prop="menuLevel"
          label="菜单级别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="menuType"
          label="内容方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="menuLink"
          label="链接URL"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="修改时间"
          width="200"
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column
          prop="status"
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="wxMenuName">
          <el-input v-model="form.wxMenuName" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别" :label-width="formLabelWidth">
          <el-select v-model="form.menuLevel" placeholder="请选择菜单级别" style="width: 250px" @change="displayParentChange">
            <el-option label="一级" value=1></el-option>
            <el-option label="二级" value=2></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="formLabelWidth" v-if="form.parentId||parentInputShow">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单" style="width: 250px" :disabled=displayParent>
            <el-option
              v-for="item in parentMenus"
              :key="item.id"
              :label="item.wxMenuName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单排序" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="内容方式" :label-width="formLabelWidth">
          <el-input v-model="form.menuType" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.menuLink" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="id" :label-width="formLabelWidth" hidden>
          <el-input v-model="form.id" autocomplete="off" style="width: 250px"></el-input>
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
    menuList,
    saveOrUpdateMenu,
    delMenu,
    createWxMenu
  } from '@/api/wxmenu'
  import moment from 'moment'

  inject :['reload']

  export default {
    created() {
      this.getList(this.shopId);
    },
    methods: {
      //选择店铺
      changeByShop(selectVal) {
        this.getList(selectVal)
      },
      //删除按钮
      deleteRow(index, rows) {
        let id = rows[index].id;
        this.$confirm("确定要删除这条数据吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMenu({id: id}).then(resp => {
            if (resp.code == 200) {
              this.successMesg('success', '恭喜你，操作成功');
              this.getList(this.shopId);
            }
          })
        }).catch(() => {
          this.successMesg('info', '操作失败')
        });


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
      //确定按钮
      sureEdit() {
        this.$refs.form.validate(validate => {
          if (validate) {
            this.dialogFormVisible = false;
            saveOrUpdateMenu({
              wxMenuName: this.form.wxMenuName,
              menuLevel: this.form.menuLevel,
              parentId: this.form.parentId,
              remark: this.form.remark,
              menuType: this.form.menuType,
              id: this.form.id,
              menuLink: this.form.menuLink,
              shopId: this.shopId
            }).then(resp => {
              if (resp.code == 200) {
                this.successMesg('success', '恭喜你，操作成功');
                this.getList(this.shopId)
              }
            });
          }
        })
      },

      //编辑菜单
      editMenu(index, rows) {
        this.form = {
          wxMenuName: '',
          menuLevel: '',
          parentId: '',
          remark: '',
          menuType: '',
          menuLink: ''
        };
        this.dialogFormVisible = true;
        this.displayParent = false;
        if (rows) {
          this.dialogTitle = '编辑菜单';
          this.form.wxMenuName = rows[index].wxMenuName;
          this.form.menuLevel = rows[index].menuLevel + '';
          this.form.parentId = rows[index].parentId;
          this.form.remark = rows[index].remark;
          this.form.menuType = rows[index].menuType;
          this.form.menuLink = rows[index].menuLink;
          this.form.id = rows[index].id;
        } else {
          this.dialogTitle = '添加菜单';
          this.parentInputShow = true
        }
      },
      //发布菜单按钮
      createMenu() {
        this.$confirm('确定要发布菜单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          createWxMenu({shopId: this.shopId}).then(resp => {
            if (resp.code == 200) {
              this.successMesg('success', '恭喜你，操作成功')
            }
          })
        }).catch(() => {
          this.successMesg('info', '操作失败')
        });
      },
      displayParentChange(selectVal) {
        if (selectVal == 1) {
          this.displayParent = true
        } else {
          this.displayParent = false
        }
      },

      getList() {
        menuList({shopId: this.shopId}).then(resp => {
          this.tableData = resp.data.wxMenus;
          this.parentMenus = resp.data.parents;
        })
      },
      successMesg(type, msg) {
        this.$message({
          message: msg,
          type: type,
        })
      }

    },
    data() {
      //数据校验
      const validateWxMenuName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('菜单名称不能为空'));
        } else {
          callback();
        }
      };
      return {
        options: [{
          value: '1',
          label: '游乐园'
        }, {
          value: '2',
          label: '星光侠'
        }],
        shopId: '1',
        input: '',

        dialogTableVisible: false,
        dialogFormVisible: false,
        parentInputShow: false,
        form: {
          wxMenuName: '',
          menuLevel: '',
          parentId: '',
          remark: '',
          menuType: '',
          id: ''

        },
        formLabelWidth: '150px',
        tableData: [],
        parentMenus: [],

        rules: {
          wxMenuName: [{required: true, trigger: 'blur', validator: validateWxMenuName}],
        },
        dialogTitle: '',
        displayParent: false
      }
    }
  }
</script>

<style scoped>
  .add-menu {
    margin-bottom: 30px;
    margin-top: 20px;
  }

  .shop {
  }

  .comtent {
    margin-top: 50px;
  }

  .one {
    background-color: aqua;
  }

  .tow {
    background-color: bisque;
    margin-left: 50px;
  }
</style>
