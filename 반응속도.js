let 스크린 = document.querySelector('#screen');
let 시작시간;
let 끝시간;
let 타임아웃;
let 기록 = [];
스크린.addEventListener('click', function () {

    if(스크린.classList.contains('waiting')){ //현재 준비 상태인지 파악
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요.';
        타임아웃 = setTimeout(function () {
            시작시간 = new Date();
            console.log('시간 지났다.');
            스크린.click();
        }, Math.floor(Math.random() * 1000) + 2000); //2000~3000 사이의수
    } else if(스크린.classList.contains('ready')){
        if(!시작시간){
            clearTimeout(타임아웃);
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
            스크린.textContent = '부정출발';
        } else {
            스크린.classList.remove('ready');
            스크린.classList.add('now');
            스크린.textContent = '클릭하세요.';
        }
    } else if(스크린.classList.contains('now')){
        끝시간 = new Date();
        console.log('반응속도',끝시간 - 시작시간,'ms');
        기록.push(끝시간 - 시작시간);

        시작시간 = null;
        끝시간 = null;
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요.';
    }
});