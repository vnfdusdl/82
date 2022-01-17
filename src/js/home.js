const feedImages = document.querySelectorAll(".imagelist_feed");
const feedCard = document.querySelector(".card_wrap");
const feedSection = document.querySelector(".feed_section");
const moreImageBtn = document.querySelectorAll(".more_image");
const modal = document.querySelector(".modal");
const modalProfile = document.querySelector(".modal_profile");
const closeBtn = modal.querySelector(".close-area");
const logoutProfile = document.querySelector(".logout_profile");
const modalContent = document.querySelector(".content");

// 팔로잉 리스트 가져오기
async function getFollowing() {
  const url = "http://146.56.183.55:5050";
  const token = localStorage.getItem("Token");
  const accountName = localStorage.getItem("Accountname");
  const res = await fetch(url + `/profile/${accountName}/following?limit=Number&skip=Number`, {
    method: "GET",
    headers:
    {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });

  const json = await res.json();
  getNumber(json.length);
  //console.log(json);
  // rkarbfskfk (팔로잉 0명);
  // hey_binky (팔로잉 n명);
};

getFollowing();


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
  const json = await res.json();
  const posts = json.posts;

  //console.log(json);
  imgLoad(posts);

  const article = document.querySelectorAll('article');
  const pageHeight = article[article.length - 1].getBoundingClientRect().top;
  console.log(pageHeight);
  const postOption = document.querySelectorAll(".btn_postOption");
  const section = document.querySelector('.feed_section');
  for (let i = 0; i < postOption.length; i++) {
    postOption.item(i).addEventListener("click", () => {
      console.log('확인!');
      modalProfile.style.display = "block";
      modalProfile.style.height = `${pageHeight}px`;
      section.classList.add("modal_active");
      //removeModal(section.classList);
    });
  }

  modalProfile.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("modal-overlay")) {
      modalProfile.style.display = "none";
      section.classList.remove("modal_active");
    }
  });
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

// 팔로워 수를 가져와서 0이면 초기화면, 피드를 보여주기
function getNumber(num) {
  if (num > 0) {
    getFeed();
  } else {
    getFistPage();
  }
};

// 초기 화면 보여주는 함수
function getFistPage() {
  const main = document.querySelector('.main_start');
  const article = document.createElement('article');
  article.setAttribute('class', 'article_guide');
  const img = document.createElement('img');
  img.setAttribute('class', 'img_logo');
  img.setAttribute('src', '../images/symbol-logo-gray.png');
  const p = document.createElement('p');
  p.innerText = '유저를 검색해 팔로우 해보세요!';
  const a = document.createElement('a');
  a.setAttribute('class', 'link_searchMain');
  a.setAttribute('href', './search2.html');
  a.innerHTML = '<span>검색하기</span>';
  article.appendChild(img);
  article.appendChild(p);
  article.appendChild(a);
  main.prepend(article);
}