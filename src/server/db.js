const config = require("./config");
const mysql = require("mysql");

// 创建连接对象
const connection = mysql.createConnection(config);

// 开始连接
connection.connect();

// 执行 sql 语句
const sql = "select * from users";
connection.query(sql, (err, result) => {
  if (err) {
    return err;
  }
  return result;
});

// 连接关闭
connection.end();
