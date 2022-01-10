const iList = document.querySelector(".icon_list");
const iAlbum = document.querySelector(".icon_album");
const feedCard = document.querySelector(".card_wrap");
const feedImages = document.querySelectorAll(".imagelist_feed");
const feedEditBtn = document.querySelector(".edit_feed");
const moreImageBtn = document.querySelectorAll(".more_image");
const feedSection = document.querySelector(".feed_section");
const modal = document.querySelector(".modal");
const modalFeedEdit = document.querySelector(".modal_feed");
const modalProfile = document.querySelector(".modal_profile");
const logoutProfile = document.querySelector(".logout_profile");
const closeBtn = modal.querySelector(".close-area");
const modalContent = document.querySelector(".content");
const modalLogout = document.querySelector(".modal_logout");
const cancelBtn = modalLogout.querySelector(".cancel");
const main = document.querySelector("main");
const followBtn = document.querySelector(".follow_user");
const profileBtn = document.querySelector(".btn_profile");
const body = document.body;

// 다중 이미지 숨김처리
feedImages.forEach((e) => {
  const imgCount = e.querySelectorAll(".image_feed").length;
  const moreImage = e.querySelector(".more_image");
  if (imgCount <= 1) {
    moreImage.classList.add("sr-only");
  }
});

// 팔로우 on/off
followBtn.addEventListener("click", (e) => {
  main.classList.toggle("following");
  followBtn.classList.toggle("following");
  if (followBtn.classList.contains("following")) {
    followBtn.textContent = "팔로잉";
  } else {
    followBtn.textContent = "팔로우";
  }
});

// 게시글 리스트형 / 앨범형 전환
function iconClickHandler(e) {
  if (e.target === iList) {
    iList.src = "../images/icon/icon-post-list-on.png";
    iAlbum.src = "../images/icon/icon-post-album-off.png";
    feedCard.classList.remove("grid");
    feedEditBtn.style.display = "block";
    moreImageBtn.forEach((btn) => {
      btn.classList.remove("album");
    });
  } else {
    iList.src = "../images/icon/icon-post-list-off.png";
    iAlbum.src = "../images/icon/icon-post-album-on.png";
    feedCard.classList.add("grid");
    feedEditBtn.style.display = "none";
    moreImageBtn.forEach((btn) => {
      btn.classList.add("album");
    });
  }
}

// 숨겨진 이미지 모달창 on
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

feedEditBtn.addEventListener("click", (e) => {
  modalFeedEdit.style.display = "flex";
  feedSection.classList.add("modal_active");
  body.classList.add("modal_active");
});

modalFeedEdit.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    modalFeedEdit.style.display = "none";
    feedSection.classList.remove("modal_active");
    body.classList.remove("modal_active");
  }
});

profileBtn.addEventListener("click", () => {
  modalProfile.style.display = "block";
  body.classList.add("modal_active");
});

modalProfile.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    modalProfile.style.display = "none";
    body.classList.remove("modal_active");
  }
});

logoutProfile.addEventListener("click", () => {
  modalLogout.style.display = "block";
  body.classList.add("modal_active");
});

modalLogout.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    modalLogout.style.display = "none";
    body.classList.remove("modal_active");
  }
});

cancelBtn.addEventListener("click", () => {
  modalLogout.style.display = "none";
});
iList.addEventListener("click", iconClickHandler);
iAlbum.addEventListener("click", iconClickHandler);
