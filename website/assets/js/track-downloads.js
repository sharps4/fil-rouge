let downloaded = false;

function newDownload() {
    if (downloaded === false) {
        let request = new XMLHttpRequest();
        request.open('GET', '/new-download');
        request.send();
        downloaded = true;
    }
}

document.getElementById('download').addEventListener('click', newDownload);