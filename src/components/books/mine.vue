<template>
    <div id="bookShow">
        <div>&nbsp;</div>
        <el-row id="book_head">
            <el-col :span="2" class="book_head_item">编号</el-col>
            <el-col :span="8" class="book_head_item">书名</el-col>
            <el-col :span="6" class="book_head_item">种类</el-col>
            <el-col :span="4" class="book_head_item">出借数量</el-col>
            <el-col :span="4" class="book_head_item">剩余数量</el-col>
        </el-row>
        <div id="books" >
          <el-row v-for="book in itemsMode" :key="book.id" id="book" @click.native="handlePickBook(book)">
            <el-col :span="2" class="book_item">{{book.ID}}</el-col>
            <el-col :span="8" class="book_item">{{book.bookname}}</el-col>
            <el-col :span="6" class="book_item">{{book.booktype}}</el-col>
            <el-col :span="4" class="book_item">{{book.borrowsum}}</el-col>
            <el-col :span="4" class="book_item">{{book.sum}}</el-col>
          </el-row>
        </div>
        <div id="serchL"><el-input v-model="serchBook" placeholder="请在这里写上书名后回车" suffix-icon="el-icon-search" @keyup.native.enter="serch_Book"></el-input></div>
        <div>
            <el-pagination
                current-page.sync="1"
                :page-size="7"
                layout="prev, pager, next, jumper"
                :total="itemsNum"
                @current-change = 'handleCurrentChange'
                style="margin-left:400px;margin-top:20px">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="bookVisible" id="bookDetail" style="padding-top:0px" top="2vh">
            <div id="bookDetail_head" style="margin-left:60px">
                <div style="height:200px;width:200px"><el-image :src="'http://8.130.51.87:3000/'+pickBook.imag"></el-image></div>
                <div style="display:flex;flex-direction:column;justify-content:space-around;margin-left:60px">
                    <div><h3 style="margin:0">{{pickBook.bookname}}</h3></div>
                    <div style="height:90px;width:300px;display:flex;flex-direction:row;justify-content:space-between">
                        <div style="display:flex;flex-direction:column;justify-content:space-around">
                            <div>作者：{{pickBook.author}}</div>
                             <div>上架时间：{{pickBook.CreatedAt}}</div>
                        </div>
                        <div id="btn_lend"><el-button @click="handleBack(pickBook.ID)">归还</el-button></div>
                    </div>
                    <div style="height:60px">介绍：{{pickBook.Introduce}}</div>
                </div>
            </div>
            <div id="bookDetail_body">
                <div style="width:450px;margin-left:130px;margin-top:10px;display:flex">
                    <el-input type="textarea" v-model="comment_now" maxlength="200" show-word-limit placeholder="期待您的高质量评价" :rows="3"></el-input>
                     <el-button type="primary"  @click="handleComment">发表</el-button>
                </div>
                <h4>精彩评论:</h4>
                <div id="comments">
                    <div class="comment" v-for="comment in comments" :key="comment.id">
                        <div><img src="../../assets/4.png" alt="" style="height:30px"></div>
                        <div style="display:flex;flex-direction:column">
                            <div style="height:30px;line-height:30px">{{comment.Commentuser}}&nbsp;&nbsp;&nbsp;&nbsp;{{comment.UpdatedAt}}</div>
                            <div>{{comment.Context}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'library',
  data () {
    return {
      serchBook: '',
      itemsMode: [],
      itemsNum: 0,
      bookVisible: false,
      comments: [],
      pickBook: {},
      comment_now: ''
    }
  },
  methods: {
    serch_Book () {
      this.$axios({
        url: '/api/v1/user/book/search?bookname='+this.serchBook+'&pagesize=2&pagenum=1',
        method: 'post',
         headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')
         }
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
    handleComment(){
      var params = new FormData()
      params.append('comment',this.comment_now)
      this.$axios({
        url:'/api/v1/comment/'+this.pickBook.ID,
        method: 'post',
        headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')
        },
        data: params
      }) .then((res)=>{
        this.$message({
          message: '发表成功',
          type: 'success'
        })
        console.log(res);
        var data = res.data.data
        data.UpdatedAt = data.UpdatedAt.slice(0,10)
        this.comments.unshift(data)
      })
    },
    handleCurrentChange (val) {
      this.itemsMode = []
      this.$axios({
      url: '/api/v1/user/books?pagesize=7&pagenum=1',
      method: 'get',
      headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')
      }
    }) .then((res)=>{
      console.log(res);
      for(let i=0;i<res.data.num.length;i++){
        this.$set(this.itemsMode,i,res.data.num[i])
        this.itemsMode[i].CreatedAt = res.data.num[i].CreatedAt.slice(0,10)
      }
      this.itemsNum = res.data.data
    })
    },
    handlePickBook (book) {
      this.comments = []
      this.pickBook = book
      this.bookVisible = true
      this.$axios({
        url: '/api/v1/comment/'+book.ID+'?pagesize=99&pagenum=1',
        method: 'get'
      }).then((res) =>{
        console.log(res);
        for(let i=0;i<res.data.data.length;i++){
            this.$set(this.comments,i,res.data.data[i])
            this.comments[i].UpdatedAt = res.data.data[i].UpdatedAt.slice(0,10)
          }
      })
    },
    handleBack(id){
      this.$axios({
        url: '/api/v1/user/book/return/'+id,
        method: 'post',
        headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')
        }
      }) .then((res)=>{
        this.$message({
          message: '还书成功',
          type: 'success'
        })
        this.$router.go(0)
      })
    }
  },
  mounted () {
    this.$axios({
      url: '/api/v1/user/books?pagesize=7&pagenum=1',
      method: 'get',
      headers: {
          'Authorization': "Bearer "+localStorage.getItem('token1')
      }
    }) .then((res)=>{
      for(let i=0;i<res.data.num.length;i++){
        this.$set(this.itemsMode,i,res.data.num[i])
        this.itemsMode[i].CreatedAt = res.data.num[i].CreatedAt.slice(0,10)
      }
      this.itemsNum = res.data.data
    })
  }
}
</script>
<style scoped>
    #bookShow {
       width: 85%;
       margin-left: 7.5%;
       height: 520px;
       position: relative;
    }
    .book_head_item {
       text-align: center;
       font-size: 17px;
       font-weight: 600;
    }
    #books {
        height: 420px;
    }
    .book_item {
       height: 30px;
       line-height: 30px;
       text-align: center;
       margin: 15px 0;
    }
    #serchL {
        position: absolute;
        right: -48px;
        top: -40px;
    }
    #serchL .el-input /deep/ .el-input__inner{
        height: 40px;
        width: 360px;
        border: 3px solid orange;
        border-radius: 20px;
    }
    #book:hover {
        cursor: pointer;
        background-color: rgba(190, 247, 239,0.5);
    }
    #bookDetail_head {
        display: flex;
        height: 200px;
    }
    #btn_lend .el-button {
        padding: 0;
        height: 40px;
        width: 80px;
        border-radius: 20px;
        color: #ff9607;
        border: 1px solid #ff9607
    }
    #btn_lend .el-button:hover {
        background-color: #ff9607;
        color: white;
    }
    #bookDetail_body {
        height:400px;
        width: 90%;
        margin-left: 5%;
    }
    #comments {
        height: 270px;
        overflow: auto;
    }
    .comment {
        display: flex;
        height: 100px;
        margin: 10px 0;
    }
</style>
