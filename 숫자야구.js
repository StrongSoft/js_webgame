const 바디 = document.body;
let 숫자후보;
let 숫자배열;

function 숫자뽑기() {
    숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    숫자배열 = [];
    for (let i = 0; i < 4; i += 1) {
        const 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        숫자배열.push(뽑은것);
    }
    console.info(숫자배열);
}

숫자뽑기();
console.info(숫자배열);

const 결과 = document.createElement('h1');
바디.append(결과);
const 폼 = document.createElement('form');
document.body.append(폼);
const 입력창 = document.createElement('input');
입력창.maxLength = 4;
폼.append(입력창);
const 버튼 = document.createElement('button');
버튼.textContent = '입력!';
폼.append(버튼);

let 틀린횟수 = 0;
폼.addEventListener('submit', function 비동기(e) {
    e.preventDefault();
    const 답 = 입력창.value;
    if (답 === 숫자배열.join('')) {
        결과.textContent = '홈런';
        입력창.value = '';
        입력창.focus();
        숫자뽑기();
        틀린횟수 = 0;
    } else { //답이 틀리면
        const 답배열 = 답.split('');
        let 스트 = 0;
        let 볼 = 0;

        틀린횟수 += 1;
        if (틀린횟수 > 10) {
            결과.textContent = '10번 넘게 틀려서 실패! 답은' + 숫자배열.join('') + '였습니다.';
            입력창.value = '';
            입력창.focus();
            숫자뽑기();
            틀린횟수 = 0;
        } else {
            console.info('답이틀리면', 답배열);
            for (let i = 0; i < 3; i += 1) {
                if (Number(답배열[i]) === 숫자배열[i]) {
                    스트 += 1;
                } else if (숫자배열.indexOf(Number(답배열[i])) > -1) {
                    볼 += 1;
                }
            }
            결과.textContent = 스트 + '스트라이크 ' + 볼 + '볼입니다.';
            입력창.value = '';
            입력창.focus();
        }


    }
});