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
          <el-row v-for="book in booksModel" :key="book.id" id="book" @click.native="handlePickBook(book)">
            <el-col :span="2" class="book_item">{{book.id}}</el-col>
            <el-col :span="8" class="book_item">{{book.name}}</el-col>
            <el-col :span="6" class="book_item">{{book.type}}</el-col>
            <el-col :span="4" class="book_item">{{book.lend}}</el-col>
            <el-col :span="4" class="book_item">{{book.left}}</el-col>
          </el-row>
        </div>
        <div id="serchL"><el-input v-model="serchBook" placeholder="请在这里写上书名后回车" suffix-icon="el-icon-search" @keyup.native.enter="serch_Book"></el-input></div>
        <div>
            <el-pagination
                current-page.sync="1"
                :page-size="7"
                layout="prev, pager, next, jumper"
                :total="booksNum"
                @current-change = 'handleCurrentChange'
                style="margin-left:400px;margin-top:20px">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="bookVisible" id="bookDetail" style="padding-top:0px" top="2vh">
            <div id="bookDetail_head" style="margin-left:60px">
                <div style="height:200px;width:200px"><el-image :src="pickBook.pic"></el-image></div>
                <div style="display:flex;flex-direction:column;justify-content:space-around;margin-left:60px">
                    <div><h3 style="margin:0">{{pickBook.name}}</h3></div>
                    <div style="height:90px;width:300px;display:flex;flex-direction:row;justify-content:space-between">
                        <div style="display:flex;flex-direction:column;justify-content:space-around">
                            <div>作者：{{pickBook.author}}</div>
                             <div>上架时间：{{pickBook.update}}</div>
                        </div>
                        <div id="btn_lend"><el-button>借阅</el-button></div>
                    </div>
                    <div style="height:60px">介绍：{{pickBook.introduce}}</div>
                </div>
            </div>
            <div id="bookDetail_body">
                <div style="width:450px;margin-left:130px;margin-top:10px">
                    <el-input type="textarea" v-model="comment_now" maxlength="200" show-word-limit placeholder="期待您的高质量评价" :rows="3"></el-input>
                </div>
                <h4>精彩评论:</h4>
                <div id="comments">
                    <div class="comment" v-for="comment in pickBook.comments" :key="comment.id">
                        <div><img src="../../assets/4.png" alt="" style="height:30px"></div>
                        <div style="display:flex;justify-content:space-around;flex-direction:column">
                            <div>{{comment.username}}</div>
                            <div>{{comment.date}}</div>
                            <div>{{comment.content}}</div>
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
      booksModel: [],
      booksNum: 0,
      bookVisible: false,
      books: [
        {
          id: 1,
          name: '哈利波特haha',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特一号',
          pic: require('../../assets/harry.png'),
          comments: [
            {
              comment_id: 1,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 2,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 3,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 4,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 5,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 6,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 7,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 8,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            },
            {
              comment_id: 9,
              username: '工具人一号',
              content: '这小说真的是太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太太好看了吧',
              date: '2021.8.8'
            }
          ]
        },
        {
          id: 2,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特二号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 3,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特三号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 4,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特四号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 5,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特五号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 6,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特六号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 7,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特七号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 8,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特八号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 9,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特九号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 10,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特十号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 11,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特十一号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 12,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特十二号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 13,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特十三号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 14,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特十四号',
          pic: require('../../assets/harry.png')
        },
        {
          id: 15,
          name: '哈利波特',
          type: '奇幻',
          lend: 12,
          left: 11,
          author: 'J.K.罗琳',
          update: '2021.8.8',
          introduce: '我是哈利波特十五号',
          pic: require('../../assets/harry.png')
        }
      ],
      pickBook: {},
      comment_now: ''
    }
  },
  methods: {
    serch_Book () {
      alert('找不到')
    },
    handleCurrentChange (val) {
      this.booksModel = this.books.slice((val - 1) * 7, val * 7)
    },
    handlePickBook (book) {
      this.pickBook = book
      this.bookVisible = true
    }
  },
  mounted () {
    this.booksModel = this.books.slice(0, 7)
    this.booksNum = this.books.length
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
