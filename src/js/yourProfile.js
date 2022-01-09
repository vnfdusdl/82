const iList = document.querySelector(".icon_list");
const iAlbum = document.querySelector(".icon_album");
const feedCard = document.querySelector(".card_wrap");
const feedImages = document.querySelectorAll(".imagelist_feed");
const moreImageBtn = document.querySelectorAll(".more_image");
const feedSection = document.querySelector(".feed_section");
const modal = document.querySelector(".modal");
const closeBtn = modal.querySelector(".close-area");
const modalContent = document.querySelector(".content");
const main = document.querySelector("main");
const followBtn = document.querySelector(".follow_user");

const body = document.body;
feedImages.forEach((e) => {
  const imgCount = e.querySelectorAll(".image_feed").length;
  const moreImage = e.querySelector(".more_image");
  if (imgCount <= 1) {
    moreImage.classList.add("sr-only");
  }
});
followBtn.addEventListener("click", (e) => {
  main.classList.toggle("following");
  followBtn.classList.toggle("following");
  if (followBtn.classList.contains("following")) {
    followBtn.textContent = "팔로잉";
  } else {
    followBtn.textContent = "팔로우";
  }
});
function iconClickHandler(e) {
  if (e.target === iList) {
    iList.src = "../images/icon/icon-post-list-on.png";
    iAlbum.src = "../images/icon/icon-post-album-off.png";
    feedCard.classList.remove("grid");
    moreImageBtn.forEach((btn) => {
      btn.classList.remove("album");
    });
  } else {
    iList.src = "../images/icon/icon-post-list-off.png";
    iAlbum.src = "../images/icon/icon-post-album-on.png";
    feedCard.classList.add("grid");
    moreImageBtn.forEach((btn) => {
      btn.classList.add("album");
    });
  }
}

moreImageBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    modal.style.display = "flex";
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
closeBtn.addEventListener("click", (e) => {
  modal.style.display = "none";
  modalContent.innerHTML = "";

  feedSection.classList.remove("modal_active");
  body.classList.remove("modal_active");
});
modal.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("modal-overlay")) {
    modal.style.display = "none";
    modalContent.innerHTML = "";
    feedSection.classList.remove("modal_active");
    body.classList.remove("modal_active");
  }
});
iList.addEventListener("click", iconClickHandler);
iAlbum.addEventListener("click", iconClickHandler);
