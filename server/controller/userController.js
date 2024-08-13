import userModel from "../models/usermodel.js";

const getAllUsers = async (req , res) => {
    try {
        const users = await userModel.getAllUsers(); //사용자 정보를 모두 조회해서
        //users.then((data) => console.log(data));
        // users 변수에 담아
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "db connection is failed" ,
            message: "데이터베이스 연결이 실패했습니다."
        })
    } 
}

const getOneUser = async (req , res) => {
    // localhost:3000/getOneUser/유저 id
    const id = parseInt(req.params.id);
    try {
        const users = await userModel.getOneUser(id); //사용자 정보를 모두 조회해서
        //users.then((data) => console.log(data));
        // users 변수에 담아
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "db connection is failed" ,
            message: "데이터베이스 연결이 실패했습니다."
        })
    } 
}

const addOneUser = async (req , res) => {
    // post 요청 : FORM(HTML5) or AJAX 로만 요청가능
    const {id , name, email} = req.body;
    try {
        const users = await userModel.addOneUser(id, name , email); //사용자 정보를 모두 조회해서
        //users.then((data) => console.log(data));
        // users 변수에 담아
        res.status(200).json({
            status:"success",
            message : "사용자 등록 성공"
        });
       // res.redirect("/"); //첫 페이지로 이동하기
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed" ,
            message: "데이터베이스 연결 실패"
        })
    } 
}
// object(객체) : 여러가지 변수 , 값 ,함수 ,객체 ,클래스 ..를 포함할 수 있는 자바스크립 타입
const userController = {
    getAllUsers,
    getOneUser,
    addOneUser
}

export default userController;