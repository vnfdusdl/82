const post = document.querySelector('.sec_post');
const form = document.querySelector('.form_comment')
const btnMore = document.querySelectorAll('.btn_more');
const btnClose = document.querySelectorAll('.btn_close');

function modalSet() {
  const btnMenu = document.querySelector('.btn_menu');
  const modalSet = document.querySelector('.modal_set');

  btnMenu.addEventListener('click', () => {
    modalSet.classList.toggle('on');
  })
  btnClose[0].addEventListener('click', () => {
    modalSet.classList.toggle('on');
  })
}
modalSet()

function modalNotify() {
  const modalModify = document.querySelector('.modal_modify');
  const modalNotify = document.querySelector('.modal_notify');

  btnMore.forEach((i) => {
    i.addEventListener('click', () => {
      modalNotify.classList.toggle('on');
    })
  })
  btnClose[2].addEventListener('click', () => {
    modalNotify.classList.toggle('on');
  })
}
modalNotify()

function imgShow() {
  const img = post.querySelectorAll('.item_img');
  const btnSlide = post.querySelectorAll('.btn_slide');

  btnSlide[0].addEventListener('click', () => {
    img[0].style.display = 'block'
    img[1].style.display = 'none'
    img[2].style.display = 'none'
    btnSlide[0].style.backgroundColor = '#F26E22'
    btnSlide[1].style.backgroundColor = '#FFFFFF'
    btnSlide[2].style.backgroundColor = '#FFFFFF'
  })
  btnSlide[1].addEventListener('click', () => {
    img[0].style.display = 'none'
    img[1].style.display = 'block'
    img[2].style.display = 'none'
    btnSlide[0].style.backgroundColor = '#FFFFFF'
    btnSlide[1].style.backgroundColor = '#F26E22'
    btnSlide[2].style.backgroundColor = '#FFFFFF'
  })
  btnSlide[2].addEventListener('click', () => {
    img[0].style.display = 'none'
    img[1].style.display = 'none'
    img[2].style.display = 'block'
    btnSlide[0].style.backgroundColor = '#FFFFFF'
    btnSlide[1].style.backgroundColor = '#FFFFFF'
    btnSlide[2].style.backgroundColor = '#F26E22'
  })
}
imgShow()

function send() {
  const textarea = form.querySelector('.inp_comment');
  const btn = form.querySelector('.btn_comment');
  
  textarea.addEventListener('keyup', () => {
    if (textarea.value != '') {
      btn.removeAttribute('disabled');
      btn.style.color = '#F26E22';
    } else if (textarea.value == '') {
      btn.hasAttribute('disabled')
      btn.style.color = '#C4C4C4';
    }
  })
}
send();



// API
console.log(localStorage.getItem("Token"))
// if(localStorage.getItem('Token') && localStorage.getItem('postId')){
//   getPostData()
// }
// else{
//   location.href = './login.html'
// }
// console.log(localStorage.getItem("Token"))//요거는 로컬스토리지에 값잘 있나 확인.
async function getPostData() {
  const url = "http://146.56.183.55:5050";
  const postId = localStorage.getItem('postId'); // 피드에서 클릭한 게시물의 post_id값
  const token = localStorage.getItem('Token');
  const res = await fetch(url+`/post/${postId}`, {
    method:"GET",
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  })
  const json = await res.json()
  console.log(json);
  const post = json.post
  console.log(post);

  
// 데이터 호출
  const profileImage = post.author.image;
  const username = post.author.username;
  console.log(username);
  const accountname = post.author.accountname;
  const content = post.content;
  const image = post.image; // 이미지 데이터 삽입 방법 고민
  console.log(image.split(',')); // 만약 2장 이상이면 배열로 만들어서 이미지 삽입
  const heartCount = post.heartCount;
  const commentCount = post.commentCount;
  const hearted = post.hearted;
  const createdAt = post.createdAt.split('-');
// 데이터 입력
  const secPost = document.querySelector('.sec_post');
  const postProfile = secPost.querySelector('.img_profile')
  const postName = secPost.querySelector('.data_name');
  const postAccount = secPost.querySelector('.data_account');
  const postContent = secPost.querySelector('.data_content');
  const postImg = secPost.querySelector('.data_img')
  const postHeart = secPost.querySelector('.data_heart');
  const postComment = secPost.querySelector('.data_comment');
  const postCreate = secPost.querySelector('.data_create');
// 데이터 출력
  postProfile.style.backgroundImage = `url(${profileImage})`
  postName.textContent = username;
  postAccount.textContent = accountname;
  postContent.textContent = content;
  postHeart.textContent = heartCount;
  postComment.textContent = commentCount;
  postCreate.textContent = `${createdAt[0]}년 ${createdAt[1]}월 ${createdAt[2].slice(0, 2)}일`;
  postImg.src = image;
}
getPostData()