<template>
    <div id="app">
        <div id="box_head">
            <div id="head">现有管理员</div>
            <div id="search">
                <el-input placeholder="输入想搜索的管理员名" v-model="serchname" @keyup.native.enter="handleSerch" suffix-icon="el-icon-search" clearable ></el-input>
            </div>
        </div>
        <div id="box_content">
            <div id="content_body">
                <el-row style="height:40px;line-height:40px;font-weight:600;font-size:20px">
                    <el-col :span="2">编号</el-col>
                    <el-col :span="9">管理员昵称</el-col>
                    <el-col :span="4">姓名</el-col>
                    <el-col :span="9">上任时间</el-col>
                </el-row>
                <el-row v-for="item in itemsMode" :key="item.id" id="body_main" @click.native="managerShow(item)">
                    <el-col :span="2">{{item.ID}}</el-col>
                    <el-col :span="9">{{item.username}}</el-col>
                    <el-col :span="4">{{item.realname}}&nbsp;</el-col>
                    <el-col :span="9">{{item.CreatedAt}}</el-col>
                </el-row>
            </div>
            <div id="content_foot">
                <div id="btn_addBook" @mouseover='view1 = true' @mouseleave="view1 = false">
                  <el-button @click="addManagerVisible = true">
                    <div style="display:flex;align-items:center" >
                      <i class="el-icon-circle-plus-outline" style="font-size:25px;line-height:40px"></i>
                      <div style="height:30px;line-height:30px;" v-if="view1">添加新管理员</div>
                    </div>
                  </el-button>
                </div>
                <el-pagination
                current-page.sync="1"
                :page-size="8"
                layout="prev, pager, next, jumper"
                :total="itemsNum"
                @current-change = 'handleCurrentChange'
                style="margin-left:850px;margin-top:20px">
            </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="addManagerVisible" width="30%">
          <div id="add_head">
            <div id="head_img" style="flex:2;">
              <el-upload
               class="avatar-uploader"
               action="#"
               :show-file-list="false"
               :on-change="handleAvatarChange"
               :before-upload="beforeAvatarUpload"
               :http-request="addBookAvatar">
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
            </div>
            <div style="flex:8;display:flex;flex-direction:column;justify-content:space-around;margin-left:20px;">
              <div style="text-align: center"><img src="../../assets/129.png" alt=""></div>
              <div><el-input placeholder="用户名" v-model="addManager_username"></el-input></div>
              <div><el-input placeholder="密码" v-model="addManager_psw"></el-input></div>
            </div>
          </div>
          <div class="adding"><el-input placeholder="邮箱" v-model="addManager_email"></el-input></div>
          <div class="adding"><el-input placeholder="手机号" v-model="addManager_tel"></el-input></div>
          <div id="add_body" style="margin:20px 0;">
            <el-input type="textarea" :maxlength="250" show-word-limit v-model="addManager_ins" :rows="6" placeholder="内容简介"></el-input>
          </div>
          <div id="add_foot">
            <el-button @click="handleAddAdmin">添加</el-button>
          </div>
        </el-dialog>
        <div id="selfData">
           <el-dialog :visible.sync="managerVisible" width="30%" top="6vh" :style="{'padding':0}">  
            <div id="selfBox">
              <div style="text-align:center;color:#ecc054;font-size:25px;font-weight:500">普通管理员</div>
              <div style="text-align:center">
                <el-image :src="'http://8.130.51.87:3000/'+pickManager.head" style="height:90px;width:90px;border-radius:45px;"></el-image>
              </div>
              <div class="selfLines">昵称：{{pickManager.username}}</div>
              <div class="selfLines">姓名：{{pickManager.realname}}</div>
              <div class="selfLines">手机号：{{pickManager.phone}}</div>
              <div class="selfLines">邮箱：{{pickManager.email}}</div>
              <div class="selfLines">上任时间：{{pickManager.CreatedAt}}</div>
              <div style="height:70px;margin-left: 70px;">个人简介：
                <p style="margin: 0">
                  {{pickManager.ins}}
                </p></div>
               <div style="text-align:center" ><el-button id="btn_change" @click="handleDelete(pickManager.ID)">删除</el-button></div>
            </div>
           </el-dialog>
         </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      serchname: '',
      items: [
        {
          id: 1,
          username: '工具人1',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132,
          userAvator: require('../../assets/harry.png')
        },
        {
          id: 2,
          username: '工具人2',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 3,
          username: '工具人3',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 4,
          username: '工具人4',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 5,
          username: '工具人5',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 6,
          username: '工具人6',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 7,
          username: '工具人7',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 8,
          username: '工具人8',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 9,
          username: '工具人9',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
        {
          id: 10,
          username: '工具人10',
          realname: '李狗蛋',
          userid: '031902000',
          time: '2021/8/21',
          ins: '啥都没有',
          tel: 132123132
        },
      ],
      itemsMode: [],
      itemsNum: 0,
      view1: false,
      addManagerVisible: false,
      imageUrl: '',
      pickManager: {},
      managerVisible: false,
      addManager_username: '',
      addManager_email: '',
      addManager_psw: '',
      addManager_tel: '',
      addManager_ins: ''
    }
  },
  methods: {
    handleSerch () {
      this.$axios({
        url: '/api/v1/admin/search?username='+this.serchname+'&pagesize=2&pagenum=1',
        method: 'post'
      }) .then((res) =>{
        if(res.data.data.length ===0){
          this.$message({
            message: '找不到相关用户',
            type: 'error'
          })
          this.$router.go(0)
        }else{
          this.itemsMode = []
           for(let i=0;i<res.data.data.length;i++){
            this.$set(this.itemsMode,i,res.data.data[i])
            this.itemsMode[i].CreatedAt = res.data.data[i].CreatedAt.slice(0,10)
          }
        }
      })
    },
    handleCurrentChange (val) {
      this.itemsMode = []
      this.$axios({
          url: '/api/v1/admins?pagesize=8&pagenum='+val,
          method: 'get'
        }) .then((res)=>{
          for(let i=0;i<res.data.data.length;i++){
            this.$set(this.itemsMode,i,res.data.data[i])
            this.itemsMode[i].CreatedAt = res.data.data[i].CreatedAt.slice(0,10)
          }
          this.itemsNum = res.data.num
        })
    },
    handleAvatarChange (file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addBookAvatar (file) {
    },
    managerShow (item) {
      this.pickManager = item
      this.managerVisible = true
    },
    handleDelete(id){
      this.$axios({
        url: '/api/v1/admin/delete/'+id,
        method: 'put',
        headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')
        }
      }) .then((res)=>{
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$router.go(0)
      })
    },
    handleAddAdmin() {
      if(this.addManager_username === '' || this.addManager_email ==='' || this.addManager_tel ==='' || this.addManager_psw ===''){
          this.$message({
              message: '输入框不能为空',
              type: 'error'
          })
          return
      }
      var reg1 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(!reg1.test(this.addManager_email)){
          this.$message({
              message: '邮箱格式错误',
              type: 'error'
          })
          return
      }
      var reg2 = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      if(!reg2.test(this.addManager_tel)){
          this.$message({
              message: '手机号格式错误',
              type: 'error'
          })
          return
      }
      var params = new FormData()
      params.append('username',this.addManager_username)
      params.append('password',this.addManager_psw)
      params.append('email',this.addManager_email)
      params.append('phone',this.addManager_tel)
      params.append('imag','')
      this.$axios({
        url: '/api/v1/admin/creat',
        method: 'put',
        data: params,
        headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')
        }
      }) .then((res) =>{
        console.log(res);
        if(res.data.status === '管理员创建成功') {
          this.$message({
            message: '管理员添加成功',
            type: 'success'
          })
          this.$router.go(0)
        }else {
          this.$message({
            message: '用户已存在',
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    this.$axios({
      url: '/api/v1/admins?pagesize=8&pagenum=1',
      method: 'get'
    }) .then((res)=>{
      console.log(res);
      for(let i=0;i<res.data.data.length;i++){
        this.$set(this.itemsMode,i,res.data.data[i])
        this.itemsMode[i].CreatedAt = res.data.data[i].CreatedAt.slice(0,10)
      }
      this.itemsNum = res.data.num
    })
  }
}
</script>
<style scoped>
    .el-col {
      text-align: center;
    }
    #app {
      height:700px;
      display: flex;
      flex-direction: column;
    }
    #box_head {
        flex:2;
        border-bottom: 3px solid #343442;
        position: relative;
    }
    #head {
        height: 50px;
        width: 350px;
        background-color: #343442;
        font-size: 25px;
        color: #f9d19a;
        line-height: 50px;
        text-align: center;
        font-family: "Hiragino Sans GB";
    }
    #search {
        position: absolute;
        bottom: -7px;
        right: 150px;
        height: 50px;
        width: 300px;
        text-align: center;
        line-height: 50px;
        background-color: #fff;
    }
    #search .el-input {
        width: 300px;
        height: 40px;
    }
    #search .el-input /deep/ .el-input__inner {
        padding: 0;
        border: 2px solid #343442;
        border-radius: 20px;
        padding-left: 20px;
    }
    #box_content {
        flex:10;
        position: relative;
    }
    #content_body {
        display: inline-block;
        width: 80%;
        height: 83%;
        margin-left: 10%;
        margin-top: 20px;
    }
    #body_main {
        height: 55px;
        line-height: 55px;
        font-size:20px;
    }
    #body_main:hover {
        background-color: #343442;
        color: #f9d19a;
        cursor: pointer;
    }
    #content_foot {
        height: 13%;
    }
    .el-pagination {
        margin-top: 0 !important;
    }
    #btn_addBook {
        position: absolute;
        left: 100px;
        bottom: 30px;
    }
    #btn_addBook .el-button {
        padding: 0;
        height: 40px;
        font-size: 20px;
        color: #343442;
        line-height: 40px;
        background-color: #f9d19a;
        padding: 0 10px;
        border-radius: 20px;
    }
    #btn_addBook .el-button:hover {
        background:repeating-linear-gradient(to right,#f9d19a,#f1a73e);
    }
    #add_head {
        display: flex;
        height: 150px;
    }
    #head_img /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 ;
    border-radius: 75px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #head_img /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center; 
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  #add_head .el-input /deep/ .el-input__inner {
    border:1px solid #8c939d;
    border-radius: 20px;
  }
  .adding .el-input /deep/ .el-input__inner {
    border:1px solid #8c939d;
    border-radius: 20px;
  }
  .adding {
      margin: 12px 0;   
  }
  #add_foot {
    text-align: center;
  }
  #add_foot .el-button {
    width: 150px;
    color: white;
    background-color: #ffb855;
    border-radius: 20px;
    font-size: 17px;
    font-weight: 500;
  }
  #add_foot .el-button:hover {
    background-color: #df9f46;
  }
  #btn_delete {
    height: 40px;
    padding: 0;
    width: 150px;
    color: white;
    background-color: red;
    border-radius: 20px;
    font-size: 17px;
    font-weight: 500;
  }
  #btn_delete:hover{
    background-color: #bb0707;
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
  #btn_change {
      background-color: #e40000;
      color: white;
      font-weight: 500;
      font-size: 15px;
      border-radius: 20px;
  }
  #btn_change:hover {
      background-color: #bb0707;
  }
</style>
