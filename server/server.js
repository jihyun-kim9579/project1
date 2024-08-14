import { fileURLToPath } from "url";   // 👈 추가
const __dirname = fileURLToPath(new URL(".", import.meta.url));   // 👈 추가
const __filename = fileURLToPath(import.meta.url);   // 👈 추가

import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/userRoutes.js"




const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); //json 포맷 인식
app.use(cors()); //CORS policy
app.use(helmet());
// route : .get():받기 , .post():보내기 , .put():보내서 부분 수정 , .delete() : 보내서 삭제
// RESTful API : REpresentation (대표성 있는 방식으로 요청 URL을 생성하는 규칙)
app.get("/" , (req , res) => {
  res.sendFile(__dirname+"/public/index.html");
})
app.use("/", userRouter);



// es6 :import(가져오기) , export(내보내기)
// CommonJS : require(가져오기), module.exports 또는 exports(내보내기)
const setting = {
  app,
  port
};
export default setting;
