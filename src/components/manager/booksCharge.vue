<template>
    <div id="app">
        <div id="box_head">
            <div id="head">
              <img src="../../assets/130.png" alt="" style="height:50px;width:350px">
            </div>
            <div id="search">
                <el-input placeholder="输入想搜索的书名" v-model="serchname" @keyup.native.enter="handleSerch" suffix-icon="el-icon-search" clearable ></el-input>
            </div>
        </div>
        <div id="box_content">
            <div id="content_body">
                <el-row style="height:40px;line-height:40px;font-weight:600;font-size:20px">
                    <el-col :span="2">编号</el-col>
                    <el-col :span="9">书名</el-col>
                    <el-col :span="4">种类</el-col>
                    <el-col :span="7">出借数量</el-col>
                    <el-col :span="2">剩余数量</el-col>
                </el-row>
                <el-row v-for="item in itemsMode" :key="item.id" id="body_main" @click.native="bookShow(item)">
                    <el-col :span="2">{{item.id}}</el-col>
                    <el-col :span="9">{{item.name}}</el-col>
                    <el-col :span="4">{{item.type}}</el-col>
                    <el-col :span="7">{{item.lendNum}}</el-col>
                    <el-col :span="2">{{item.leftNum}}</el-col>
                </el-row>
            </div>
            <div id="content_foot">
                <div id="btn_addBook" @mouseover='view1 = true' @mouseleave="view1 = false">
                  <el-button @click="addbookVisible = true">
                    <div style="display:flex;align-items:center" >
                      <i class="el-icon-circle-plus-outline" style="font-size:25px;line-height:40px"></i>
                      <div style="height:30px;line-height:30px;" v-if="view1">添加新书</div>
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
        <el-dialog :visible.sync="addbookVisible" width="50%">
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
              <div><el-input placeholder="书名" v-model="addBook_name"></el-input></div>
              <div><el-input placeholder="作者" v-model="addBook_author"></el-input></div>
              <div style="display: flex;justify-content:space-between">
                <div><el-input placeholder="种类" v-model="addBook_type"></el-input></div>
                <div><el-input placeholder="上架数量" v-model="addBook_num"></el-input></div>
              </div>
            </div>
          </div>
          <div id="add_body" style="margin:20px 0;">
            <el-input type="textarea" :maxlength="250" show-word-limit v-model="addBook_ins" :rows="6" placeholder="内容简介"></el-input>
          </div>
          <div id="add_foot">
            <el-button>添加</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="bookVisible" width="30%">
          <div style="display:flex;height:150px">
            <div style="flex:4"><el-image :src="pickBook.img" alt="" style="height:150px"></el-image></div>
            <div style="flex:6;display:flex;justify-content:space-around;flex-direction:column;margin-left:70px">
              <h4>{{pickBook.name}}</h4>
              <div>出借：{{pickBook.lendNum}}本</div>
              <div>剩余：{{pickBook.leftNum}}本</div>
              <div>作者：{{pickBook.author}}</div>
              <div>上架时间：{{pickBook.update}}</div>
            </div>
          </div>
          <div style="margin:25px 0;height:100px;overflow: auto;">
            <p>{{pickBook.ins}}</p>
          </div>
          <div style="text-align:center">
            <el-button type="danger" id="btn_delete">
              下架
            </el-button>
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
          name: '哈利波特1',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 2,
          name: '哈利波特2',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 3,
          name: '哈利波特3',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 4,
          name: '哈利波特4',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 5,
          name: '哈利波特5',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 6,
          name: '哈利波特6',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 7,
          name: '哈利波特7',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 8,
          name: '哈利波特8',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 9,
          name: '哈利波特9',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 10,
          name: '哈利波特10',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        },
        {
          id: 11,
          name: '哈利波特11',
          type: '魔幻',
          lendNum: 2,
          leftNum: 66,
          ins: '啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒啊实打实大师多撒多军撒',
          img: require('../../assets/harry.png'),
          author: 'JK罗琳',
          update: '2021/8/16'
        }
      ],
      itemsMode: [],
      itemsNum: 0,
      view1: false,
      addbookVisible: false,
      bookVisible: false,
      imageUrl: '',
      tempUrl: '',
      addBook_name: '',
      addBook_author: '',
      addBook_type: '',
      addBook_num: '',
      addBook_ins: '',
      pickBook: {}
    }
  },
  methods: {
    handleSerch () {
      alert('找不到')
    },
    handleCurrentChange (val) {
      this.itemsMode = this.items.slice((val - 1) * 8, val * 8)
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
    bookShow (item) {
      this.pickBook = item
      this.bookVisible = true
    }
  },
  mounted () {
    this.itemsMode = this.items.slice(0, 8)
    this.itemsNum = this.items.length
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
        border-bottom: 3px solid #42914b;
        position: relative;
    }
    #head {
        height: 50px;
        width: 350px;
        background-color: #42914b;
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
    #search .el-input {
        width: 300px;
        height: 40px;
    }
    #search .el-input /deep/ .el-input__inner {
        padding: 0;
        border: 2px solid #42914b;
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
        background-color: #42914b;
        color: white;
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
        color: white;
        line-height: 40px;
        background-color: #42914b;
        padding: 0 10px;
        border-radius: 20px;
    }
    #btn_addBook .el-button:hover {
        background-color: #5daa66;
    }
    #add_head {
        display: flex;
        height: 200px;
    }
    #head_img /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 ;
    border-radius: 6px;
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
    width: 178px;
    height: 200px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 200px;
    display: block;
  }
  #add_head .el-input /deep/ .el-input__inner {
    border:1px solid #8c939d;
    border-radius: 20px;
  }
  #add_foot {
    text-align: center;
  }
  #add_foot .el-button {
    width: 150px;
    color: white;
    background-color: #42914b;
    border-radius: 20px;
    font-size: 17px;
    font-weight: 500;
  }
  #add_foot .el-button:hover {
    background-color: #3b8543;
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
</style>
