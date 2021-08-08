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
      <el-col :span="1"><el-image :src="userImg" fit="fill" style="height:42px;width:42px;border-radius:21px"></el-image></el-col>
      <el-col :span="2" style="height:47px;line-height:47px"><span>{{username}}</span><el-button type="primary" class="btn_quit">退出</el-button></el-col>
    </el-row>
    <el-dialog :visible.sync="msgVisible" title="消息通知" top="3vh" width="30%">
      <div id="msg_box">
        <div v-for="msg in msgs" :key="msg.id" style="height:100px;margin-bottom:20px">
          <div style="text-align:center">{{msg.date}}</div>
          <div style="background-color: rgb(236, 232, 233);height:70px;display:flex;flex-direction:column;justify-content:space-around;border-radius:20px;">
            <h3 style="margin:0;margin-left:20px">{{msg.head}}</h3>
            <div style="margin-left:20px">{{msg.content}}</div>
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
      username: 'leaon',
      isNewMsg: true,
      userImg: require('../assets/4.png'),
      msgVisible: false,
      msgs: [{
        id: 1,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 2,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 3,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 4,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 5,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 6,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 7,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 8,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 9,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      },
      {
        id: 10,
        date: '2021.8.9/9:20',
        head: '充值成功通知',
        content: '尊敬的用户，您已成功充值了50元快去借书吧'
      }
      ]
    }
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
   margin-left: 5%;
 }
 .el-dialog /deep/ .el-dialog__inner{
   background-color: rgb(236, 232, 233) !important;
 }
</style>
