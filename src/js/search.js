const input = document.querySelector(".input_search");
const searchedUser = input.value;
// const searchedUser = "b";
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

  input.addEventListener('keypress', (event) => {
    console.log(input.value);
    const userId = input.value;
    if (event.keyCode === 13) {
      matchUserId(userId, json);
      console.log('엔터');
      input.value = '';
      input.focus();
    }
  })

}
//일치하는 데이터를 그려주는 부분
function matchUserId(userId, json) {
  json.forEach(user => {
    if (user.accountname === userId) {
      console.log(`완료 : ${user.accountname}`);
      const accountname = user.accountname;
      const image = user.image;
      const username = user.username;
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
    // async function getUserId() {
    //   const url = "http://146.56.183.55:5050";
    //   const token = localStorage.getItem("Token");
    //   const res = await fetch(
    //     url + `/user/searchuser/?keyword=${accountname}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-type": "application/json",
    //       },
    //     }
    //   );
    //   const json = await res.json();
    //   json.forEach((data) => {
    //     if (data.accountname === accountname) {
    //     }
    //   });
    // }
    // getUserId();
    localStorage.setItem("searchedUserAccountname", accountname);
    location.href = "./yourprofile.html";
  }

});
getSearchedUserProfile();