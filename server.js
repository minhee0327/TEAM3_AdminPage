const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
//const upload = multer({dest: './upload'})
const selectAll = "SELECT * FROM user";

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect(err => {
  if(err){
    console.log(err);
  }else{
    console.log('MySQL 서버에 연결되었습니다.');
  }
});


app.use(cors());

//서버 연결 잘 되었는지 확인하는 용도
app.get('/',(req,res,err) => {
  res.send(`hello from the products server`);
});

//user 게시판 (test용도) => 마지막에 파기해도 괜찮을 것 같다.
app.get('/api/test',(req,res,err) => {
  //console.log(err);
  connection.query(selectAll,
    (err,rows,fields) => {
        if(err){
          return res.send(err);
        }else{
          return res.send(rows);
        }
      }
    );
  });

  //연간 총 매출액 (이번 해 매출)
  app.get('/api/adminClientSalesAnalysis1',(req,res,err)=>{
    connection.query('SELECT sum(price) as sum from ticketing where YEAR(ticketing_date) = YEAR(sysdate()) ',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  //월간 총 매출액(이번 달)
  app.get('/api/adminClientSalesAnalysis2',(req,res,err)=>{
    connection.query('SELECT sum(price) as sum from ticketing where MONTH(ticketing_date) = MONTH(sysdate()) and YEAR(ticketing_date) = YEAR(sysdate())',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  
  //일일 총 매출액(오늘 날짜)
  app.get('/api/adminClientSalesAnalysis3',(req,res,err)=>{
    connection.query('SELECT sum(price) as sum from ticketing where DATE(ticketing_date) = DATE(sysdate()) and MONTH(ticketing_date) = MONTH(sysdate()) and YEAR(ticketing_date) = YEAR(sysdate())',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
 
  //회원매출분석> 연간 매출액 쿼리문
  app.get('/api/clientSalesYearlyChart',(req,res,err)=>{
    connection.query('select year(ticketing_date) as yyyy , sum(price) as sum  from ticketing where year(ticketing_date)  between year(now())-2 and year(now()) group by year(ticketing_date)  order by yyyy',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  
  //회원매출분석 > 연간 환불액 쿼리문
  app.get('/api/clientSalesYearlyRefundAnalysis',(req,res,err)=>{
    connection.query('select year(refund_apply_date) as ryyyy , sum(price) as rsum from ticketing where year(refund_apply_date) between year(now())-2 and year(now()) group by year(refund_apply_date)  order by ryyyy'
    ,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })

  //회원매출분석 > 월간 매출액 쿼리문
  app.get('/api/clietMonthlySalesAnalysis',(req,res,err)=>{
    connection.query('select month(ticketing_date) as mm , sum(price) as sum from ticketing where (ticketing_date) between (date_add(now(),interval -2 month)) and (now()) group by month(ticketing_date) order by mm'
    ,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  //회원매출분석 > 월간 환불액 쿼리문
  app.get('/api/clientSalesMonthlyRefundAnalysis',(req,res,err)=>{
    connection.query('select month(refund_apply_date) as mm , sum(price) as sum from ticketing where (refund_apply_date) between (date_add(now(),interval -2 month)) and (now()) group by month(refund_apply_date) order by mm'
    ,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })

  //회원매출분석 > 주간매출
  app.get('/api/clientSalesWeeklyAnalysis',(req,res,err)=>{
    connection.query('SELECT DATE_FORMAT(DATE_SUB(`ticketing_date`, INTERVAL (DAYOFWEEK(`ticketing_date`)-1) DAY), "%Y/%m/%d") as start, DATE_FORMAT(DATE_SUB(`ticketing_date`, INTERVAL (DAYOFWEEK(`ticketing_date`)-7) DAY), "%Y/%m/%d") as end, DATE_FORMAT(`ticketing_date`, "%Y-%m-%U") AS `date`, date_format(now(),"%Y-%m-%U") as now, sum(`price`)as sum FROM ticketing where DATE_FORMAT(`ticketing_date`, "%U") between date_format(now(),"%U")- 2 and date_format(now(),"%U") GROUP BY date order by date asc',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  //회원매출분석 >주간환불
  app.get('/api/clientSalesWeeklyRefundAnalysis',(req,res,err)=>{
    connection.query('SELECT DATE_FORMAT(DATE_SUB(`refund_apply_date`, INTERVAL (DAYOFWEEK(`refund_apply_date`)-1) DAY), "%Y/%m/%d") as start, DATE_FORMAT(DATE_SUB(`refund_apply_date`, INTERVAL (DAYOFWEEK(`refund_apply_date`)-7) DAY), "%Y/%m/%d") as end, DATE_FORMAT(`refund_apply_date`, "%Y-%m-%U") AS `date`, date_format(now(),"%Y-%m-%U") as now, sum(`price`) as sum FROM ticketing where DATE_FORMAT(`refund_apply_date`, "%U") between date_format(now(),"%U")- 2 and date_format(now(),"%U") GROUP BY date order by date asc',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  //회원 매출 분석 > 일간 매출
  app.get('/api/clientDailySalesAnalysis',(req,res,err)=>{
    connection.query('select DATE(ticketing_date) as dd , sum(price) as sum from ticketing where DATE(ticketing_date) between DATE(now())-2 and DATE(now()) group by DATE(ticketing_date) order by dd',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  //회원 매출 분석 > 일간 환불
  app.get('/api/clientSalesDailyRefundAnalysis',(req,res,err)=>{
    connection.query('select DATE(refund_apply_date) as dd , sum(price) as sum from ticketing where DATE(refund_apply_date) between DATE(now())-2 and DATE(now()) group by DATE(refund_apply_date) order by dd',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  //회원분석 > 회원가입률
  app.get('/api/userCount',(req,res,err)=>{
    connection.query('select count(join_date) as users, date_format(join_date,"%Y-%m") as joindate from user where date_format(join_date,"%Y")= date_format(now(),"%Y") group by joindate order by join_date',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  //회원분석 > 강퇴수(블랙리스트수)
  app.get('/api/userBlacklist',(req,res,err)=>{
    connection.query('select count(delete_date) as blacklist, date_format(delete_date,"%Y-%m") as deletedate from blacklist where date_format(delete_date,"%Y") = date_format(now(),"%Y") group by deletedate order by delete_date',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })

  //회원분석 > 장르별 예매율
  app.get('/api/clientgenre',(req,res,err)=>{
    connection.query('select G.genre_name, round(sum(T.price)/(select sum(price) as total from ticketing)*100) as sum from genre G, `show` S, ticketing T where G.genre_id = S.genre_id and S.show_id = T.show_id group by G.genre_name',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  //회원분석 > 유입률 (client, ceo 모두 집계)
  app.get('/api/clientfunnel',(req,res,err)=>{
    connection.query('select F.funnel_name, round(count(F.funnel_id)/(select count(user_id) from user) * 100) as count from funnel F, User U where F.funnel_id = U.funnel_id group by F.funnel_id order by count desc',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })

  //회원분석 > 연령별 가입자수
  app.get('/api/clientByAge',(req,res,err)=>{
    connection.query('select round(count(user_id)/(select count(user_id) from user where length(identification_number)=13)*100) as 인원, substr(date_format(now(),"%Y") -(if (substr(identification_number,7,1) = 1 or 2 ,1900, 2000) +substr(identification_number,1,2)) +1 ,1,1)*10 as 연령 from user where length(identification_number) =13 group by 연령 order by 연령',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })

  //회원분석 > 성별 가입자수(비율)
  app.get('/api/clientGender',(req,res,err)=>{
    connection.query('select round(count(user_id)/(select count(user_id) from user where length(identification_number)=13)*100) as count , if(substr(identification_number,7,1) = 4, 2 ,if(substr(identification_number,7,1) =3 ,1,substr(identification_number,7,1) )) as gender from user where length(identification_number)=13 group by gender',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  
  /*
  app.get('/api/clientSalesAnalysis',(req,res,err)=>{
    connection.query('',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  */
 
 // connection.end();

 app.get('/api/ceoManagement',(req,res) => {
  connection.query(
    "select tr.troup_name, u.user_id, u.`name`, u.email, u.identification_number, r.reason_content from reason r, `user` u, ticketing t, troup tr where u.role = 'ceo'",
    (err,rows,fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/userManagement',(req,res) => {
connection.query(
  "select u.user_id, u.identification_number, u.email, f.funnel_name from user u, funnel f where u.funnel_id = f.funnel_id;",
  (err,rows,fields) => {
    res.send(rows);
  }
);
});

app.delete('/api/ceoManagement/:id', (req, res) => {
  let sql = 'UPDATE user SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
  (err, rows, fields) => {
  res.send(rows);
  }
)
});


app.delete('/api/userManagement/:review_id',(req, res) => {
  let sql = 'UPDATE review SET isdeleted = 1 WHERE review_id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
