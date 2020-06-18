let dataset = [];
let tbody = document.querySelector('#table tbody');
let 중단플래그 = false;
let 열은칸 = 0;
const 코드표 = {
    연칸: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,
}

document.querySelector('#exec').addEventListener('click', function () {
    //내부 초기화
    tbody.innerHTML = '';
    document.querySelector('#result').textContent = '';
    dataset = [];
    열은칸 = 0;
    중단플래그 = false;
    const hor = document.querySelector('#hor').value;
    const ver = document.querySelector('#ver').value;
    const mine = document.querySelector('#mine').value;

    // 지뢰 위치 뽑기
    const 후보군 = Array(hor * ver)
        .fill()
        .map(function (요소, 인덱스) {
        return 인덱스;
    });
    const 셔플 = [];

    while (후보군.length > hor * ver - mine) {
        const 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
        셔플.push(이동값);
    }

    console.log(셔플);
    // 지뢰 테이블 만들기
    for (let i = 0; i < ver; i += 1) {
        const arr = [];
        const tr = document.createElement('tr');
        dataset.push(arr);
        for (let j = 0; j < hor; j++) {
            arr.push(코드표.보통칸);
            const td = document.createElement('td');
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (중단플래그) {
                    return;
                }
                const 부모tr = e.currentTarget.parentNode;
                const 부모tbody = e.currentTarget.parentNode.parentNode;
                const 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                const 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                if (dataset[줄][칸] === 코드표.연칸) { // 이미 연 칸은 오른쪽 눌러도 효과 없게
                    return;
                }
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if(dataset[줄][칸] !== 코드표.지뢰){
                        dataset[줄][칸] = 코드표.깃발지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.깃발;
                    }
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if(dataset[줄][칸] !== 코드표.깃발지뢰){
                        dataset[줄][칸] = 코드표.물음표지뢰;;
                    } else {
                        dataset[줄][칸] = 코드표.물음표;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if (dataset[줄][칸] === 코드표.물음표지뢰) {
                        e.currentTarget.textContent = 'X';
                        dataset[줄][칸] = 코드표.지뢰;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });
            td.addEventListener('click', function (e) {
                if (중단플래그) {
                    return;
                }

                //클릭 했을때 주변 지뢰 개수
                const 부모tr = e.currentTarget.parentNode;
                const 부모tbody = e.currentTarget.parentNode.parentNode;
                const 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                const 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                if ([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸])) {
                    return;
                }
                // 클릭했을때
                e.currentTarget.classList.add('opened');
                열은칸 += 1;
                if (dataset[줄][칸] === 코드표.지뢰) {
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패 !!!';
                    중단플래그 = true;
                } else {
                    let 주변 = [
                        dataset[줄][칸 - 1], dataset[줄][칸 + 1]
                    ];
                    //console.log(dataset[줄 - 1]);
                    if (dataset[줄 - 1]) {
                        주변 = 주변.concat(dataset[줄 - 1][칸 - 1], dataset[줄 - 1][칸], dataset[줄 - 1][칸 + 1]);
                    }
                    if (dataset[줄 + 1]) {
                        주변 = 주변.concat(dataset[줄 + 1][칸 - 1], dataset[줄 + 1][칸], dataset[줄 + 1][칸 + 1]);
                    }

                    const 주변지뢰개수 = 주변.filter(function (v) {
                        return [코드표.지뢰,코드표.깃발지뢰,코드표.물음표지뢰].includes(v);
                    }).length;
                    // 거짓인 값: false, '', 0, null, undefined, NaN
                    e.currentTarget.textContent = 주변지뢰개수 || '';
                    dataset[줄][칸] = 코드표.연칸;
                    if (주변지뢰개수 === 0) {
                        var 주변칸 = [];
                        if (tbody.children[줄 - 1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 - 1].children[칸 - 1],
                                tbody.children[줄 - 1].children[칸],
                                tbody.children[줄 - 1].children[칸 + 1]
                            ]);
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸 - 1],
                            tbody.children[줄].children[칸 + 1]
                        ]);
                        if (tbody.children[줄 + 1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 + 1].children[칸 - 1],
                                tbody.children[줄 + 1].children[칸],
                                tbody.children[줄 + 1].children[칸 + 1]
                            ]);
                        }
                        주변칸.filter(function (v) {
                            return !!v;
                        }).forEach(function (옆칸) {
                            const 부모tr = 옆칸.parentNode;
                            const 부모tbody = 옆칸.parentNode.parentNode;
                            const 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            const 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            if (dataset[옆칸줄][옆칸칸] !== 코드표.연칸) {
                                옆칸.click();
                            }

                        });
                    }
                }
                //console.log(열은칸);
                if (열은칸 === hor * ver - mine) {
                    중단플래그 = true;
                    document.querySelector('#result').textContent = '승리 ~!!';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰 심기
    for (let k = 0; k < 셔플.length; k++) { // 예 60
        const 세로 = Math.floor(셔플[k] / ver);  // 예 7 -> 6
        const 가로 = 셔플[k] % ver; // 예 0 -> 0
        console.dir(tbody);
        console.log(세로);
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 코드표.지뢰;
    }
});
