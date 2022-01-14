const feedImages = document.querySelectorAll(".imagelist_feed");
const feedCard = document.querySelector(".card_wrap");
const feedSection = document.querySelector(".feed_section");
const moreImageBtn = document.querySelectorAll(".more_image");
const modal = document.querySelector(".modal");
const closeBtn = modal.querySelector(".close-area");
const modalContent = document.querySelector(".content");

const body = document.body;

feedImages.forEach((e) => {
  const imgCount = e.querySelectorAll(".image_feed").length;
  const moreImage = e.querySelector(".more_image");
  if (imgCount <= 1) {
    moreImage.classList.add("sr-only");
  }
});

moreImageBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    modal.style.display = "flex";
    modal.scrollTop;
    const imagesParent = e.target.parentNode;
    const images = imagesParent.querySelectorAll("img");
    images.forEach((img) => {
      const tempImg = document.createElement("img");
      tempImg.src = img.src;
      tempImg.alt = img.alt;
      tempImg.className = img.className;
      modalContent.appendChild(tempImg);
    });
    feedSection.classList.add("modal_active");
    body.classList.add("modal_active");
  });
});

// 이미지 모달창 닫기 버튼
closeBtn.addEventListener("click", (e) => {
  modal.style.display = "none";
  modalContent.innerHTML = "";
  feedSection.classList.remove("modal_active");
  body.classList.remove("modal_active");
});

// 이미지 모달창 영역 밖 클릭 시 닫기
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    modal.style.display = "none";
    modalContent.innerHTML = "";
    feedSection.classList.remove("modal_active");
    body.classList.remove("modal_active");
  }
});