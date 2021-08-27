<template>
    <div id="app">
        <div id="box_head">
            <div id="head">
              <img src="../../assets/131.png" alt="" style="height:50px;width:350px">
            </div>
            <div id="search">
                <el-input placeholder="输入想搜索的用户名关键词" v-model="serchname" @keyup.native.enter="handleSerch" suffix-icon="el-icon-search" clearable ></el-input>
            </div>
        </div>
        <div id="box_content">
            <div id="content_body">
                <el-row style="height:40px;line-height:40px;font-weight:600;font-size:20px">
                    <el-col :span="2">编号</el-col>
                    <el-col :span="7">用户名</el-col>
                    <el-col :span="4">姓名</el-col>
                    <el-col :span="7">所借书本数量</el-col>
                    <el-col :span="4">注册时间</el-col>
                </el-row>
                <el-row v-for="item in itemsMode" :key="item.id" id="body_main" @click.native="pickUser(item)">
                    <el-col :span="2">{{item.ID}}</el-col>
                    <el-col :span="7">{{item.username}}</el-col>
                    <el-col :span="4">{{item.realname}}&nbsp;</el-col>
                    <el-col :span="7">{{item.booksum}}</el-col>
                    <el-col :span="4">{{item.CreatedAt}}</el-col>
                </el-row>
            </div>
            <div id="content_foot">
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
        <el-dialog :visible.sync="userVisible" width="30%">
          <div style="display:flex;height:200px">
            <div style="flex:6;display:flex;flex-direction:column;justify-content:space-around">
              <div>用户名：{{userMode.username}}</div>
              <div>姓名：{{userMode.realname}}</div>
              <div>手机号：{{userMode.phone}}</div>
              <div>邮箱：{{userMode.email}}</div>
            </div>
            <div style="flex:4;display:flex;justify-content:center;align-items:center">
              <el-image :src="'http://8.130.51.87:3000/'+userMode.head" style="height:100px;width:100px;border-radius:50px;"></el-image>
            </div>
          </div>
          <h4>个人简介：</h4>
          <p style="height:100px;overflow:auto">{{userMode.introduce}}</p>
          <div style="text-align:center">
            <el-button type='danger' @click="handleDelete(userMode.ID)">删除</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      serchname: '',
      itemsMode: [],
      itemsNum: 0,
      userVisible: false,
      userMode: {}
    }
  },
  methods: {
    handleSerch () {
      this.$axios({
        url: '/api/v1/user/search?username='+this.serchname+'&pagesize=2&pagenum=1',
        method: 'post'
      }) .then((res) =>{
        if(res.data.data.length ===0){
          this.$message({
            message: '找不到相关用户',
            type: 'error'
          }),
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
      url: '/api/v1/users?pagesize=8&pagenum='+val,
      method: 'get',
      headers: {
        'Authorization': "Bearer "+localStorage.getItem('token1')
      }
    }).then((res)=>{
      console.log(res);
      for(let i=0;i<res.data.data.length;i++){
        this.$set(this.itemsMode,i,res.data.data[i])
        this.itemsMode[i].CreatedAt = res.data.data[i].CreatedAt.slice(0,10)
      }
      this.itemsNum = res.data.num
    })
    },
    pickUser (item) {
      this.userMode = item
      this.userVisible = true
    },
    handleDelete(id){
       this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: '/api/v1/user/'+id,
            method: 'delete',
            headers:{
              'Authorization': "Bearer "+localStorage.getItem('token1')
            }
          }).then((res)=>{
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$router.go(0)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  mounted () {
    this.$axios({
      url: '/api/v1/users?pagesize=8&pagenum=1',
      method: 'get',
      headers: {
        'Authorization': "Bearer "+localStorage.getItem('token1')
      }
    }).then((res)=>{
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
    .el-button:hover{
      transform: scale(1.1);
    }
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
        border-bottom: 3px solid #633dcd;
        position: relative;
    }
    #head {
        height: 50px;
        width: 350px;
        background-color: #633dcd;
        font-size: 25px;
        color: white;
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
    .el-input {
        width: 300px;
        height: 40px;
    }
    .el-input /deep/ .el-input__inner {
        padding: 0;
        border: 2px solid #633dcd;
        border-radius: 20px;
        padding-left: 20px;
    }
    #box_content {
        flex:10;
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
        background-color: #633dcd;
        color: white;
        cursor: pointer;
    }
    #content_foot {
        height: 13%;
    }
    .el-pagination {
        margin-top: 0 !important;
    }
</style>
