// 이전 페이지로 이동
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener('click', () => {
    window.history.back();
});

//상품 사진 변경
const imgInput = document.querySelector('#input-img');
const imgLabel = document.querySelector('#label-img');
imgInput.addEventListener('change', (e) => {
    let image = e.target.files[0]; //파일 선택
    const reader = new FileReader();
    reader.readAsDataURL(image); // 파일을 읽는 메서드
    reader.addEventListener('load', ()=>{
        console.log(reader.result);
        imgLabel.style = `background-image : url(${reader.result}); background-position: center; background-size : cover`
    })
    
})

