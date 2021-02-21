const urlField = document.getElementById("url");
const btn = document.getElementById("submit");
const responseBox = document.getElementById("response-box");
const shortURL = document.getElementById('shortURL');

btn.addEventListener("click", (ev) => {
    sendPostRequest("/api/v1/shorten", {url: urlField.value})
    .then((code) => {
        responseBox.classList.add('show');
        shortURL.href = "/" + code;
        shortURL.innerHTML = window.location.href + code;
    })
})

function sendPostRequest(url, data){
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open("POST", url);
        xhr.setRequestHeader('content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                resolve(xhr.responseText);
            }
        }
        xhr.send(JSON.stringify(data))
    })
}

// Copy shorten link
const copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click', (ev) => {
    const range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(shortURL);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
})