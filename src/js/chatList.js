// 뒤로 가기
const btnBack = document.querySelector('.btn_back');
btnBack.addEventListener('click', () => {
    window.history.back();
});