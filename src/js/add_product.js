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

//유효성 검사 
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');
const itemLink = document.getElementById('item-link');
const btnSave = document.querySelector('.btn-save');
let nameFlag = false;
let priceFlag = false;
let linkFlag = false;

itemName.addEventListener('keyup', function() {
    const RegExp1 = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    if (!RegExp1.test(itemName.value)) {
        itemName.focus();
        nameFlag = false;
    } else {
        nameFlag = true;
    }
    btnAttrChange()
});

itemPrice.addEventListener('keyup', function() {
    const RegExp2 = /[^0-9]/gi;
    itemPrice.value = itemPrice.value.replace(RegExp2,'');
    btnAttrChange()
});

itemLink.addEventListener('keyup', function() {
    const RegExp3 = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    if(!RegExp3.test(itemLink.value)) {
        let linkFlag = false;
    } else {
        linkFlag = true;
    }
    btnAttrChange()
})

// 저장 버튼 활성화 및 비활성화
function btnAttrChange() {
    if (nameFlag && itemPrice.value && linkFlag) {
        btnSave.setAttribute('type', 'submit');
    } else {
        btnSave.setAttribute('type', 'button');
    }
}