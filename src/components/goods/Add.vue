<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px" label-position="top">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="addForm.goods_cat" :options="cateList" :props="cateProps" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      tabPosition: 'left',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0
      },
      addFormRules: {
        goods_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      // 商品分类列表
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取商品分类失败')
      this.cateList = res.data
    //   console.log(this.cateList)
    },
    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
