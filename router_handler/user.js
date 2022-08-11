// 注册
// 1， 检查表单的数据是否合法
// 2， 检查用户名是否被占用 (1, 导入db 2， 定义sql 3, 执行sql并判断是否失败)
// 3， 对密码进行加密处理
// 4， 插入新用户
const db = require('../db/index')

// 导入加密密码的包
const bcrypt = require('bcryptjs')


exports.regUser = (req, res)=>{
    const userinfo = req.body
    // 步骤1
    if (!userinfo.username || !userinfo.password){
        return res.send({status: 1, msg: "invalid username or password"})
    }
    // 定义sql
    const sqlStr = "select * from ev_users where username = ?"
    db.query(sqlStr, userinfo.username, (err, results)=>{
        if(err){
            //return res.send({status: 1, msg:err.message})
            return res.cc(err)
        }
        // 判断是否被占用
        if(results.length > 0){
            // return res.send({status: 1, msg:"This username invalid"})
            return res.cc("This username invalid")
        }
    })
    //res.send('username is valid')

    // 对密码进行加密操作，不建议使用明文对密码进行加密
    // 使用bcryptjs进行加密
    // 优点： 无法被逆向破解
    // 统一明文密码多次加密，得到的加密结果也不同
    // npm i bcryptjs@2.4.3
    // 调用 bcrypt.hashSync()对密码进行加密
    console.log(userinfo)
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    console.log(userinfo)

    // 插入信息到库
    const sqlStr_insert = 'insert into ev_users set ?'
    // 执行
    db.query(sqlStr_insert, {username: userinfo.username, password: userinfo.password}, (err, results)=>{
        // 判断是否执行成功
        // if(err) return res.send({status:1, msg:err.message})
        if(err) return res.cc(err)
        // 判断影响函数是否唯一
        // if(results.affectedRows !== 1) return res.send({status: 1, msg: 'Register Failed'})
        if(results.affectedRows !== 1) return res.cc('Register Failed')
        // 插入成功
        // res.send({status:0, msg:'Register successful'})
        res.cc('Register successful', 0)
    })

}

exports.login = (req, res)=>{
    const userinfo = req.body
    // 步骤1
    if (!userinfo.username || !userinfo.password){
        return res.cc("invalid username or password")
    }
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, userinfo.username, (err, results)=>{
        if (err) return res.cc(err.message)
        if (results.length != 1) return res.cc('Login Failed')
        console.log(userinfo)
        // 使用bcryptjs.compareSync来比较密码是否一致
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResult) return res.cc('Password incorrect')

        // 生成token
    })

    //res.cc('login OK in handler', 0)
}

exports.getComment = (req, res)=>{
    const sql = 'select * from ev_users where nickname = ?'
    db.query(sql, "comment",(err, results) =>{
        if (err) return res.cc(err.message)
        return res.send({results})
    })
}

exports.addComment = (req, res) =>{
    console.log("recieve add request")
    const commentInfo = req.body
    console.log(commentInfo)
    const sql = 'INSERT into ev_users set ?'
    db.query(sql, {username: commentInfo.username, password: 1, user_pic: commentInfo.text, nickname: "comment"}, (err, results)=>{
        if(err) return res.cc(err.message)
        if(results.affectedRows !== 1) return res.cc('Register Failed')
        res.cc('Register successful', 0)
    })
}