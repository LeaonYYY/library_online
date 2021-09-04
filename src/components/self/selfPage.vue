<template>
    <div id="app">
        <div id="box_head">
            <el-image :src="imag" class="userimg"></el-image>
            <span class="username">{{username}}</span>
        </div>
        <div id="box_content">
            <div id="datas">
                <div>用户名：{{username}}</div>
                <div>姓名：{{realname}}</div>
                <div>手机号：{{usertel}}</div>
                <div>邮箱：{{email}}</div>
            </div>
            <div id="introduce">
                <h3>个人简介</h3>
                <p v-if="!isChange">{{userins}}</p>
                <el-input clearable maxlength="150" show-word-limit type="textarea" v-if="isChange" v-model="userins" :rows="8"></el-input>
                <div>
                    <el-button type="primary" class="btn_changeIns" @click="changeVisible =true" v-if="!isChange">修改</el-button>
                    <el-button type="primary" class="btn_changeIns" @click="isChange = false" v-if="isChange">保存</el-button>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="changeVisible" title="修改资料" width="30%" >
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
               <div>用户名：{{username}}</div>
               <div><el-input placeholder="真实姓名" v-model="realname_c"></el-input></div>
               <div><el-input placeholder="手机号" v-model="tel_c"></el-input></div>
               <div><el-input placeholder="邮箱" v-model="email_c"></el-input></div>
               <div><el-input placeholder="个人简介" type="textarea" :rows="3" v-model="ins_c"></el-input></div>
               <div style="text-align:center"><el-button type="primary" @click="handleChange">修改</el-button></div>
             </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      id: 0,
      username: '',
      realname: '',
      usernum: '',
      usertel: '',
      email: '',
      imag:'',
      userins: '',
      userImg: require('../../assets/4.png'),
      money: 648,
      isChange: false,
      changeVisible: false,
      realname_c:'',
      tel_c: '',
      email_c: '',
      ins_c: '',
      imageUrl: '',
      avator_add: {}
    }
  },
  methods:{
      handleChange(){
          if(this.ins_c === '' || this.realname_c ==='' || this.email_c ==='' || this.tel_c ===''){
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
          params.append('username',this.username)
          params.append('imag',this.avator_add.raw,this.avator_add.name)
          params.append('phone',this.tel_c)
          params.append('email',this.email_c)
          params.append('introduce',this.ins_c)
          params.append('realname',this.realname_c)
          this.$axios({
              url: '/api/v1/user/'+this.id,
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
          console.log(res);
          this.username =res.data.data.username
          this.usertel = res.data.data.phone
          this.realname = res.data.data.realname
          this.userins = res.data.data.introduce
          this.email = res.data.data.email
          this.imag = res.data.data.head
          this.id = res.data.data.ID
      })
  }
}
</script>
<style scoped>
h3,p {
    margin:0
}
 #app{
    height: 657px;
    background-color: rgb(236, 232, 233);
 }
 #box_head {
     height: 230px;
     width: 90%;
     background-image: url('../../assets/1.png');
     background-size: 100% 100%;
     margin-left: 5%;
     position: relative;
     border-radius: 25px;
     box-shadow: 5px 5px 5px #888888;
 }
 .userimg{
     height: 100px;
     width: 100px;
     border-radius: 50px;
     position: absolute;
     left: 50px;
     top: 100px;
 }
 .username {
     position: absolute;
     left: 180px;
     top: 130px;
     font-size: 30px;
 }
 #box_content {
     height: 350px;
     width: 90%;
     margin-left: 5%;
     background-image: url('../../assets/11.png');
     background-size: 100% 100%;
     margin-top: 40px;
     display: flex;
     border-radius: 27px;
     box-shadow: 5px 5px 5px #888888;
 }
 #datas {
     height: 240px;
     width: 30%;
     display: flex;
     flex-direction: column;
     justify-content: space-around;
     margin-top: 45px;
     margin-left: 60px;
     border-right: 3px dashed gray;
 }
 #introduce {
     margin-top: 45px;
     width: 30%;
     margin-left:20px
 }
 #introduce P{
     height: 178px;
 }
 #btn_money{
     margin-left: 10px;
     width: 50px;
     height: 30px;
     padding: 0;
     color: #f9d19a;
     background-color: #38393d;
     margin-top: 20px;
 }
 .btn_changeIns {
     padding: 0;
     height: 30px;
     width: 70px;
 }
</style>
