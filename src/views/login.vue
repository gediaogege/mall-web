<template>
  <div>
    <el-container>
      <el-main>
        <h2>Mall系统登录</h2>
        <div class="login">
          <el-form ref="loginForm" :model="loginForm" :rules="rules">
            <el-form-item prop="username">
              <span>账号：</span>
              <el-input v-model="loginForm.username" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span>密码：</span>
              <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
            </el-form-item>
            <div class="login-btn">
              <el-row>
                <el-button type="primary" :loading="loading" round=true size="mini" @click="omSubmit">登录</el-button>
              </el-row>
            </div>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error("用户名不能为空"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
        },
        rules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        loading: false,
      }
    },
    methods: {
      omSubmit() {
        this.$refs.loginForm.validate(validate => {
          if (validate) {
            //this.loading = true;
            this.$store.dispatch("Login", this.loginForm).then(function () {
              //登录成功跳转到主页
              this.$router.push({path: '/'})
            }).catch(function (error) {
              console.log(error)
              //alert("登录失败")
            })
          } else {
            this.loading = false;
            console.log('参数验证不合法！');
            return false;
          }
        })

      }
    }
  }
</script>


<style scoped>

  .login {
    /*width: 250px;*/
    display: inline-block;
  }

  .login span {
    font-weight: 600;
  }

  .login-btn {
    margin-top: 35px;
  }

</style>
