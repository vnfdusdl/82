const input = document.querySelector(".input_search")
const searchedUser = input.value;

const userListContainer = document.querySelector(".list_searchResult");

// input값 저장하기
function inputData() {
  console.log(searchedUser)
}

async function getSearchedUserProfile() {
  const url = "http://146.56.183.55:5050";
  const token = localStorage.getItem("Token");
  const res = await fetch(url + `/user/searchuser/?keyword=${searchedUser}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  const json = await res.json();


  input.addEventListener('keyup', (event) => {
    const inputSearch = input.value;
    matchUserId(inputSearch, json);

    if (event.keyCode === 13) {
      matchUserId(inputSearch, json);
      console.log('엔터');
      input.focus();
    }
  })

}
//일치하는 데이터를 그려주는 부분
function matchUserId(inputSearch, json) {
  json.forEach(user => {
    const accountname = user.accountname;
    const username = user.username;
    if (accountname.includes(inputSearch)) {
      const image = user.image;
      userListContainer.innerHTML = ''; //약간의 의문?.?
      userListContainer.innerHTML += `
        <li class="list_user">
          <img src="${image}" alt="" />
          <div class="user_wrap">
            <p>${username}</p>
            <span>@ ${accountname}</span>
          </div>
        </li>             
        `;
    }
    else if (username.includes(inputSearch)) {
      const image = user.image;
      userListContainer.innerHTML = ''; //약간의 의문?.?
      userListContainer.innerHTML += `
        <li class="list_user">
          <img src="${image}" alt="" />
          <div class="user_wrap">
            <p>${username}</p>
            <span>@ ${accountname}</span>
          </div>
        </li>             
        `;
    }

  })

}

userListContainer.addEventListener("click", (e) => {
  if (e.target.tagName !== "UL") {
    const accountname = e.target.parentNode
      .querySelector("span")
      .textContent.substr(2);
    localStorage.setItem("searchedUserAccountname", accountname);
    location.href = "./yourprofile.html";
  }

});
getSearchedUserProfile();