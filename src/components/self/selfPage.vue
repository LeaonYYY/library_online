<template>
    <div id="app">
        <div id="box_head">
            <el-image :src="userImg" class="userimg"></el-image>
            <span class="username">{{username}}</span>
        </div>
        <div id="box_content">
            <div id="datas">
                <div>姓名：{{username_R}}</div>
                <div>学号：{{usernum}}</div>
                <div>手机号：{{usertel}}</div>
                <div>邮箱：{{usermail}}</div>
                <div>专业：{{usermajor}}</div>
            </div>
            <div id="introduce">
                <h3>个人简介</h3>
                <p v-if="!isChange">{{userins}}</p>
                <el-input clearable maxlength="150" show-word-limit type="textarea" v-if="isChange" v-model="userins" :rows="8"></el-input>
                <div>
                    <el-button type="primary" class="btn_changeIns" @click="isChange = true" v-if="!isChange">修改简介</el-button>
                    <el-button type="primary" class="btn_changeIns" @click="isChange = false" v-if="isChange">保存</el-button>
                </div>
                <div ><span style="color:#1cbb27">余额：{{money}}元</span><el-button id="btn_money" >充值</el-button></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      username: 'leaon',
      username_R: '杨少杰',
      usernum: '031902524',
      usertel: '17606051741',
      usermail: '1530395933@qq.com',
      usermajor: '计算机',
      userins: '这个人很懒，什么都没写',
      userImg: require('../../assets/4.png'),
      money: 648,
      isChange: false
    }
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
