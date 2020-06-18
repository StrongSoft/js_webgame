const 바디 = document.body;
const 단어 = document.createElement('div');
단어.textContent = '제로초';
document.body.append(단어);

const 폼 = document.createElement('form');
document.body.append(폼);
const 입력창 = document.createElement('input');
폼.append(입력창);
const 버튼 = document.createElement('button');
버튼.textContent = '입력!';
폼.append(버튼);
const 결과창 = document.createElement('div');
document.body.append(결과창);

폼.addEventListener('submit', function 콜백함수(이벤트) {
    이벤트.preventDefault();
    if (단어.textContent[단어.textContent.length - 1] === 입력창.value[0]) {
        결과창.textContent = '딩동댕';
        단어.textContent = 입력창.value;
        입력창.value = '';
        입력창.focus();
    } else {
        결과창.textContent = '땡';
        입력창.value = '';
        입력창.focus();
    }
});