// 이전 페이지로 이동
const btnBack = document.querySelector('.btn-back');

btnBack.addEventListener('click', () => {
    window.history.back();
});


// 유효성 검사
const formUserProfile = document.querySelector('.form-user-profile');
const btnSave = document.querySelector('.btn-save');
let btnSaveFlag = false;

// form 에 change가 일어났을 때, 유효성 검사 후 저장버튼 활성화
formUserProfile.addEventListener('change', () => {
    infoModify_check();
    btnAttrChange(); 
});

function infoModify_check() {
    const userName = document.querySelector('#username');
    const accountName = document.querySelector('#accountname');

    const RegExp1 = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/;
    const RegExp2 = /^[a-z0-9_,]+$/; 

    // username 유효성 검사
    if (!RegExp1.test(userName.value)) {
        userName.focus();
        btnSaveFlag = false;
        return false;
    }

    //accountname 유효성 검사
    if (!RegExp2.test(accountName.value)) {
        accountName.focus();
        btnSaveFlag = false;
        return false;
    }

    btnSaveFlag = true;
}


// 저장 버튼 활성화 및 비활성화
function btnAttrChange() {
    if (btnSaveFlag) {
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
    reader.addEventListener('load', ()=>{
        console.log(reader.result);
        imgLabel.style = `background-image : url(${reader.result}); background-position: center; background-size : cover`
    })
    
})
