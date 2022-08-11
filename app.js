const express = require('express')
const app = express()


// corsL solve the corss-domain
const cors = require('cors')
app.use(cors())

// 配置表单数据
app.use(express.urlencoded({ extended: false}))
// 只能解析 application/x-www-formiurlencoded

// 一定要在路由之前封装res.cc
app.use((req, res, next) =>{
    // status 的默认值为1， 表示失败的情况
    // err可能是错误的对象，也可以是错误的字符串
    res.cc = function(err, status = 1){
        res.send({
            status, 
            msg: err instanceof Error? err.message : err
        })
    }
    next()
})

// import and use the router
const userRouter = require('./router/user')
app.use('/api', userRouter)


// 创建表单
// id INT pk nn UQ
// username varchar(255) NN UQ AI
// password varchar(255) NN
// nickname varchar(255)
// email varchar(255)
// user_pic TEXT


app.listen(3007, ()=>{
    console.log('api server running at http://127.0.0.1:3007')
})