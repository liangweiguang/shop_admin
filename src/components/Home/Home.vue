<template>
  <el-container>
    <el-header>
      header
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style scoped>
h1 {
  color: red;
}
.el-container {
  height: 100%;
}

.el-header {
  background: #b3c1cd;
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
