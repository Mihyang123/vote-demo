
// 제이쿼리의 document.ready와 같다.
document.addEventListener("DOMContentLoaded", () => {
    const request = new XMLHttpRequest();
    // 1. 연결 시작
    request.open("POST", "http://localhost:1090/questions/list", true);
    
    // 2. 헤더 값 설정
    request.setRequestHeader("Content-Type", "application/json");
    
    // 3. 파라미터 전송
    request.send(JSON.stringify({
        projectCd: 1005, 
        siteId: "KITE",
        langCd: "KO",
        voteNo: 13,
        useYn: "Y",
        delYn: "N",
    }));    
    
    request.onload = () => {

        // status = 네트워크 상태
        // response, responseText = 결과값 반환해줌
        const voteList = JSON.parse(request.response);
        switch(request.status) {
            case 200:
                document.querySelector("#voteTitle").innerHTML = voteList.list[0].content;
                document.querySelector("#answerYes").innerHTML = voteList.list[0].answer[0].content;
                document.querySelector("#answerNo").innerHTML = voteList.list[0].answer[1].content;
            break;
            case 400:
                alert("페이지를 찾을 수 없습니다."); 
            break;
            case 500:
                alert("파라미터 오류, 관리자에게 문의하세요.");
            break;
            default:
                alert("인증오류, 관리자에게 문의하세요.");
            break;
        }
    };

});

// 입력
const addVote = () => {
    const request = new XMLHttpRequest();

    // 1. 연결 시작
    request.open("POST", "http://localhost:1090/statistic/", true);

    // 2. 헤더 값 설정
    request.setRequestHeader("Content-Type", "application/json");
    
    // 3. 파라미터 전송
    request.send(JSON.stringify({
        projectCd: "KITE",
        siteId: 1005,
        voteNo: 13,
        questionNo: 4,
        questionVal: "TEST입니다. 동의하십니까?",
        answerNo: document.querySelector("input[name=vote]").checked  === true ? "4" : "5",
        answerVal: document.querySelector("input[name=vote]").checked  === true ? "네. 동의합니다." : "아니오, 그럴 수 없습니다.",
        userNo: 4006
    }));  

    request.onload = () => {
        // status = 네트워크 상태
        // response, responseText = 결과값 반환해줌
        switch(request.status) {
            case 200:
                alert("소중한 투표! 감사합니다!");
                getVoteList();
            break;
            case 400:
                alert("페이지를 찾을 수 없습니다."); 
            break;
            case 500:
                alert("파라미터 오류, 관리자에게 문의하세요.");
            break;
            default:
                alert("인증오류, 관리자에게 문의하세요.");
            break;
        }
    };   
};

// 초기화
const reset = () => {
    location.reload();
};

// 결과 총 목록 입력
const getVoteList = () => {
    const request = new XMLHttpRequest();

    // 1. 연결 시작
    request.open("POST", "http://localhost:1090/statistic/by-user-result", true);

    // 2. 헤더 값 설정
    request.setRequestHeader("Content-Type", "application/json");
    
    // 3. 파라미터 전송
    request.send(JSON.stringify({
        projectCd: "KITE",
        siteId: "1005",
        langCd: "KO",
        voteNo: "13",
    }));  

    request.onload = () => {
        // status = 네트워크 상태
        // response, responseText = 결과값 반환해줌
        let resultList = JSON.parse(request.response);
        switch(request.status) {
            case 200:
                resultList.list.map(data => {
                    document.querySelector("#tableData").innerHTML +=
                        '<tr><th><p class="fs-6 fw-light">' + data.answerVal + '</p></th>' +
                        '<td><p class="fs-6 fw-light">' +  data.totalCount + '</p></td></tr>';
                });
            break;
            case 400:
                alert("페이지를 찾을 수 없습니다."); 
            break;
            case 500:
                alert("파라미터 오류, 관리자에게 문의하세요.");
            break;
            default:
                alert("인증오류, 관리자에게 문의하세요.");
            break;
        }
    };  
};