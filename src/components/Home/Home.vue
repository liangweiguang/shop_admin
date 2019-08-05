<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img
            src="../../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span="8"
          class="col3"
        >
          恭喜北帅毕业薪资月薪18K <a
            href="#"
            @click.prevent="logout"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="handleUrlPath()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- submenu的  index :保证唯一 -->
          <el-submenu
            :index="item1.id+''"
            v-for="item1 in menusData"
            :key="item1.id"
          >
            <!-- 自定义的标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item-group
              v-for="item2 in item1.children"
              :key='item2.id'
            >
              <el-menu-item :index="'/'+item2.path">{{item2.authName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 嵌套路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data () {
    return {
      // 左侧所有的权限列表的数据
      menusData: []
    }
  },
  created () {
    this.loadLeftMenusdata()
  },
  methods: {
    // 动态加载左边的权限列表
    async loadLeftMenusdata () {
      let res = await this.$axios.get('menus')
      // 替换左侧所有的权限列表的数据
      this.menusData = res.data.data
    },
    // 退出登录
    async logout () {
      try {
        await this.$confirm('此操作将退出账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 0.退出成功之前需要把本地的token指令删除
        localStorage.removeItem('token')

        // 1.提示退出成功
        this.$message({
          type: 'success',
          message: '退出成功！',
          duration: 800
        })

        // 2.回到登录页
        this.$router.push('/login')
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消退出！',
          duration: 800
        })
      }
    },
    // 处理路径
    handleUrlPath () {
      if (this.$route.path === '/goods-add') {
        return '/goods'
      }
      return this.$route.path
    }
  }
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
}

.el-header {
  background: #b3c1cd;
  padding: 0;
  h1 {
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
  .col3 {
    text-align: right;
    line-height: 60px;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
