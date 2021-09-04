<template>
    <div id="box_1">
        <div id="words">
            <p style="font-size:50px;font-weight:100;letter-spacing:5px">这是像星空</p>
            <p style="margin-left:50px"><span style="font-size:50px;font-weight:100;letter-spacing:5px">一样</span><span style="font-size:70px;font-weight:600;margin:0 20px">浩瀚</span><span style="font-size:50px;font-weight:100;letter-spacing:5px">的图书管理系统</span></p>
        </div>
        <div id="box_login" v-if='login_show'>
            <div id="box_login_tile">WELCOME</div>
            <div style="height:30px;display:flex"><img src="../../assets/user.png" style="height:30px;margin-left:20px"><input type="text" v-model="username" id='user_input' placeholder="请输入用户名"></div>
            <div style="height:30px;display:flex"><img src="../../assets/lock.png" style="height:30px;margin-left:20px"><input type="password" v-model="password" id='password_input' placeholder="请输入密码"></div>
            <div id="box_login_button">
                <div style="width:45px"></div>
                <el-button id="login_btn" @click="handleLogin">登录</el-button>
                <el-button id="sign_btn" @click="changeState">注册</el-button>
                <div style="width:45px"></div>
            </div>
        </div>
        <div id="box_sign" v-if="sign_show">
            <div style="font-size: 25px;
        text-align: center;
        color: white;height:40px;line-height:40px">注册</div>
            <div class="sign_input"><input type="text" placeholder="用户名" v-model="r_username"></div>
            <div class="sign_input"><input type="text" placeholder="邮箱" v-model="r_email"></div>
            <div class="sign_input"><input type="text" placeholder="手机号" v-model="r_tel"></div>
            <div class="sign_input"><input type="password" placeholder="密码(6-16个字符，区分大小写)" v-model="r_psw"></div>
            <div class="sign_input"><input type="password" placeholder="确认密码" v-model="r_checkPsw"></div>
            <div class="sign_btn"><el-button id='sign' @click="handleSign">注册</el-button>
            <a  @click="changeState">已有账号，快速登录</a></div></div>
    </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      username: '',
      password: '',
      login_show: true,
      sign_show: false,
      r_username:'',
      r_email: '',
      r_tel: '',
      r_psw: '',
      r_checkPsw: ''
    }
  },
  methods: {
    changeState () {
      if (this.login_show === true) {
        this.login_show = false
        this.sign_show = true
      } else {
        this.login_show = true
        this.sign_show = false
      }
    },
    handleLogin () {
      if (this.username === '') {
        alert('用户名不能为空')
        return 0
      }
      if (this.password === '') {
        alert('密码不能为空')
        return 0
      }
      var params = new FormData()
      params.append('username',this.username)
      params.append('password',this.password)
      this.$axios({
          url: '/api/v1/login',
          method: 'post',
          data: params
      }) .then((res) => {
          if(res.data.token){
            localStorage.setItem('loginStatus1','true')
            localStorage.setItem('token1',res.data.token)
            switch(res.data.role){
                case 0:
                    this.$router.push('/Smanager')
                    break
                case 1:
                    this.$router.push('/manager')
                    break
                case 2:
                    this.$router.push('/user')
                default:
                    break    
            }
          }else{
              this.$message({
                  message: '用户名或密码错误',
                  type: 'error'
              })
          }
      })
    },
    handleSign (){
      if(this.r_username === '' || this.r_email ==='' || this.r_tel ==='' || this.r_psw ==='' || this.r_checkPsw === ''){
          this.$message({
              message: '输入框不能为空',
              type: 'error'
          })
          return
      }
      var reg1 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(!reg1.test(this.r_email)){
          this.$message({
              message: '邮箱格式错误',
              type: 'error'
          })
          return
      }
      var reg2 = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      if(!reg2.test(this.r_tel)){
          this.$message({
              message: '手机号格式错误',
              type: 'error'
          })
          return
      }
      if(this.r_psw != this.r_checkPsw){
          this.$message({
              message: '两次输入的密码不一致',
              type: 'error'
          })
          return
      }
      var params = new FormData()
      params.append('username',this.r_username)
      params.append('email',this.r_email)
      params.append('phone',this.r_tel)
      params.append('password',this.r_psw)
      params.append('role',1)
      this.$axios({
          url: '/api/v1/user/add',
          method: 'post',
          data: params
      }) .then((res)=> {
          if(res.data.status === '创建成功') {
             this.$message({
                 message: '注册成功',
                 type: 'success'
             })
             this.$router.go(0)
          }else {
              console.log(res);
          }
      })
    }
  }
}
</script>
<style scoped>
    p {
        margin: 0;
    }
    input{
        border: 0;
        padding: 0;
    }
    #box_1{
        position: relative;
        height: 100%;
        width: 100%;
        background-image: url(../../assets/home_bp.png);
        background-size: 100% 100%;
    }
    #words {
        position: absolute;
        left: 60px;
        top:220px;
        color:white;
    }
    #box_login{
        height: 400px;
        width: 350px;
        position: absolute;
        left: 70%;
        top: 15%;
        background-color:rgba(0,0,0,0.45);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    #box_login_button{
        display: flex;
        justify-content: space-between;
    }
    #box_login_tile{
        font-family: 'Comic Sans MS';
        font-size: 45px;
        text-align: center;
        font-weight: 700;
        color: white;
    }
    #user_input{
        width:250px;
        height:30px;
        margin-left:20px;
        background: rgba(0,0,0,0);
        border-bottom:2px solid #157382;
        color: white;
        font-size: 20px;
    }
    #password_input{
        width:250px;
        height:30px;
        margin-left:20px;
        background: rgba(0,0,0,0);
        border-bottom:2px solid #157382;
        color: #bfbfbf;
        font-size: 20px;
    }
    #login_btn{
        border-radius: 10px;
        color: white;
        font-family: Arial;
        background-color: #048bcd;
        font-size: 20px;
        border:0
    }
    #login_btn:hover{
        transform: scale(1.1);
    }
    #sign_btn{
        border-radius: 10px;
        color: #bdbdbd;
        font-family: Arial;
        background-color:rgba(0,0,0,0);
        font-size: 20px;
        border:1px solid #4b86a1
    }
    #sign_btn:hover{
        transform: scale(1.1);
    }
    #box_sign {
        height: 400px;
        width: 350px;
        position: absolute;
        left: 70%;
        top: 15%;
        background-color:rgba(0,0,0,0.45);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .sign_input input{
        width: 200px;
        height: 25px;
        background-color: rgba(47, 163, 230, 0.25);
        color: #bfbfbf;
        border-radius: 5px;
    }
    .sign_btn {
        height: 80px;
        width: 100%;
        position: relative;
    }
    #sign {
        height: 40px;
        position: absolute;
        left: 135px;
        color:white;
        font-family: Arial;
        border-radius: 5px;
        background-color: #048bcd;
        border:0;
    }
    #sign:hover{
        transform: scale(1.1);
    }
    .sign_btn a {
        position: absolute;
        height: 20px;
        width: 150px;
        bottom: 5px;
        right: 2px;
        color: white;
        font-size: 15px;
        cursor: pointer;
        text-decoration: underline;
    }
</style>
