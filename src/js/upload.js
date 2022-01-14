// 게시글이 입력되면 '업로드'버튼 활성화
const form = document.querySelector('.form_upload')

function send() {
  const textarea = form.querySelector('.inp_textarea');
  const file = form.querySelector('.inp_file')
  const btn = form.querySelector('.btn_upload');
  
  textarea.addEventListener('keyup', () => {
    if (textarea.value != '') {
      btn.removeAttribute('disabled');
      btn.style.backgroundColor = '#F26E22';
    } else if (textarea.value == '') {
      btn.setAttribute('disabled', 'disabled');
      btn.style.backgroundColor = '#FFC7A7';
    }
  })
  file.addEventListener('change', () => {
    if (file.value != '') {
      btn.removeAttribute('disabled');
      btn.style.backgroundColor = '#F26E22';
    } else {
      btn.hasAttribute('disabled');
    }
  })
}
send();
// 게시글 입력창이 텍스트 길이에 따라 늘어남
const textarea = form.querySelector('.inp_textarea');
textarea.addEventListener('keyup', () => {
  textarea.style.height = "1px";
  textarea.style.height = (12+textarea.scrollHeight)+"px";
})
// 사진을 선택하면 미리보기로 출력됌.
// 엘리먼트를 만들어 삽입해야함.
const inputImg = form.querySelector('.inp_file');
const prev = form.querySelector('.img_upload');
const btnDelete = form.querySelector('.btn_delete');
const listImg = form.querySelector('.img_upload');

function readImg() {
  const read = new FileReader();
  
  read.onload = () => {
    prev.style.backgroundImage = `url(${read.result})`;
  }
  read.readAsDataURL(inputImg.files[0]);
}
inputImg.addEventListener('change', readImg);

// 'X'버튼을 누르면 선택한 사진이 삭제 됌.
btnDelete.addEventListener('click', () => {
  prev.style.backgroundImage = '';
})
// 이미지가 2장 이상이면 슬라이드
// 최대 이미지 3장까지





// API
const $image =document.querySelector(".inp_file")
const $content = document.querySelector(".inp_textarea")
const $submitBtn = document.querySelector(".btn_upload")
//여기부터
async function imageUpload(files,index){
  const formData = new FormData();
  formData.append("image", files[index]);//formData.append("키이름","값")
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
    method: "POST",
    body : formData
  })
  const data = await res.json()
  console.log('data :', data)
  const productImgName = data["filename"];
  console.log('imgname: ' + productImgName)
  return productImgName
}
async function createPost(e) {
  const url = "http://146.56.183.55:5050"
  const token = localStorage.getItem("Token")
  //입력한 텍스트 불러와야함
  const contentText = $content.value
  console.log("contentText: " + contentText)
  //여기는 나중에 이미지 주소가 추가될 예정
  const imageUrls = []
  const files = $image.files
  //file갯수를 판별하여 3개 이하일때만 실행하게한다.
  if (files.length<=3) {
    // file을 입력한 갯수만큼 반복해서 실행합니다. 여기서 이미지 url배열에 추가되는부분
    for (let index = 0; index < files.length; index++) {
        const imgurl = await imageUpload(files,index)
        //완성된 url을 만들어서 넣어준다.
        imageUrls.push(url+'/'+imgurl)
    }
    const res = await fetch(url+"/post",{
        method:"POST",
        headers:{
                    "Authorization" : `Bearer ${token}`,//토큰을 넣어줍니다. 
                    "Content-type" : "application/json"
        },
        body:JSON.stringify({
            "post": {
                    "content": contentText,
                    "image": imageUrls+'' //"imageurl1", "imageurl2" 형식으로 
            }
        })
    })
    console.log(imageUrls)
    const json = await res.json()
    console.log('json: ', json)
  }else{
      alert("아 이미지 갯수가 너무 많소")
  }
}
//여기까지 이미지 여러개 업로드하기.
$submitBtn.addEventListener('click',(e) => {
  e.preventDefault();
  createPost()
})