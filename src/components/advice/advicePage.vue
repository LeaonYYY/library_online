<template>
    <div id="app">
        <div id="box_advice">
            <div id="advice">
                <el-input type="textarea" :rows="13" v-model="advice_msg" placeholder="请在这里写下对管理员想说的话" :maxlength="400" show-word-limit></el-input>
            </div>
            <div id="btn_send"><el-button @click="handleAdvice">发送</el-button></div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      advice_msg: ''
    }
  },
  methods:{
    handleAdvice(){
      var params = new FormData()
      params.append('comment',this.advice_msg)
      this.$axios({
        url: '/api/v1/toadmin',
        method: 'post',
        data: params,
        headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')  
        }
      }) .then(res =>{
        this.$message({
          message: '发送成功',
          type: 'success'
        })
        this.$router.go(0)
      })
    }
  }
}
</script>
<style scoped>
 #app{
    height: 657px;
    background-color: rgb(236, 232, 233);
    display: flex;
    align-items: center;
 }
 #box_advice {
    height: 70%;
    width: 60%;
    background-image: url("../../assets/73.png");
    background-size: 100% 100%;
    position: relative;
 }
 #advice {
    width: 500px;
    position: absolute;
    right:-300px;
 }
 #btn_send{
    position: absolute;
    right:-70px;
    bottom: 20px;
 }
</style>
