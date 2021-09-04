<template>
  <div id="box_1">
    <el-row id="box_head">
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="7"><img src="../assets/组 65.png"></el-col>
      <el-col :span="6  "><el-menu mode="horizontal" :default-active="this.$route.path" router id="box_menu">
         <el-menu-item index="/self">个人主页</el-menu-item>
         <el-menu-item index="/books">图书查询</el-menu-item>
         <el-menu-item index="/advice">致信管理员</el-menu-item>
      </el-menu></el-col>
      <el-col :span="5"><img src="../assets/组 58.png" alt="" style="height:40px"></el-col>
      <el-col :span="1" style="height:47px;line-height:47px"><el-badge is-dot :hidden="!isNewMsg"><i class="el-icon-bell" style="font-size:30px;" @click="msgVisible = true"></i></el-badge></el-col>
      <el-col :span="1"><el-image :src="user.head" fit="fill" style="height:42px;width:42px;border-radius:21px"></el-image></el-col>
      <el-col :span="2" style="height:47px;line-height:47px"><span>{{user.username}}</span><el-button type="primary" class="btn_quit" @click="handleQuit">退出</el-button></el-col>
    </el-row>
    <el-dialog :visible.sync="msgVisible" title="消息通知" top="3vh" width="30%">
      <div id="msg_box">
        <div v-for="msg in msgs" :key="msg.id" style="height:100px;margin-bottom:20px">
          <div style="text-align:center">{{msg.Creattime}}</div>
          <div style="background-color: rgb(236, 232, 233);height:70px;display:flex;flex-direction:column;justify-content:space-around;border-radius:20px;">
            <h3 style="margin:0;margin-left:20px">通知</h3>
            <div style="margin-left:20px">{{msg.MsgUser}}:&nbsp;&nbsp;{{msg.MsgContext}}</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {},
      isNewMsg: true,
      userImg: require('../assets/4.png'),
      msgVisible: false,
      msgs: []
    }
  },
  methods: {
    handleQuit(){
      localStorage.setItem('loginStatus1','false')
      this.$router.push('/')
    }
  },
  mounted(){
    this.$axios({
      url: '/api/v1/user',
        method: 'get',
        headers: {
           'Authorization': "Bearer "+localStorage.getItem('token1')  
        }
    }) .then(res =>{
      this.user = res.data.data
    })
    this.$axios({
      url: '/api/v1/admin/msg',
      method: 'get',
      headers: {
           'Authorization': "Bearer "+localStorage.getItem('token1')  
        }
    }) .then(res =>{
      for(let i=0;i<res.data.message.length;i++){
        this.$set(this.msgs,i,res.data.message[i])
        this.msgs[i].Creattime = this.msgs[i].Creattime.slice(0,10)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #box_1{
   height: 100%;
 }
 .el-menu {
   height: 45px;
   width: 350px !important;
 }
 .el-menu .el-menu-item {
   height: 45px;
   line-height: 45px;
 }
 .el-menu .el-menu-item.is-active {
   background-color: rgb(33, 155, 255);
   color: white;
 }
 .el-menu .el-menu-item:hover {
   background-color: rgb(97, 182, 252);
   color: white;
 }
 #box_head {
   height: 47px;
   border-bottom: 3px solid rgb(209, 204, 204);
 }
 .btn_quit {
   height: 30px;
   width: 50px;
   line-height: 20px !important;
   text-align: center !important;
   padding: 0;
   margin-left: 10px;
 }
 .el-icon-bell:hover {
   transform: scale(1.1);
   cursor: pointer;
 }
 #msg_box {
   height: 500px;
   width: 100%;
   overflow: auto;
 }
 .el-dialog /deep/ .el-dialog__inner{
   background-color: rgb(236, 232, 233) !important;
 }
</style>
