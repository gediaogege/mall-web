<template>


  <el-container>
    <!--头部-->
    <el-header class="header">
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb" class="navbar">
          <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
            <span v-if="item.redirect==='noredirect'||index==levelList.length-1"
                  class="no-redirect">{{item.meta.title}}</span>
            <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
          </el-breadcrumb-item>
        </transition-group>
        <div class="huanying">欢迎您:<span>{{username}}</span>
          <el-button type="warning " size="mini" icon="el-icon-close"  round ="true" plain="true" @click="logout">注销</el-button>
        </div>
      </el-breadcrumb>

    </el-header>
    <!--左侧菜单-->
    <div class="aside-container">
      <el-aside width="200px">
        <el-menu
          router=true
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="home" route="/home">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>

          <el-submenu index="2">

            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>微信管理</span>
            </template>

            <el-menu-item index="2-1" route="/wx/wxmenu">菜单设置</el-menu-item>

          </el-submenu>

          <el-menu-item index="2" route="/wx/index">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
    </div>
    <!--main-->
    <div class="main-container">
      <section class="app-main">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </section>
    </div>
  </el-container>

</template>

<script>
  export default {
    created() {
      this.getBreadcrumb()
      console.log(this.levelList)
    },
    data() {
      return {
        levelList: null,
        username:this.$store.state.user.username
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'home') {
          matched = [{path: '/home', meta: {title: '首页'}}].concat(matched)
        }
        this.levelList = matched
      },
      logout(){
        this.$store.dispatch('LogOut').then(()=>{
          this.$router.push({path:'/login'})
        })
      }

    }
  }
</script>

<style scoped>
  .aside-container {
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: #545C64;
  }

  .main-container {
    margin-left: 181px;
    margin-top: 20px;
  }

  .header {
    margin-left: 181px;
    margin-top: 15px;
    border-bottom: 1px solid #C1CFE0;
    padding: 0;
  }

  .huanying{
    float: right;
  }
  .huanying span{
    color: #409EFF;
  }
  .navbar{
    font-size: 20px;
  }


</style>
