<template>
  <div id="box_1">
    <el-menu mode="horizontal" :default-active="this.$router.path" router id="box_menu">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/library">图书馆</el-menu-item>
      <el-menu-item index="/advice">意见</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #box_1{
   height: 100%;
 }

</style>
