// 유효성검사와 버튼활성화
const btnNext = document.querySelector(".btn_next")
const formSignIn = document.querySelector('.form_signIn');

const email = document.querySelector('#inp_loginEmail');
const pwd = document.querySelector('#inp_loginPw');

const pwdWarn = document.querySelector(".txt_pwdWarn");

// 이메일 유효성검사
const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
// 키업 보다는 체인지
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
// 이건 디스플레이만 감춰지나 확인한거임
// 이메일 중복체크 함수
const url = "http://146.56.183.55:5050";
async function checkEmailValid(email) {
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
  // return json.message;
  return json.message == "사용 가능한 이메일 입니다." ? true : false
}

btnNext.addEventListener("click", async () => {
  // 요거는 왜 꼭 안에서? 는 클릭할때의 값이니까^^
  const emailVal = email.value;
  const emailValid = await checkEmailValid(emailVal)
  console.log(emailVal);
  console.log(emailValid);
  if (emailValid) {
    $signIn.style.display = "none"
    $setProfile.style.display = "block"
  } else {
    document.querySelector(".txt_emailWarn.Duplicate").innerText = '*중복된 이메일입니다.';
  }
})
// 지울때 중복된이메일 입니다 없애기
email.addEventListener("keyup", () => {
  document.querySelector(".txt_emailWarn.Duplicate").innerText = '';
})

// 요거는 이미지태그를 가져온거
const imgPre = document.querySelector("#img_pre");

// 사진 데이터 보내기
// 데이터를 폼 형식으로 보내주는걸 js로 컨트롤 하는거임
async function imageUpload(files){
  const formData = new FormData();
  formData.append("image", files[0]);//formData.append("키이름","값")
  console.log(formData);
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  const productImgName = data["filename"];
  console.log(productImgName); // 1642158806566.png 요런식임
  return productImgName
}

// 사진 데이터 받기 + 뿌리기?
// 이제 서버에 내 사진이 잘 가있다.
// 새탭에서 이미지를 열어보면 위에 주소가 보이는것처럼!
async function profileImage(e) {
  // 여기서 말하는 이벤트란 인풋이 변하는것=>사진을올리는것
  const files = e.target.files
  const result = await imageUpload(files)
  imgPre.src = url+"/"+result // 요청url/123889127.png
  console.log(result) // 1642158806566.png 
}
// 인풋에 변화가 생기면 해당 태그의 소스값을 서버에서 받아온다
document.querySelector("#inp_img").addEventListener("change",profileImage)


// 종합으로 내 프로필설정값 보내기
const submitBtn = document.querySelector(".btn_start");

async function join(){
  const email = document.querySelector("#inp_loginEmail").value;
  const password = document.querySelector("#inp_loginPw").value;
  const userName = document.querySelector("#inp_name").value;
  const userId = document.querySelector("#inp_Id").value;
  const intro = document.querySelector("#inp_intro").value;
  const imageUrl = document.querySelector("#img_pre").src
  try{
      const res = await fetch("http://146.56.183.55:5050/user", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body : JSON.stringify({
              "user": {
                  "email": email,
                  "password": password,
                  "username": userName,
                  "accountname": userId,
                  "intro": intro,
                  "image": imageUrl,
              }
          })
      })
      // 확인
      console.log(res);
      
      const json = await res.json();
      const message = json.message;
      // 확인
      console.log(json);
      console.log(message);

      if(res.status==200){
          console.log("성공^^^^^^")
          // location.href = "./home.html"
      }
      else{
          console.log(json)
      }
  }catch(err){
      alert(err)
  }
}
submitBtn.addEventListener("click",join)
