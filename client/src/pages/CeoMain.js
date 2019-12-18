import React from 'react';
import "./CeoMain.css";

const CeoMain = () => {
    return (
        <div>
        <div id="nav" class="owner-header">
            <div class="clearfix">
                <h2><a href ="/CeoMain" class="logo">3조 사이트</a></h2>
                <ul class="ext">
                    {/* 로그인 회원가입 화면 구현시 링크 주소 기입 */}
                    <li class="outlink"><a href="/CeoMain">로그인</a></li>
                    <li class="outlink"><a href="/CeoMain">회원가입</a></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="nav clearfix">
                {/* ceo 화면 모두 구현시 링크 주소 기입 */}
               <ul>
                <li class><a href="/">샘플테스트용</a></li>   
                <li class><a href="/CeoMain">극단등록</a></li>   
                <li class><a href="/CeoMain">극단관리</a></li>   
                <li class><a href="/CeoMain">분석</a></li>   
                <li class><a href="/CeoMain">Q&A</a></li>   
                </ul> 
            </div>
            <div class="mid clearfix">
                <div id="banner">
                {/* 영상을 넣을 생각이었는데, 실제 요기요 사이트는 ol태그를 이용해서 링크로 이동하게 되어있다. */}
                </div>
                <div class="owner-login">
                    <div class="status-logout">
                        <form>
                            <div><input type="text" class="" name="" id="" placeholder="아이디 입력"></input></div>
                            <div><input type="text" class="" name="" id="" placeholder="비밀번호 입력"></input></div>
                            <div class="id_pw_opt">
                                {/* <label><input type="checkbox" name="save_id" id="save_id">아이디 저장</input></label> */}
                                <a href="/CeoMain">아이디/비밀번호 찾기</a>
                            </div>
                            <div>
                                <button type="submit" class="btn-own-login">로그인</button>
                                {/* <div>배너 넣을건데 혹시 틀이 깨질까봐 일단 둠</div> */}
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
           
            {/* <div class="guide">
                <p>
                유한회사 연극어때는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 상품/ 거래정보 및 거래와 관련하여 3조사이트에 등록된 판매자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해 유한회사 연극어때는 책임을 지지 않습니다. 상품 및 거래에 관하여 보다 정확한 정보는 해당 판매자에게 직접 확인하여 주시기 바랍니다. Copyright 연극어때. All Rights Reserved. 
                </p>
            </div> */}
        </div>
    );
};

export default CeoMain;