<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140"></el-table-column>
        <el-table-column label="操作" width="130">
          <template>
            <div>
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品列表
      goodsList: [],
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 总数据条数
      total: 0
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败')
      this.$message.success('获取商品列表成功')
      this.goodsList = res.data.goods
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped></style>
