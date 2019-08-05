<template>
  <div>
    <el-button
      type="success"
      plain
      @click="addGoods"
    >添加商品</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column type="index">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.add_time|dateFilters}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [{
        goods_name: 'iphpne',
        goods_price: 128,
        goods_number: 10,
        add_time: 0
      }]
    }
  },
  filters: {
    dateFilters (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表的数据
    async getGoodsList () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res)
      this.goodsData = res.data.data.goods
    },
    // 添加商品
    addGoods () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
