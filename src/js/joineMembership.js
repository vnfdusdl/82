    //프로필 사진 변경
    const imgInput = document.querySelector('#inp_img');
    const imgLabel = document.querySelector('#label_img');
    imgInput.addEventListener('change', (e) => {
      let image = e.target.files[0]; //파일 선택
      const reader = new FileReader();
      reader.readAsDataURL(image); // 파일을 읽는 메서드
      reader.addEventListener('load', () => {
        console.log(reader.result);
        imgLabel.innerHTML =
          `<img src="${reader.result}" alt="기본프로필"
          class="img_profile">
          <img src="../images/upload-file.png" alt="프로필사진 업로드" class="img_upload">`
      })

    })