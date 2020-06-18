let 숫자1 = Math.ceil(Math.random()*9);
let 숫자2 = Math.ceil(Math.random()*9);
let 결과 = 숫자1*숫자2;

const 바디 = document.body;
const 단어 = document.createElement('div');
단어.textContent = String(숫자1) + '곱하기' + String(숫자2) + '는?';
document.body.append(단어);

const 폼 = document.createElement('form');
document.body.append(폼);
const 입력창 = document.createElement('input');
입력창.type = 'number';
폼.append(입력창);
const 버튼 = document.createElement('button');
버튼.textContent = '입력!';
폼.append(버튼);
const 결과창 = document.createElement('div');
document.body.append(결과창);

폼.addEventListener('submit', function 콜백함수(이벤트) {
    이벤트.preventDefault();
    if(결과 === Number(입력창.value)){
        결과창.textContent = '딩동댕';
        숫자1 = Math.ceil(Math.random()*9);
        숫자2 = Math.ceil(Math.random()*9);
        결과 = 숫자1*숫자2;
        단어.textContent = String(숫자1) + '곱하기' + String(숫자2) + '는?';
        입력창.value = '';
        입력창.focus();
    } else {
        결과창.textContent = '땡';
        입력창.value = '';
        입력창.focus();
    }
});