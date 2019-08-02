export default {
  data () {
    return {
      // 角色列表的数据
      rolesData: [
        {
          roleName: '主管',
          roleDesc: '技术负责人'
        }
      ],
      // 是否显示分配权限的对话框
      dialogAssignRolesVisible: false,
      // 树形结构的数据
      treeData: [],
      // 树形结构的默认配置
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 角色的id
      rolesId: 0
    }
  },
  created () {
    this.loadRolesList()
    this.loadRightsList()
  },
  methods: {
    // 自定义索引从0开始
    indexMethod (index) {
      return index
    },
    // 发送请求获取所有的角色列表
    async loadRolesList () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      // 获取成功把数据给表格的数据
      this.rolesData = res.data.data
    },
    // 发送请求获取所有的权限列表
    async loadRightsList () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      // 获取到数据赋值给树形结构的数据
      this.treeData = res.data.data
    },
    // 点击显示分配权限对话框
    showAssignRight (row) {
      this.dialogAssignRolesVisible = true

      // 通过传过来的row对象获取到所有的第三层id放到一个数组里
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })

      // 因为获取数据后，DOM去更新数据
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })

      // 修改角色的id
      this.rolesId = row.id
    },
    // 点击确定分配权限
    async assignRights () {
      // 获取到半选 和 全选的 key(id)
      let key1 = this.$refs.tree.getCheckedKeys()
      let key2 = this.$refs.tree.getHalfCheckedKeys()

      let keys = [...key1, ...key2]
      let res = await this.$axios.post(`roles/${this.rolesId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status === 200) {
        // 1. 关闭对话框
        this.dialogAssignRolesVisible = false
        // 2. 提示
        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })
        // 3. 刷新一下
        this.loadRolesList()
      }
    }
  }
}
