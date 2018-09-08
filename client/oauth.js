function checkLoginState() {
    FB.getLoginStatus(function(response) {
    console.log(response);

    if (response.status === "connected") {
        $.ajax({
            method:"POST",
            url: "http://localhost:3000/api/signinfb",
            headers: {
                accessKey: response.authResponse.accessToken
            }
        })
        .done(function (data) {

            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("tokenjwt", data.token);
                alert('Welcome to HacktivGit')
                // window.location.reload();

                document.location = './index.html'
            } else {
                alert("Sorry, your browser does not support Web Storage. Please change to another browser to login")
            }
        })
        .fail(err => {
            alert(err.message)
        })
    } else {
        alert('can not connect to facebook')
    }
    });
}
