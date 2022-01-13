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
inputImg.addEventListener('change', () => {
  readImg();
})
// 'X'버튼을 누르면 선택한 사진이 삭제 됌.
btnDelete.addEventListener('click', () => {
  prev.style.backgroundImage = '';
})
// 이미지가 2장 이상이면 슬라이드
// 최대 이미지 3장까지
// 게시글 입력창이 텍스트 길이에 따라 늘어남
const textarea = form.querySelector('.inp_textarea');
textarea.addEventListener('keyup', () => {
  textarea.style.height = "1px";
  textarea.style.height = (12+textarea.scrollHeight)+"px";
})