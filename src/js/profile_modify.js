// 이전 페이지로 이동
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener('click', () => {
    window.history.back();
});


//유효성 검사 
const nameInput = document.getElementById('username');
const idInput = document.getElementById('accountname');
const btnSave = document.querySelector('.btn-save');
let nameFlag = false;
let idFlag = false;

nameInput.addEventListener('keyup', function() {
    const RegExp1 = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/;
    if (!RegExp1.test(nameInput.value)) {
        nameInput.focus();
        nameFlag = false;
    } else {
        nameFlag = true;
    }
    btnAttrChange()
});

idInput.addEventListener('keyup', function() {
    const RegExp2 = /^[a-z0-9_,]+$/;
    if (!RegExp2.test(idInput.value)) {
        idInput.focus();
        idFlag = false;
    } else {
        idFlag = true;
    }
    btnAttrChange()
});

// 저장 버튼 활성화 및 비활성화
function btnAttrChange() {
    if (nameFlag && idFlag) {
        btnSave.setAttribute('type', 'submit');
    } else {
        btnSave.setAttribute('type', 'button');
    }
}

//프로필 사진 변경
const imgInput = document.querySelector('#input-img');
const imgLabel = document.querySelector('#label-img');
imgInput.addEventListener('change', (e) => {
    let image = e.target.files[0]; //파일 선택
    const reader = new FileReader();
    reader.readAsDataURL(image); // 파일을 읽는 메서드
    reader.addEventListener('load', () => {
        console.log(reader.result);
        imgLabel.style = `background-image : url(${reader.result}); background-position: center; background-size : cover`;
    });
});
