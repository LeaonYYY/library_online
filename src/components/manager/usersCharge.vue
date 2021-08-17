<template>
    <div id="app">
        <div id="box_head">
            <div id="head">
              <img src="../../assets/131.png" alt="" style="height:50px;width:350px">
            </div>
            <div id="search">
                <el-input placeholder="输入想搜索的用户名" v-model="serchname" @keyup.native.enter="handleSerch" suffix-icon="el-icon-search" clearable ></el-input>
            </div>
        </div>
        <div id="box_content">
            <div id="content_body">
                <el-row style="height:40px;line-height:40px;font-weight:600;font-size:20px">
                    <el-col :span="2">编号</el-col>
                    <el-col :span="9">用户名</el-col>
                    <el-col :span="4">姓名</el-col>
                    <el-col :span="7">所借书本数量</el-col>
                    <el-col :span="2">余额</el-col>
                </el-row>
                <el-row v-for="item in itemsMode" :key="item.id" id="body_main" @click.native="pickUser(item)">
                    <el-col :span="2">{{item.id}}</el-col>
                    <el-col :span="9">{{item.username}}</el-col>
                    <el-col :span="4">{{item.name}}</el-col>
                    <el-col :span="7">{{item.lendNum}}</el-col>
                    <el-col :span="2">{{item.money}}</el-col>
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
              <div>姓名：{{userMode.name}}</div>
              <div>学号：{{userMode.usernum}}</div>
              <div>手机号：{{userMode.tel}}</div>
              <div>邮箱：{{userMode.mail}}</div>
              <div>专业：{{userMode.major}}</div>
            </div>
            <div style="flex:4;display:flex;justify-content:center;align-items:center">
              <el-image :src="userMode.avator" style="height:100px;width:100px;border-radius:50px;"></el-image>
            </div>
          </div>
          <h4>个人简介：</h4>
          <p style="height:100px;overflow:auto">{{userMode.ins}}</p>
          <div style="color:#1cbb27;margin-left:150px">
            余额：{{userMode.money}}元
          <el-button style="background-color:#38393d;color:#e4c190;margin-left:30px;border-radius:20px">充值</el-button>
          </div>
        </el-dialog>
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
          username: 'test1',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 2,
          username: 'test2',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 3,
          username: 'test3',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 4,
          username: 'test4',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 5,
          username: 'test5',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 6,
          username: 'test6',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 7,
          username: 'test7',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 8,
          username: 'test8',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 9,
          username: 'test9',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        },
        {
          id: 10,
          username: 'test10',
          name: 'test',
          lendNum: 18,
          money: 128,
          ins: '奥斯卡的吉安市开了多久阿杀了看得见爱上了科技大厦',
          usernum: '031902000',
          major: '计算机',
          mail: '1530395933@qq.com',
          tel: '17606051741',
          avator: require('../../assets/harry.png')
        }
      ],
      itemsMode: [],
      itemsNum: 0,
      userVisible: false,
      userMode: {}
    }
  },
  methods: {
    handleSerch () {
      alert('找不到')
    },
    handleCurrentChange (val) {
      this.itemsMode = this.items.slice((val - 1) * 8, val * 8)
    },
    pickUser (item) {
      this.userMode = item
      this.userVisible = true
    }
  },
  mounted () {
    this.itemsMode = this.items.slice(0, 8)
    this.itemsNum = this.items.length
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
