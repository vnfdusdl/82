const searchedUser = document.querySelector(".input_search").value;
// const searchedUser = "b";
const userListContainer = document.querySelector(".list_searchResult");

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
  //forEach문으로 받아온 데이터 전부 살펴보면서 그려주는 부분
  json.forEach((user) => {
    const accountname = user.accountname;
    const image = user.image;
    const username = user.username;
    userListContainer.innerHTML += `
      <li class="list_user">
        <img src="${image}" alt="" />
        <div class="user_wrap">
          <p>${username}</p>
          <span>@ ${accountname}</span>
        </div>
      </li>             
      `;
  });
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
