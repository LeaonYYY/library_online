<template>
    <div id="box_main">
       <div id="app">
        <div>&nbsp;</div>
        <el-row id="nav">
            <el-col :span="8">
                <el-menu mode="horizontal" :default-active="this.$route.path" router>
                  <el-menu-item index="/library" class="btn_nav"><i class="el-icon-reading" style="font-size:70px;width:100px;margin:20 0 0 0"></i><div style="height:30px;line-height:30px;font-weight:600">已上架</div></el-menu-item>
                  <el-menu-item index="/mine" class="btn_nav"><i class="el-icon-collection" style="font-size:70px;width:100px;margin:20 0 0 0"></i><div style="height:30px;line-height:30px;font-weight:600">我的借阅</div></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="4"><img src="../../assets/44.png" alt="" style="height:99px;margin-top:22px"></el-col>
        </el-row>
        <router-view></router-view>
    </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style scoped>
 #box_main {
       background-color: rgb(236, 232, 233);
 }
 #app{
    height: 657px;
    width: 90%;
    margin-left: 5%;
    background-image: url(../../assets/60.png);
    background-size: 100% 100%;
 }
 #nav{
    height: 120px;
    background-color: #fff;
    width: 90%;
    margin-left: 5%;
    border-bottom: 3px solid orange;
 }
 .el-menu {
    width: 300px;
    height: 119px;
 }
 .el-menu .el-menu-item {
    height: 120px;
    width: 150px;
    padding: 0;
    border-bottom: 3px solid orange !important;
 }
 .el-menu .el-menu-item:hover {
     background-color: rgb(207, 205, 205);
 }
 .el-menu .el-menu-item.is-active {
    color: orange;
    background-color: rgb(248, 233, 204);
    border: 0;
 }
 .btn_nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 119px;
 }
</style>
