async function getFeed() {
  const url = localStorage.getItem("Url")
  const token = localStorage.getItem("Token")
  const res = await fetch(url + "/post/feed", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
        "Content-type": "application/json"
    }
  })
  const json = await res.json()
  console.log(json)
}
getFeed()