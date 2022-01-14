// 버튼활성화
const btnLogin = document.querySelector("#btn_login")
const formLogin = document.querySelector('.form_login');

const email = document.querySelector('#inp_loginEmail');
const pwd = document.querySelector('#inp_loginPw');

formLogin.addEventListener('input', () => {
  btnAttrChange(); 
});

function btnAttrChange() {
  if (email.value && pwd.value) {
    btnLogin.setAttribute('type', 'button');
  } else {
    btnLogin.setAttribute('type', 'submit');
  }
}
// 비동기 통신을 사용한 로그인 기능
async function login() {
  const url = "http://146.56.183.55:5050";
  const loginData = {
            "user":{
                    "email": email.value,
                    "password": pwd.value
                    }
            }

  const res = await fetch(url+'/user/login',{
      //메소드 구분
      method:"POST",
      //헤더
      headers:{
          "Content-type" : "application/json"
      },
      //이건 오브잭트를 문자열로 바꿔주는 부분
      body:JSON.stringify(loginData)
  });
  // console.log(res);
  const json = await res.json();
  // res.json()도 비동기. await을 해줘야한다.
  console.log(json);
  console.log(json.user.token);
  console.log(json.user.accountname); // 잘 뜬다. 만약 넣을라면 넣을 수 있겠다.
  if (json.message) {
    document.querySelector('.txt_loginWarn').innerText = `* ${json.message}`
  }
  localStorage.setItem("Token",json.user.token)
  // accountname 이나 id를 같이 넣어준다
  // 토큰만으로 유저의 정보를 알 수 있나?
  localStorage.setItem("Accountname",json.user.accountname)
  // location.href = "home.html"

}
const $loginBtn = document.querySelector('#btn_login')
$loginBtn.addEventListener("click",login)