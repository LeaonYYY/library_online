<template>
    <div id="app">
        <div id="box_nav">
            <div id="nav_head">
                <div id="head_img" style="flex:8">
                    <img src="../../assets/harry.png" alt="" id="img">
                    <span id="btn_quit">
                        <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            <i class="el-icon-menu" style="color:white;font-size:20px"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command= 'self'>个人信息</el-dropdown-item>
                            <el-dropdown-item command='quit'>退出</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <span id="btn_msg">
                        <el-badge is-dot :hidden="!isNewMsg">
                            <i class="el-icon-bell" style="font-size:30px;" @click="msgVisible = true"></i>
                        </el-badge>
                    </span>
                </div>
                <div id="head_name" style="flex:2">
                    <div style="position:absolute;top:20px;left:90px;color:white;font-size:20px;font-weight:600">{{username}}</div>
                    <span><img src="../../assets/129.png" alt="" style="position:absolute;height:20px;top:-10px;right:50px"></span>
                </div>
            </div>
            <div id="nav_content">
                <div id="nav">
                    <el-menu :default-active="this.$route.path" router>
                        <el-menu-item index="/booksCharge">
                        <i class="el-icon-notebook-2" style="margin:0;color:#05a3ff"></i> 图书管理
                        </el-menu-item>
                        <el-menu-item index="/usersCharge">
                        <i class="el-icon-s-custom" style="margin:0;color:#05a3ff"></i>用户管理
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
        </div>
        <div id="box_content">
             <router-view></router-view>
        </div>
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
         <div id="selfData">
           <el-dialog :visible.sync="selfVisible" width="30%" top="6vh" :style="{'padding':0}">  
            <div id="selfBox">
              <div style="text-align:center;color:#ecc054;font-size:25px;font-weight:500">普通管理员</div>
              <div style="text-align:center">
                <el-image :src='userAvator' style="height:90px;width:90px;border-radius:45px;"></el-image>
              </div>
              <div class="selfLines">昵称：{{username}}</div>
              <div class="selfLines">姓名：{{realname}}</div>
              <div class="selfLines">手机号：{{tel}}</div>
              <div class="selfLines">学号：{{userid}}</div>
              <div class="selfLines">上任时间：{{time}}</div>
              <div style="height:100px;margin-left: 70px;">个人简介：
                <p style="margin: 0">
                  {{ins}}
                </p></div>
            </div>
           </el-dialog>
         </div>
    </div>
</template>
<script>
export default {
  name: 'manager',
  data () {
    return {
      username: 'Leaon',
      realname:'李狗蛋',
      tel:'17606051741',
      userid:'031902524',
      time:'2021/8/21',
      ins:'这个管理员很神秘，没有任何简介',
      isNewMsg: true,
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
      ],
      selfVisible: false,
      userAvator: require('../../assets/harry.png')
    }
  },
  methods: {
    handleQuit () {
      this.$router.push('/')
    },
    handleCommand(command){
      if(command ==='quit'){
        this.handleQuit()
      }
      if(command ==='self'){
        this.selfVisible = true
      }
    }
  }
}
</script>
<style  scoped>
  #app {
      height: 700px;
      display: flex;
  }
  #box_nav {
      flex: 2;
      display: flex;
      flex-direction: column;
  }
  #box_content {
      flex: 10;
  }
  #nav_head {
      flex: 4;
      background-color: cadetblue;
      display: flex;
      flex-direction: column;
      background-color: #343442;
      border-bottom: solid 2px white;
      position: relative;
  }
  #img {
      height:140px;
      width:140px;
      border-radius:70px;
      position: absolute;
      top: 35px;
      left: 55px;
  }
  #btn_quit{
      position: absolute;
      top: 5px;
      right: 5px;
  }
  #btn_quit:hover{
      cursor: pointer;
  }
  #btn_msg{
      position: absolute;
      top: 10px;
      left: 5px;
  }
  #head_name {
      position: relative;
  }
  #nav_content {
      flex: 7;
      background-color: #343442;
  }
  .el-menu {
      width: 80%;
      margin-left: 10%;
      background-color: #343442;
      border: 0;
  }
  .el-menu .el-menu-item {
      padding: 0 !important;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin: 10px 0;
      border-radius: 20px;
      color: #05a3ff;
  }
  .el-menu .el-menu-item.is-active{
      color: #343442;
      background-color: white;
  }
  .el-icon-bell {
      color: white;
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
 #selfBox{
   height:480px;
   background-image: url(../../assets/金色边框.png);
   background-size: 100% 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   padding: 60px 40px;
 }
 #selfData .el-dialog__wrapper >>> .el-dialog__body {
    padding: 0;
  }
 #selfData .el-dialog__wrapper >>> .el-dialog__header {
    padding: 10px;
  }
  .selfLines {
    width: 280px;
    margin-left: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    font-weight: 400;
  }
</style>
