<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="bread"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
      :data="rightsData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==0">一级</span>
          <span v-else-if="scope.row.level==1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsData: [{
        path: 'goods',
        authName: '商品管理',
        level: '一级'
      }]
    }
  },
  created () {
    this.loadRightsList()
  },
  methods: {
    // 获取所有的权限列表
    async loadRightsList () {
      let res = await this.$axios.get('rights/list')
      // console.log(res)
      // 把获取到的数据赋值给表单
      this.rightsData = res.data.data
    },
    // 控制索引从0开始
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style scoped lang='less'>
.bread {
  height: 40px;
  background-color: #d4dae0;
  text-align: center;
  line-height: 40px;
  padding-left: 20px;
}
</style>
