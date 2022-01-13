//프로필 사진 변경
const imgInput = document.querySelector('#inp_img');
const imgLabel = document.querySelector('#label_img');
imgInput.addEventListener('change', (e) => {
  let image = e.target.files[0]; //파일 선택
  const reader = new FileReader();
  reader.readAsDataURL(image); // 파일을 읽는 메서드
  reader.addEventListener('load', () => {
    console.log(reader.result);
    imgLabel.innerHTML =
    `<img src="${reader.result}" alt="기본프로필"
    class="img_profile">
    <img src="../images/upload-file.png" alt="프로필사진 업로드" class="img_upload">`
  })
  
});

// 유효성검사와 버튼활성화
const btnNext = document.querySelector(".btn_next")
const formSignIn = document.querySelector('.form_signIn');

const email = document.querySelector('#inp_loginEmail');
const pwd = document.querySelector('#inp_loginPw');

const pwdWarn = document.querySelector(".txt_pwdWarn");

// 이메일 유효성검사
const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

email.addEventListener('keyup', () => {
  if (exptext.test(email.value) == false) {
    document.querySelector(".txt_emailWarn.RegExp").innerText = '*이메일 형식이 올바르지 않습니다.';
  } else if (exptext.test(email.value) == true) {
    document.querySelector(".txt_emailWarn.RegExp").innerText = '';
  }
});


// 비밀번호 6자 이상
pwd.addEventListener('keyup', () => {
  if (pwd.value.length > 5) {
    document.querySelector(".txt_pwdWarn").innerText = '';
  } else {
    document.querySelector(".txt_pwdWarn").innerText = '*비밀번호는 6자 이상이어야 합니다.';
  }
});


// 버튼활성화
formSignIn.addEventListener('input', () => {
  btnAttrChange(); 
});

function btnAttrChange() {
  if (exptext.test(email.value) && pwd.value.length > 5) {
    btnNext.setAttribute('type', 'button');
  } else {
    btnNext.setAttribute('type', 'submit');
  }
};

// 프로필설정으로 넘어가기
const $signIn = document.querySelector('.signIn');
const $setProfile = document.querySelector('.setProfile');
// 이메일 중복체크 함수
async function checkEmailValid(emailVal) {
  const url = "http://146.56.183.55:5050";
  const emailData = {
    "user": {
      "email":email
    }
  }
  const res = await fetch(url+'/user/emailvalid', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify(emailData)
  })
  const json = await res.json();
  console.log(json)
  return json.message;
}

btnNext.addEventListener("click", async () => {
  const emailVal = email.value;
  const pwdVal = pwd.value;
  const emailvalid = await checkEmailValid(email)

  if (emailvalid) {
    $signIn.style.display = "none"
    // profile style dp - block
  } else {
    document.querySelector(".txt_emailWarn.Duplicate").innerText = '*중복된 이메일입니다.';
  }
})