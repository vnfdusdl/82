const followBtns = document.querySelectorAll('.btn-follow');
for (const followBtn of followBtns) {
    followBtn.addEventListener('click', function () {
        followBtn.classList.toggle('btn-active');
        if (followBtn.classList.contains('btn-active')) {
            followBtn.textContent = '취소';
        } else {
            followBtn.textContent = '팔로우';
        }
    });
}

//팔로워 리스트 들고 오기
async function getFollowerData() {
    const token = localStorage.getItem('Token');
    const accountName = localStorage.getItem('Accountname');
    const res = await fetch(
        `http://146.56.183.55:5050/profile/${accountName}/follower`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        }
    );

    const json = await res.json();
    json.map((follower)=> {
        console.log(follower)
        const userName = follower.username;
        const intro = follower.intro;
        const image = follower.image;
        console.log(userName)
        console.log(intro)
        console.log(image)

        let followersList = document.querySelector('.list-followers').innerHTML += `
        <li>
        <a href="" class="cont_user">
        <img src="${image}"  class="img_profile" />
        <div>
        <strong>${userName}</strong>
        <small class="txt_preview txt_ellipsis">${intro}</small>
        </div>
        </a>
        <button class="btn-follow btn-active">취소</button>
        </li>
        `
    })
}
getFollowerData()
