/* eslint-disable */
export default {
  data() {
    return {
      // 表格数据
      usersData: [
        {
          username: '王小虎',
          email: 'huhu@123.com',
          mobile: '1233211234567'
        }
      ],
      // total 总页数
      total: 0,
      // 当前页数
      pagenum: 1,
      // 搜索框的内容
      input3: '',
      // 是否显示添加用户的对话框
      dialogAddUserVisible: false,
      // 添加用户对话框里的用户表单的数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 是否显示编辑用户的对话框
      dialogEditFormVisible: false,
      // 编辑用户的表单数据
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      // 是否显示分配角色的对话框
      dialogAssignUserFormVisible: false,
      // 分配角色对话框的内容
      assignUserFormData: {
        username: '北帅',
        id: 0, // 用户id
        rid: '' // 角色id
      },
      // 所有角色列表的数据
      rolesData: [],
      // 校验规则
      rules: {
        // 用户名
        username: [
          // 填不填
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        // 密码
        password: [
          // 填不填
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 判断格式
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          // 判断格式
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        // 手机号
        mobile: [
          // 判断格式
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getUsersData()
    this.loadRoles()
  },
  methods: {
    // 加载用户列表数据
    async getUsersData(pagenum = 1, query = '') {
      // 参数对象
      let config = {
        // 参数对象
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let res = await this.$axios.get('users', config)
      // 替换表格数据
      this.usersData = res.data.data.users
      // 替换total
      this.total = res.data.data.total
      // 替换当前页
      this.pagenum = res.data.data.pagenum
    },
    // 点击切换页数
    currentPageChang(curPage) {
      this.getUsersData(curPage, this.input3)
    },
    // 搜索
    search() {
      // 请求内容 t 的第一页内容
      this.getUsersData(1, this.input3)
    },
    // 显示添加用户的对话框
    showAddUserDialog() {
      this.dialogAddUserVisible = true
    },
    // 点击确定时添加用户
    async addUser() {
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status === 201) {
        // 关闭对话框
        this.dialogAddUserVisible = false
        // 提示
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 1000
        })
        // 刷新一下
        this.getUsersData(1)
      }
    },
    // 关闭对话框时清空表单(监听对话框关闭)
    dialogClosed() {
      this.$refs.addUserRef.resetFields()
    },
    // 改变状态的
    async stateChange(row) {
      // 把传过来的scope.row对象结构
      const { id, mg_state } = row
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
      if (res.data.meta.status === 200) {
        // 提示
        this.$message({
          message: '更新状态成功',
          type: 'success',
          duration: 1000
        })
      }
    },
    // 删除用户
    async deleteUser(id) {
      let res = await this.$axios.delete(`users/${id}`)
      // 来个提示
      this.$message({
        message: '删除成功',
        type: 'success',
        duration: 1000
      })
      // 刷新一下
      this.getUsersData(1)
    },
    // 编辑用户
    showEditUserDialog(row) {
      // 显示对话框
      this.dialogEditFormVisible = true
      // 把邮箱和手机号解构出来
      const { email, mobile, username, id } = row
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.username = username
      this.editUserForm.id = id
    },
    // 编辑用户的请求
    async editUser() {
      // 解构编辑对话框数据
      const { id, email, mobile } = this.editUserForm
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogEditFormVisible = false
        // 提示
        this.$message({
          message: '更新用户成功',
          type: 'success',
          duration: 1000
        })
        // 刷新一下
        this.getUsersData(this.pagenum, this.input3)
      }
    },
    // 点击显示分配角色对话框之前先要获取到所有的角色的数据
    async loadRoles() {
      let res = await this.$axios.get('roles')
      // 把所有角色列表的数据替换掉
      this.rolesData = res.data.data
    },
    // 点击显示分配角色的对话框
    async showAssignRoles(row) {
      this.dialogAssignUserFormVisible = true
      // 可以获取到用户id和用户名 但是获取不到角色id
      const { id, username } = row
      // 把原先写死的分配角色的对话框里的数据替换
      this.assignUserFormData.username = username
      this.assignUserFormData.id = id
      // 可以通过用户id发送请求去获取角色的id
      let res = await this.$axios.get(`users/${id}`)
      // 该用户之前可能什么角色也没有 所以需要三元区判断一下
      this.assignUserFormData.rid =
        res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    // 点击确定发送请求修改角色
    async assignRoles() {
      // 把分配角色对话框里的数据结构
      const { id, rid } = this.assignUserFormData
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogAssignUserFormVisible = false
        // 提示
        this.$message({
          message: '分配角色成功',
          type: 'success',
          duration: 1000
        })
        // 刷新一下
        this.getUsersData(this.pagenum, this.input3)
      }
    }
  }
}
