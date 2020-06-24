function UploadImage() {
    let photo = document.getElementById("image-file").files[0];  // file from input
    let req = new XMLHttpRequest();
    let formData = new FormData();

    req.onreadystatechange = function (){
        if (req.readyState === 4 && req.status === 200){
            document.getElementById('alert').style.display = 'inline-block';
            alertAddImage();
        }
    }
    formData.append("photo", photo);
    req.open("POST", '/uploadImage');
    req.send(formData);
}

function alertAddImage() {
    setTimeout(()=>{
        document.getElementById('alert').style.display = 'none';
    }, 2000);
}

function setName(imagePath, index) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "/updateImage", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let imageName = document.getElementById('imgName'+ index).value;
    xhttp.send(JSON.stringify({imagePath: imagePath, imgName: imageName}));
}
