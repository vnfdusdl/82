// 이전 페이지로 이동
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener('click', () => {
    window.history.back();
});

//유효성 검사
let nameInput = document.getElementById('username');
let idInput = document.getElementById('accountname');
const btnSave = document.querySelector('.btn-save');
let nameFlag = false;
let idFlag = false;

function nameTest() {
    const RegExp1 = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/;
    if (!RegExp1.test(nameInput.value)) {
        nameInput.focus();
        nameFlag = false;
    } else {
        nameFlag = true;
    }
}
function idTest() {
    const RegExp2 = /^[a-zA-Z0-9_,]+$/;
    if (!RegExp2.test(idInput.value)) {
        idInput.focus();
        idFlag = false;
    } else {
        idFlag = true;
    }
}
nameInput.addEventListener('keyup', function () {
    nameTest();
    btnAttrChange();
});

idInput.addEventListener('keyup', function () {
    idTest();
    btnAttrChange();
});

// 저장 버튼 활성화 및 비활성화
function btnAttrChange() {
    if (nameFlag && idFlag) {
        btnSave.removeAttribute('disabled');
    } else {
        btnSave.setAttribute('disabled', 'disabled');
    }
}

// 기존 계정 정보 불러오기
async function getUserData() {
    const token = localStorage.getItem('Token');
    const accountName = localStorage.getItem('Accountname');
    const res = await fetch(
        `http://146.56.183.55:5050/profile/${accountName}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        }
    );
    const json = await res.json();
    console.log(json.profile)
    let userImg = document.getElementById('label-img').style.backgroundImage;
    const intro = document.getElementById('intro');
    userImg = json.profile.image
    console.log(userImg);

    nameInput.value = json.profile.username;
    idInput.value = accountName;
    intro.value = json.profile.intro;

    nameTest();
    idTest();
}
getUserData();

// 프로필 사진 변경
document.querySelector('#input-img').addEventListener('change', profileImage);
let imgPreview = document.getElementById('label-img');

async function profileImage(e) {
    const files = e.target.files;
    const result = await imageUpload(files);
    // console.log(localStorage.getItem('url'));
    imgPreview.style.backgroundImage = `url(http://146.56.183.55:5050/${result})`;
    imgPreview.style.backgroundPosition = `center`;
    imgPreview.style.backgroundSize = `cover`;
}

async function imageUpload(files) {
    const formData = new FormData();
    formData.append('image', files[0]);

    const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    const imgFileName = data['filename'];
    return imgFileName;
}

//작성된 내용을 서버에 전송
btnSave.addEventListener('click', formSubmit);

async function formSubmit() {
    const userName = nameInput.value;
    const accountName = idInput.value;
    const intro = document.querySelector('#intro').value;
    // const imageUrl = imgPreview;
    // const reader = new FileReader();
    // reader.readAsDataURL(imageUrl);
    const token = localStorage.getItem('Token');
    try {
        const res = await fetch(`http://146.56.183.55:5050/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username: userName,
                    accountname: accountName,
                    intro: intro,
                    // image: `${reader.result}`,
                },
            }),
        });
        const json = await res.json();
        if (res.status == 200) {
            location.href = './myprofile.html';
        } else {
            console.log(json);
        }
    } catch (err) {
        alert(err);
    }
}
