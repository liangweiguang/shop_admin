<template>
  <div>
    <el-table
      :data="usersData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作"
      >
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size='2'
      :current-page='pagenum'
      @current-change='currentPageChang'
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 表格数据
      usersData: [{
        username: '王小虎',
        email: 'huhu@123.com',
        mobile: '1233211234567'
      }],
      // total 总页数
      total: 0,
      // 当前页数
      pagenum: 1
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 加载用户列表数据
    getUsersData (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        // 参数对象
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        // 请求头对象
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res)
        // 替换表格数据
        this.usersData = res.data.data.users
        // 替换total
        this.total = res.data.data.total
        // 替换当前页
        this.pagenum = res.data.data.pagenum
      })
    },
    // 点击切换页数
    currentPageChang (curPage) {
      this.getUsersData(curPage)
    }
  }
}
</script>

<style>
</style>
