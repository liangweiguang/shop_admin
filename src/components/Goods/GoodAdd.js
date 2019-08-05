// 引入富文本的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 引入富文本的组件
import { quillEditor } from 'vue-quill-editor'

/* eslint-disable*/
export default {
  // 注册富文本的组件
  components: {
    quillEditor
  },
  data() {
    return {
      // 控制步骤条
      activeIndex: 1,
      // 控制标签页
      activeName: 'one',
      // 第一步里的表单数据
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '', // 用来绑定富文本
        pics: [],
        radio: true
      },
      // 级联选择器的options数据
      options: [],
      // 级联选择器的默认配置
      defaultProps: {
        label: 'cat_name',
        // 收集数据
        value: 'cat_id'
      },
      // 第二步图片组件上传的数据
      dialogImageUrl: '',
      dialogVisible: false,
      // 设置请求头
      headers: {
        Authorization: localStorage.getItem('token')
      },
      // 富文本的默认配置
      editorOption: {
        placeholder: '我是北帅帅'
      }
    }
  },
  created() {
    this.loadCatList()
  },
  methods: {
    // 点击tab切换时，步骤条跟着变
    tabChange(tab) {
      this.activeIndex = +tab.index + 1
    },
    // 按钮的下一步
    next(index, name) {
      this.activeIndex = index
      this.activeName = name
    },
    // 发送请求获取所有的商品数据列表(三层)
    async loadCatList() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      // 替换 级联选择器的options数据
      this.options = res.data.data
    },
    // 图片上传的相关方法
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 图片预览的方法
    handlePictureCardPreview(file) {
      // 存预览图片的地址
      this.dialogImageUrl = file.url
      // 预览图片的对话框可见
      this.dialogVisible = true
    },
    // 图片存储成功
    uploadPic(res) {
      // 把获取到的临时路径替换掉
      this.addGoodsForm.pics.push({
        pic: res.data.tmp_path
      })
    },
    // 添加商品
    async addGoods() {
      // 结构第一步里的表单数据
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      } = this.addGoodsForm
      let res = await this.$axios.post('goods', {
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      })
      // console.log(res)
      if (res.data.meta.status === 201) {
        // 提示
        this.$message({
          message: '添加商品成功',
          type: 'success',
          duration: 800
        })
        // 跳转到商品列表
        this.$router.push('/goods')
      }
    }
  }
}
