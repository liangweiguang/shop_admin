/* eslint-disable */
export default {
  data() {
    return {
      // 加载一级分类数据
      catData: [
        {
          cat_name: '大家电',
          cat_deleted: '有效',
          cat_level: '一级'
        }
      ],
      // 树形控件的默认配置
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      // 显示添加分类的对话框
      dialogAddCatFormVisible: false,
      // 添加分类对话框的表单数据
      addFormData: {
        cat_name: '', // 分类名称
        cat_pid_arr: [] // 父级分类名称的数组
      },
      // 级联选择的假数据
      options: [],
      // 级联选择器的默认配置
      defaultProps2: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created() {
    this.loadCatData1()
    this.loadCatData2()
  },
  methods: {
    // 第一次加载显示页面的一层分类数据
    async loadCatData1() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res)
      // 替换一级分类数据
      this.catData = res.data.data.result
    },
    // 点击显示添加分类的对话框
    showAddCatDialog() {
      this.dialogAddCatFormVisible = true
    },
    // 第二次加载二级分类的分类数据
    async loadCatData2() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      // 级联选择的假数据
      this.options = res.data.data
    },
    // 点击确定添加分类
    async addCat() {
      // 先是解构添加分类对话框的表单数据
      const { cat_name, cat_pid_arr } = this.addFormData
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], // 父id
        cat_name,
        cat_level: 2
      })
      if (res.data.meta.status === 201) {
        // 1.关闭对话框
        this.dialogAddCatFormVisible = false
        // 2.提示
        this.$message({
          message: '添加分类成功',
          type: 'success',
          duration: 800
        })
        // 3.刷新
        this.loadCatData1()
      }
    }
  }
}
