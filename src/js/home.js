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

// 로그인을 했다면 피드, 아니라면 로그인 화면으로
const container = document.querySelector('.feed_section');
// else {
//   location.href = './login.html'
// }

// 피드 불러오기
async function getFeed() {
  const url = "http://146.56.183.55:5050"
  const token = localStorage.getItem("Token")
  const res = await fetch(url + "/post/feed", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json()
  const posts = json.posts

  console.log(json);
  imgLoad(posts);

}

function imgLoad(posts) {
  posts.forEach(post => {
    const authorImage = post.author.image
    const authorAccount = post.author.accountname
    const authorName = post.author.username
    const image = post.image
    const commentCount = post.commentCount
    const content = post.content
    const heartCount = post.heartCount
    const hearted = post.hearted

    const imgArray = image.split(',');
    const img = imgArray[0];

    console.log(img);

    let imgTag;

    if (image === '') {
      imgTag = '';
    } else {
      imgTag = `<img src= "${img}" alt="" class="image_feed" />`;
    }

    document.querySelector(".feed_section").innerHTML += `
    <article class="card_feed">
      <h4 class="sr-only">피드</h4>
      <img class="profile_feed" src="${authorImage}" alt="${authorAccount}님의 프로필 사진" />
      <div class="content_feed">
        <div class="content_nav">
          <strong>${authorName}</strong>
          <button type="button" class="btn_postOption">
            <img src="../images/icon/s-icon-more-vertical.png" alt="게시물 옵션" class="edit_feed" />
          </button>
          </div>
        <span>@${authorAccount}</span>
        <p>
          ${content}
        </p>
        <div class="imagelist_feed">
          ${imgTag}
        </div>
        <div class="icon_feed">
          <img src="../images/icon/icon-heart.png" alt="" />
          <span class="likecount_feed">${heartCount}</span>
          <img src="../images/icon/icon-message-circle.png" alt="" />
          <span class="messagecount_feed">${commentCount}</span>
        </div>
        <span class="date_feed">2020년 10월 21일</span>
      </div>
    </article>
    `


  });
}

getFeed()