const btnTop = document.querySelector('.post_header');
const post = document.querySelector('.sec_post');
const comment = document.querySelector('.sec_comment');
const modal = document.querySelector('.sec_modal');
const form = document.querySelector('.form_comment')

const btnMore = comment.querySelectorAll('.btn_more');

btnMore.forEach((i) => {
  i.addEventListener('click', () => {
    modal.classList.toggle('on');
  })
})

function closeModal() {
  const btn = modal.querySelector('.btn_close');

  btn.addEventListener('click', () => {
    modal.classList.toggle('on');
  })
}
closeModal();

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