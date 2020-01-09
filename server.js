const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const parser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(parser);
app.use(cors())

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
//const upload = multer({dest: './upload'})
const selectAll = "SELECT * FROM user";

//Login 구현 위한 코드
var users = require('./routes/users')
app.use('/api',users)

//서버 연결 코드
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

//connection 성공시 뿌려줄 멘트
connection.connect(err => {
  if(err){
    console.log(err);
  }else{
    console.log('MySQL 서버에 연결되었습니다.');
  }
});


app.use(cors());
//Login Test 용도
app.get('/hello', (req, res) => {
  return res.send('Hello CodeLab');
});

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
  });
  
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
  });

  //회원매출분석 > 월간 매출액 쿼리문
  app.get('/api/clietMonthlySalesAnalysis',(req,res,err)=>{
    connection.query('select month(ticketing_date) as mm , sum(price) as sum from ticketing where (ticketing_date) between (date_add(now(),interval -3 month)) and (now()) group by month(ticketing_date) order by mm'
    ,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원매출분석 > 월간 환불액 쿼리문
  app.get('/api/clientSalesMonthlyRefundAnalysis',(req,res,err)=>{
    connection.query('select month(refund_apply_date) as mm , sum(price) as sum from ticketing where (refund_apply_date) between (date_add(now(),interval -3 month)) and (now()) group by month(refund_apply_date) order by mm'
    ,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원매출분석 > 주간매출
  app.get('/api/clientSalesWeeklyAnalysis',(req,res,err)=>{
    connection.query(' SELECT DATE_FORMAT(DATE_SUB(`ticketing_date`, INTERVAL (DAYOFWEEK(`ticketing_date`)-1) DAY), "%Y/%m/%d") as start, DATE_FORMAT(DATE_SUB(`ticketing_date`, INTERVAL (DAYOFWEEK(`ticketing_date`)-7) DAY), "%Y/%m/%d") as end, DATE_FORMAT(`ticketing_date`, "%Y-%m-%U") AS `date`, date_format(now(),"%Y-%m-%U") as now, sum(`price`)as sum FROM ticketing where (DATE_FORMAT(`ticketing_date`, "%Y")=DATE_FORMAT(now(), "%Y") and (DATE_FORMAT(`ticketing_date`, "%U") =0 or DATE_FORMAT(`ticketing_date`, "%U") =1) ) or  (DATE_FORMAT(`ticketing_date`, "%Y")=DATE_FORMAT(now(), "%Y")-1 and  DATE_FORMAT(`ticketing_date`, "%U") =51) GROUP BY date order by date asc',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원매출분석 >주간환불
  app.get('/api/clientSalesWeeklyRefundAnalysis',(req,res,err)=>{
    connection.query(' SELECT DATE_FORMAT(DATE_SUB(`refund_apply_date`, INTERVAL (DAYOFWEEK(`refund_apply_date`)-1) DAY), "%Y/%m/%d") as start, DATE_FORMAT(DATE_SUB(`refund_apply_date`, INTERVAL (DAYOFWEEK(`refund_apply_date`)-7) DAY), "%Y/%m/%d") as end, DATE_FORMAT(`refund_apply_date`, "%Y-%m-%U") AS `date`, date_format(now(),"%Y-%m-%U") as now, sum(`price`) as sum FROM ticketing where (DATE_FORMAT(`refund_apply_date`, "%Y")=DATE_FORMAT(now(), "%Y") and (DATE_FORMAT(`refund_apply_date`, "%U") =0 or DATE_FORMAT(`refund_apply_date`, "%U") =1) ) or (DATE_FORMAT(`refund_apply_date`, "%Y")=DATE_FORMAT(now(), "%Y")-1 and  DATE_FORMAT(`refund_apply_date`, "%U") =51) GROUP BY date order by date asc',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  })
  ;
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
  });

  //회원 매출 분석 > 일간 환불
  app.get('/api/clientSalesDailyRefundAnalysis',(req,res,err)=>{
    connection.query('select DATE(refund_apply_date) as dd , sum(price) as sum  from ticketing where DATE(refund_apply_date) between DATE(now())-2 and DATE(now()) group by DATE(refund_apply_date) order by dd',
    (err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원분석 > 회원가입률
  app.get('/api/userCount',(req,res,err)=>{
    connection.query('select count(join_date) as users, date_format(join_date,"%Y-%m") as joindate from user where date_format(join_date,"%Y")= date_format(now(),"%Y") or date_format(join_date,"%Y"-1)=date_format(now(),"%Y"-1) group by joindate order by join_date',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원분석 > 강퇴수(블랙리스트수)
  app.get('/api/userBlacklist',(req,res,err)=>{
    connection.query('select count(delete_date) as blacklist, date_format(delete_date,"%Y-%m") as deletedate from blacklist where date_format(delete_date,"%Y") = date_format(now(),"%Y") OR date_format(delete_date,"%Y"-1)=date_format(now(),"%Y"-1) group by deletedate  order by delete_date',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원분석 > 장르별 예매율
  app.get('/api/clientgenre',(req,res,err)=>{
    connection.query('select G.genre_name, round(sum(T.price)/(select sum(price) as total from ticketing)*100) as sum from genre G, `show` S, ticketing T where G.genre_id = S.genre_id and S.show_id = T.show_id group by G.genre_name',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  //회원분석 > 유입률 (client, ceo 모두 집계)
  app.get('/api/clientfunnel',(req,res,err)=>{
    connection.query('select F.funnel_name, round(count(F.funnel_id)/(select count(user_id) from user) * 100) as count from funnel F, user U where F.funnel_id = U.funnel_id group by F.funnel_id order by count desc',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원분석 > 연령별 가입자수
  app.get('/api/clientByAge',(req,res,err)=>{
    connection.query('select round(count(user_id)/(select count(user_id) from user where length(identification_number)=13)*100) as 인원, substr(date_format(now(),"%Y") -(if (substr(identification_number,7,1) = 1 or 2 ,1900, 2000) +substr(identification_number,1,2)) +1 ,1,1)*10 as 연령 from user where length(identification_number) =13 group by 연령 order by 연령',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //회원분석 > 성별 가입자수(비율)
  app.get('/api/clientGender',(req,res,err)=>{
    connection.query('select round(count(user_id)/(select count(user_id) from user where length(identification_number)=13)*100) as count , if(substr(identification_number,7,1) = 4, 2 ,if(substr(identification_number,7,1) =3 ,1,substr(identification_number,7,1) )) as gender from user where length(identification_number)=13 group by gender',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  
  //사장님분석 > CeoList(게시판) 
  app.get('/api/AdminCeoSales',(req,res,err)=>{
    connection.query('select TR.troup_name as 극단이름, U.name as 사장님 , U.phone as 연락처, sum(T.price) as 극단별총매출 from ticketing T, `show` S, troup TR, user U where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id group by TR.troup_name',(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //사장님 분석 > 클릭시 상세보기 > 가입 후 총 매출액
  app.get('/adminCeoSalesDetail/:phone',(req,res,err)=>{
    let sql = 'select sum(T.price) as sum from ticketing T, `show` S, troup TR, user U where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone =? group by TR.troup_name';
    let params = [req.params.phone];
    console.log(params);
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //사장님 분석 > 클릭시 상세보기 > 가입 후 연간 총 매출액
  app.get('/adminCeoSalesDetail2/:phone',(req,res,err)=>{
    let sql = 'select sum(T.price) as sum from ticketing T, '
    +'`show` S, troup TR, user U where T.show_id=S.show_id and '
    +'S.troup_id = TR.troup_id and TR.user_id = U.user_id and '
    +'U.phone =? and year(T.ticketing_date) = year(sysdate()) group by TR.troup_name';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //사장님 분석 > 클릭시 상세보기 > 가입 후 월간 총 매출액
  app.get('/adminCeoSalesDetail3/:phone',(req,res,err)=>{
    let sql = 'select sum(T.price) as sum from ticketing T, `show` S, troup TR, user U where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone =? and month(T.ticketing_date) = month(sysdate()) and year(T.ticketing_date) = year(sysdate()) group by TR.troup_name';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //사장님 분석 > 클릭시 상세보기 > 가입 후 일간 총 매출액
  app.get('/adminCeoSalesDetail4/:phone',(req,res,err)=>{
    let sql = 'select sum(T.price) as sum from ticketing T, `show` S, troup TR, user U where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone =? and month(T.ticketing_date) = month(sysdate()) and year(T.ticketing_date) = year(sysdate()) and Date(T.ticketing_date) = Date(sysdate()) group by TR.troup_name';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //사장님 분석 > 클릭시 상세보기 > 3년간 (연간) 총 매출액
  app.get('/adminCeoSalesDetail5/:phone',(req,res,err)=>{
    let sql = 'select year(T.ticketing_date) as yyyy , sum(T.price) as sum from ticketing T, user U,`show` S, troup TR where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ? and year(T.ticketing_date) between year(now())-2 and year(now()) group by year(T.ticketing_date) order by yyyy';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  //사장님 분석 > 클릭시 상세보기 > 3년간 (연간) 총 환불액
  app.get('/adminCeoSalesRefundDetail5/:phone',(req,res,err)=>{
    let sql = 'select year(refund_apply_date) as yyyy , sum(price) as sum from ticketing T, user U, `show` S, troup TR where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ? and year(refund_apply_date) between year(now())-2 and year(now()) group by year(refund_apply_date) order by yyyy';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  //사장님 분석 > 클릭시 상세보기 > 3개월 (월간) 총 매출액
  app.get('/adminCeoSalesDetail6/:phone',(req,res,err)=>{
    let sql = 'select month(T.ticketing_date) as mm , sum(price) as sum from ticketing T, user U, `show` S, troup TR where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ?  and (T.ticketing_date) between (date_add(now(),interval -2 month)) and (now()) group by month(T.ticketing_date) order by mm';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  //사장님 분석 > 클릭시 상세보기 > 3개월(월간) 총 환불액
  app.get('/adminCeoSalesRefundDetail6/:phone',(req,res,err)=>{
    let sql = 'select month(T.refund_apply_date) as mm , sum(price) as sum from ticketing T, user U, `show` S, troup TR where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ?  and (T.refund_apply_date) between (date_add(now(),interval -2 month)) and (now()) group by month(refund_apply_date) order by mm';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });


  //사장님 분석 > 클릭시 상세보기 > 3주간(주간) 총 매출액
  app.get('/adminCeoSalesDetail7/:phone',(req,res,err)=>{
    let sql = '  SELECT DATE_FORMAT(DATE_SUB(T.ticketing_date, INTERVAL (DAYOFWEEK(T.ticketing_date)-1) DAY), "%Y/%m/%d") as start, DATE_FORMAT(DATE_SUB(T.ticketing_date, INTERVAL (DAYOFWEEK(T.ticketing_date)-7) DAY), "%Y/%m/%d") as end, DATE_FORMAT(T.ticketing_date, "%Y-%m-%U") AS `date`, date_format(now(),"%Y-%m-%U") as now, sum(`price`)as sum FROM ticketing T, user U, `show` S, troup TR where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ? and ( DATE_FORMAT(T.ticketing_date, "%U") =0 or DATE_FORMAT(T.ticketing_date, "%U") =51 or DATE_FORMAT(T.ticketing_date, "%U") =1) GROUP BY date order by date asc';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //사장님 분석 > 클릭시 상세보기 > 3주간(주간) 총 환불액
  app.get('/adminCeoSalesRefundDetail7/:phone',(req,res,err)=>{
    let sql = ' SELECT DATE_FORMAT(DATE_SUB(T.refund_apply_date, INTERVAL (DAYOFWEEK(T.refund_apply_date)-1) DAY), "%Y/%m/%d") as start, DATE_FORMAT(DATE_SUB(T.refund_apply_date, INTERVAL (DAYOFWEEK(T.refund_apply_date)-7) DAY), "%Y/%m/%d") as end, DATE_FORMAT(T.refund_apply_date, "%Y-%m-%U") AS `date`, date_format(now(),"%Y-%m-%U") as now, sum(`price`) as sum FROM ticketing T, user U, `show` S, troup TR where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ? and ( DATE_FORMAT(T.refund_apply_date, "%U") =0 or DATE_FORMAT(T.refund_apply_date, "%U") =51 or DATE_FORMAT(T.refund_apply_date, "%U") =1) GROUP BY date order by date asc';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });
  //사장님 분석 > 클릭시 상세보기 > 3일간(일간) 총 매출액
  app.get('/adminCeoSalesDetail8/:phone',(req,res,err)=>{
    let sql = 'select DATE(T.ticketing_date) as dd, sum(T.price) as sum from ticketing T, `show` S, troup TR, user U where T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ? and(DATE_FORMAT(`ticketing_date`, "%Y")=DATE_FORMAT(now(), "%Y") and (DATE(`ticketing_date`) = DATE(now())-2 or DATE(`ticketing_date`) = DATE(now())-1 or DATE(`ticketing_date`) = DATE(now()))) and T.ticketing_date is not null group by DATE(T.ticketing_date)order by dd  ';
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

  //사장님 분석 > 클릭시 상세보기 > 3일간(일간) 총 환불액
  app.get('/adminCeoSalesRefundDetail8/:phone',(req,res,err)=>{
    let sql = 'select DATE(T.refund_apply_date) as dd , sum(T.price) as sum from ticketing T, user U, `show` S, troup TR where  T.show_id=S.show_id and S.troup_id = TR.troup_id and TR.user_id = U.user_id and U.phone = ? and(DATE_FORMAT(`refund_apply_date`, "%Y")=DATE_FORMAT(now(), "%Y") and (DATE(`refund_apply_date`) = DATE(now())-2 or DATE(`refund_apply_date`) = DATE(now())-1 or DATE(`refund_apply_date`) = DATE(now()))) and T.refund_apply_date is not null group by DATE(T.refund_apply_date) order by dd asc'
    let params = [req.params.phone];
    connection.query(sql,params,(err,rows,fields) => {
      if(err){
        return res.send(err);
      }else{
        return res.send(rows);
      }
    })
  });

 //후기 관리 리스트
 app.get('/api/reviewManagement',(req,res) => {
  connection.query(
    "select s.show_title, t.user_id, r.review_content, r.review_report_yn from ticketing t, review r, `show` s where t.ticketing_id = r.ticketing_id and s.show_id = t.show_id and review_report_yn = 1",
    (err,rows,fields) => {
      res.send(rows);
    }
  );
});

//후기 삭제
app.delete('/api/reviewManagement/:user_id',(req, res) => {
  let sql = 'delete from user where user_id = ?';
  let params = [req.params.user_id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
});

 // connection.end();
 //사장님 관리 리스트
 app.get('/api/ceoManagement',(req,res) => {
  connection.query(
    "select t.troup_name, u.user_id, u.`name`, u.email, u.identification_number from user u, troup t where u.user_id = t.user_id and u.role = 'ceo'",
    (err,rows,fields) => {
      res.send(rows);
    }
  );
});

//회원 관리 리스트
app.get('/api/userManagement',(req,res) => {
connection.query(
  "select u.user_id, u.name, u.identification_number, u.email, f.funnel_name from user u, funnel f where u.funnel_id = f.funnel_id and u.role = 'client'",
  (err,rows,fields) => {
    res.send(rows);
  }
);
});

//사장님 계정 삭제
app.delete('/api/ceoManagement/:identification_number',(req, res) => {
  let sql = 'delete from user where identification_number = ?';
  let params = [req.params.identification_number];
  //console.log(params)
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
  });
  
  //회원 계정 삭제
  app.delete('/api/userManagement/:identification_number',(req, res) => {
    let sql = 'delete from user where identification_number = ?';
    let params = [req.params.identification_number];
    console.log(params)
    connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      })
    });
    
    //블랙리스트 관리(등록)
    app.post('/api/blacklistManagement',parser,(req,res)=>{
      let sql = "INSERT INTO `blacklist` VALUES (?,?,?,?,?,?,?,?)";
      
      let blacklist_id = req.body.blacklist_id;
      let user_id = req.body.user_id;
      let reason_id = req.body.reason_id;
      let name = req.body.name;
      let email = req.body.email;
      let role = req.body.role;
      let phone = req.body.phone;
      let delete_date = req.body.delete_date;
      //console.log(req);
      //console.log(req.body);
      let params = [blacklist_id, user_id, reason_id, name, email, role, phone, delete_date];
      //console.log(blacklist_id);
     // console.log(params);
     
     connection.query(sql,params,
      (err, rows, fields) => { 
        res.send(rows);
        console.log(err);
      }       
      )
    });
    //블랙리스트 목록
    app.get('/api/blacklistManagement',(req,res) => {
      connection.query(
        "select b.blacklist_id, b.user_id, b.reason_id, b.name, b.email, b.role, b.phone, b.delete_date, r.reason_content from blacklist b, reason r where b.reason_id = r.reason_id order by blacklist_id desc",
        (err,rows,fields) => {
          res.send(rows);
        }
      );
      });

app.listen(port, () => console.log(`Listening on port ${port}`));