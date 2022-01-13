const followBtns= document.querySelectorAll('.btn-follow');
for (const followBtn of followBtns) {
    followBtn.addEventListener('click', function() {
        followBtn.classList.toggle('btn-active');
        if(followBtn.classList.contains('btn-active')) {
            followBtn.textContent = "취소"
        } else {
            followBtn.textContent = "팔로우"
        }
    });
}
