// 이전 페이지로 이동
const btnBack = document.querySelector('.btn-back');

btnBack.addEventListener('click', () => {
    window.history.back();
})