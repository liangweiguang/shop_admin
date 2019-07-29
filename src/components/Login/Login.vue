<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col :span="8">
      <el-form
        :model="loginFrom"
        :rules="rules"
        ref="loginFrom"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginFrom.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginFrom.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="startLogin"
          >登录</el-button>
          <el-button
            type="danger"
            @click="resetLogin"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
// 引入axios的模块
import axios from 'axios'
export default {
  data () {
    return {
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.loginFrom.validate((valid) => {
        if (!valid) {
          this.$message({
            message: '登录失败',
            type: 'error',
            duration: 1000
          })
          return
        }
        // console.log('校验成功')
        axios.put('http://localhost:8888/api/private/v1/login', this.loginFrom).then((res) => {
          if (res.data.meta.status === 200) {
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 1000
            })

            // 跳转到home页 用编程式导航
            this.$router.push('/home')
          } else {
            this.$message({
              message: '登录失败',
              type: 'error',
              duration: 1000
            })
          }
        })
      })
    },
    resetLogin () {
      this.$refs.loginFrom.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 20px;
}
</style>
