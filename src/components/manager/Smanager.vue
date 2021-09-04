<template>
    <div id="app">
        <div id="box_nav">
            <div id="nav_head">
                <div id="head_img" style="flex:8">
                    <img :src="user.head" alt="" id="img">
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
                    <div style="position:absolute;top:20px;left:90px;color:#f9d19a;font-size:20px;font-weight:600">{{user.username}}</div>
                    <span><img src="../../assets/149.png" alt="" style="position:absolute;height:20px;top:-10px;right:30px"></span>
                </div>
            </div>
            <div id="nav_content">
                <div id="nav">
                    <el-menu :default-active="this.$route.path" router>
                        <el-menu-item index="/managerCharge">
                        <i class="el-icon-user-solid" style="margin:0;color:#343442"></i>增删管理员
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
                <div style="text-align:center">{{msg.Creattime}}</div>
                <div style="background-color: rgb(236, 232, 233);height:70px;display:flex;flex-direction:column;justify-content:space-around;border-radius:20px;">
                  <h3 style="margin:0;margin-left:20px">通知</h3>
                  <div style="margin-left:20px">{{msg.MsgUser}}:&nbsp;&nbsp;{{msg.MsgContext}}</div>
                </div>
              </div>
            </div>
         </el-dialog>
         <div id="selfData">
           <el-dialog :visible.sync="selfVisible" width="30%" top="6vh" :style="{'padding':0}">  
            <div id="selfBox">
              <div style="text-align:center;color:#ecc054;font-size:25px;font-weight:500">超级管理员</div>
              <div style="text-align:center">
                <el-image :src="user.head" style="height:90px;width:90px;border-radius:45px;"></el-image>
              </div>
              <div class="selfLines">昵称：{{user.username}}</div>
              <div class="selfLines">姓名：{{user.realname}}</div>
              <div class="selfLines">手机号：{{user.phone}}</div>
              <div class="selfLines">邮箱：{{user.email}}</div>
              <div style="height:100px;margin-left: 70px;">个人简介：
                <p style="margin: 0">
                  {{user.introduce}}
                </p></div>
                <div style="text-align:center">
                 <el-button type="primary" @click="changeVisible=true">修改</el-button>
               </div>
            </div>
           </el-dialog>
         </div>
         <div>
           <el-dialog :visible.sync="changeVisible" title="信息修改" width="30%">
             <div style="display:flex;flex-direction:column;justify-content:space-around;height:350px">
               <div style="text-align:center;">
                 <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :on-change="handleAvatarChange">
                    <img v-if="imageUrl" :src="imageUrl" style="height:50px;width:50px;border-radius:25px;display:block;">
                    <i v-else class="el-icon-plus" style="height:50px;width:50px;border-radius:25px;text-align:center;line-height:50px"></i>
                  </el-upload>
               </div>
               <div>用户名：{{user.username}}</div>
               <div><el-input placeholder="真实姓名" v-model="realname_c"></el-input></div>
               <div><el-input placeholder="手机号" v-model="tel_c"></el-input></div>
               <div><el-input placeholder="邮箱" v-model="email_c"></el-input></div>
               <div><el-input placeholder="个人简介" type="textarea" :rows="3" v-model="ins_c"></el-input></div>
               <div style="text-align:center"><el-button type="primary" @click="handleChange">修改</el-button></div>
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
      username:'',
      user: {},
      isNewMsg: true,
      msgVisible: false,
      msgs: [],
      selfVisible: false,
      changeVisible: false,
      realname_c:'',
      tel_c: '',
      email_c: '',
      ins_c: '',
      imageUrl: '',
      avator_add: {}
    }
  },
  methods: {
    handleChange(){
      if(this.realname_c ==='' || this.email_c ==='' || this.tel_c ==='' ||this.ins_c === ''){
              this.$message({
                  message: '输入框不能为空',
                  type: 'error'
              })
              return
          }
          var reg1 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if(!reg1.test(this.email_c)){
              this.$message({
                  message: '邮箱格式错误',
                  type: 'error'
              })
              return
          }
          var reg2 = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
          if(!reg2.test(this.tel_c)){
              this.$message({
                  message: '手机号格式错误',
                  type: 'error'
              })
              return
          }
          var params = new FormData()
          params.append('username',this.user.username)
          params.append('imag',this.avator_add.raw,this.avator_add.name)
          params.append('phone',this.tel_c)
          params.append('email',this.email_c)
          params.append('introduce',this.ins_c)
          params.append('realname',this.realname_c)
          this.$axios({
              url: '/api/v1/user/'+this.user.ID,
              method: 'put',
              data: params,
              headers: {
                  'Authorization': "Bearer "+localStorage.getItem('token1')  
              }
          }).then((res)=>{
             this.$message({
               message: '修改成功',
               type: 'success'
             })
             this.$router.go(0)
          })
    },
    handleAvatarChange (file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.avator_add = file
    },
    handleQuit () {
      localStorage.setItem('loginStatus1','false')
      this.$router.push('/')
    },
    handleCommand(command){
      if(command ==='quit'){
        this.handleQuit()
      }
      if(command ==='self'){
        this.$axios({
          url: '/api/v1/user',
          method: 'get',
          headers: {
            'Authorization': "Bearer "+localStorage.getItem('token1')
          }
        }) .then((res) => {
          this.user = res.data.data
        })
        this.selfVisible = true
      }
    }
  },
  mounted(){
    this.$axios({
      url: '/api/v1/user',
      method: 'get',
      headers: {
        'Authorization': "Bearer "+localStorage.getItem('token1')
      }
    }) .then((res)=>{
      this.user=res.data.data
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
      border-bottom: solid 2px #f9d19a;
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
      color: #343442;
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
