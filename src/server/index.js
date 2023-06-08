// 1.导入express
const express = require("express");
const url = require("url");

const config = require("./config");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const urlencodeParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// 创建连接对象
const connection = mysql.createConnection(config);

// 2.创建应用对象
const app = express();

app.use(urlencodeParser);
app.use(jsonParser);

// 3.创建路由
// 查找数据
// app.all("/api/select", (request, response) => {
// 配置跨域
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "X-Requested-With");
//   response.header(
//     "Access-Control-Allow-Methods",
//     "PUT,POST,GET,DELETE,OPTIONS"
//   );
// .set("qwe", "123") 设置请求头
// 拿到发过来的数据 get
//   let re = url.parse(request.url, true);
//   let query = re.query;
// });

// 登录
app.post("/api/select", (request, response) => {
  let sql = `select * from users where account='${request.body.account}' and password='${request.body.password}';`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    response.status(200).send(result);
    console.log(result);
  });
});
// 注册
app.post("/api/insert", (request, response) => {
  let sql = `select * from users where account='${request.body.account}' or name='${request.body.name}';`;
  // console.log(sql, "#");
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    if (!result.length) {
      // 用户不存在
      let sql2 =
        "insert into users (`name`,`account`,`password`) value('" +
        request.body.name +
        "','" +
        request.body.account +
        "','" +
        request.body.password +
        "');";
      console.log(sql2);
      let uu = connection.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
          response.status(200).send(err);
        }
        console.log(result, "##");
        response.status(200).send(result);
      });
      console.log(uu);
    } else {
      // 用户已存在
      console.log("err");
      response.status(200).send("err");
      return;
    }
  });
});
// 返回全部商品信息
app.get("/api/iteminfo", (request, response) => {
  let sql = `select * from iteminfo;`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    response.status(200).send(result);
  });
});
//删除商品
app.post("/api/deleteitem", (request, response) => {
  let sql = `delete from iteminfo where id=${request.body.id};`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    response.status(200).send(result);
    console.log(result);
  });
});
//修改商品
app.post("/api/updateitem", (request, response) => {
  let sql =
    "UPDATE iteminfo SET `userid`='" +
    request.body.userid +
    "',`title`='" +
    request.body.title +
    "',`kind`='" +
    request.body.title +
    "',`info`='" +
    request.body.info +
    "',`price`=" +
    request.body.price +
    " where id=" +
    request.body.id +
    ";";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    response.status(200).send(result);
    console.log(result);
  });
});
// 返回全部用户信息
app.get("/api/user", (request, response) => {
  let sql = `select * from users;`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    response.status(200).send(result);
  });
});
//删除用户
app.post("/api/deleteuser", (request, response) => {
  let sql = `delete from users where id=${request.body.id};`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    response.status(200).send(result);
    console.log(result);
  });
});
//修改用户
app.post("/api/updateuser", (request, response) => {
  let sql =
    "UPDATE users SET `name`='" +
    request.body.name +
    "',`account`='" +
    request.body.account +
    "',`password`='" +
    request.body.password +
    "',`identity`=" +
    request.body.identity +
    " where id=" +
    request.body.id +
    ";";
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response.status(200).send(err);
    }
    response.status(200).send(result);
    console.log(result);
  });
});

// 测试
app.all("/api/haha", (request, response) => {
  // 配置跨域
  // response.header("Access-Control-Allow-Origin", "*");
  // response.header("Access-Control-Allow-Headers", "X-Requested-With");
  // response.header(
  //   "Access-Control-Allow-Methods",
  //   "PUT,POST,GET,DELETE,OPTIONS"
  // );
  // 拿到发过来的数据 get
  //   let re = url.parse(request.url, true);
  //   let query = re.query;
  let re = url.parse(request.url, true);
  let query = re.query;
  console.log("getgetget:", query); // 一定要写逗号，不能加号

  // console.log("body:" + request.body); // post
  // console.log("query" + request.query); // get
  console.log("path" + request.path);
  console.log("host:" + request.get("host"));
  console.log("ip:" + request.ip);
  const result = { state: 200, info: "生活不止眼前的苟且，还有诗和远方。" };

  response.status(200).send(result);
});

// 手机登录
app.get("/api/selectphone", (request, response) => {
  let re = url.parse(request.url, true);
  let query = re.query;
  let sql = `select * from users where account='${query.account}' and password='${query.password}';`;
  let = res = { code: 1, info: "" };
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res = { code: 0, info: "error" };
      response.status(200).send(res);
    }
    if (result.length == 1) {
      res.code = 1;
      res.info = "success";
    } else {
      res.code = 0;
      res.info = "error";
    }
    response.status(200).send(res);
  });
});

// 404
app.all("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.end("404 not found");
});
// 4.监听端口
app.listen(8000, () => {
  //   db(
  //     () => {
  //       console.log("连接成功。。。");
  //     },
  //     () => {
  //       console.log("连接失败。。。");
  //     }
  //   );

  // 开始连接
  connection.connect();
  console.log("服务已启动，端口8000监听中");
});

function query(sql) {
  connection.query(sql, (err, result) => {
    if (err) {
      return err;
    }
    return result;
  });
}
