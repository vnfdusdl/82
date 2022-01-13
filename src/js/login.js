// 비동기 통신을 사용한 로그인 기능
async function login() {
  const email = document.querySelector('#inp_loginEmail');
  const pwd = document.querySelector('#inp_loginPw');
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
  // 외않됌? 포인트 res.json()도 비동기. await을 해줘야한다.
  console.log(json);
  localStorage.setItem("Token",json.user.token)
  // location.href = "../../pages/home.html"
}
const $loginBtn = document.querySelector('#btn_login')
$loginBtn.addEventListener("click",login)

// 눌렀을때 에러처리.