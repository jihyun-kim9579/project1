import { fileURLToPath } from "url";   // 👈 추가
const __dirname = fileURLToPath(new URL(".", import.meta.url));   // 👈 추가
const __filename = fileURLToPath(import.meta.url);   // 👈 추가

import express from "express";
import mariadb from "mariadb";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();





const app = express()
app.use(express.json()); //json 포맷 인식
app.use(cors()); //CORS policy
app.use(helmet());
// route : .get():받기 , .post():보내기 , .put():보내서 부분 수정 , .delete() : 보내서 삭제
// RESTful API : REpresentation (대표성 있는 방식으로 요청 URL을 생성하는 규칙)

// db connection
const pool = mariadb.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password : process.env.DB_PWD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

app.get('/', function (req, res) {
  //console.log(__dirname);
  res.sendFile( __dirname+"/public/index.html");
})

app.get('/getAllUsers', function (req, res) {
  pool.getConnection()
  .then(conn => {
    console.log("====mariaDB is connect=====")
    conn.query("SELECT * FROM users")
      .then((rows) => {
        return res.status(200).json(rows); // 응답상태 200 (정상) , 데이터는 JSON으로
        conn.end(); // 또다른 요청에 응답하기 위해 한번 요청하면 접속 끊기
      })
      .catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })
      
  }).catch(err => {
      console.log(err); // DB연결시 에러 발생
    //not connected
  });
})

// es6 :import(가져오기) , export(내보내기)
// CommonJS : require(가져오기), module.exports 또는 exports(내보내기)
const port = 3000;
const setting = {
  app,
  port
};
export default setting;
