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

  // if(post.id == user.id) {
  //   btnMore.forEach((i) => {
  //     i.addEventListener('click', () => {
  //       modalModify.classList.toggle('on');
  //     })
  //   })
  //   btnClose[1].addEventListener('click', () => {
  //     modalNotify.classList.toggle('on');
  //   })
  // } else {
  //   btnMore.forEach((i) => {
  //     i.addEventListener('click', () => {
  //       modalNotify.classList.toggle('on');
  //     })
  //   })
  //   btnClose[2].addEventListener('click', () => {
  //     modalNotify.classList.toggle('on');
  //   }) 
  // }
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