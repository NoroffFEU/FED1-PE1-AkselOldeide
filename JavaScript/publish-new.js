const submit = document.getElementById("submit-button");
const formData = document.getElementById("admin-blog-post");
const apiURL = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide";
const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWtzZWxfT2xkZWlkZSIsImVtYWlsIjoiYWtzaGVsODc3MDdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MTMyNjc5MTB9.TsBdlfVTqtVHp8ekmGGf1WP1kYm0pokKGLM9fdVcEMg"; // Replace this with your actual bearer token

submit.onclick = function postContent(event) {
    event.preventDefault();

    const titleData = document.getElementById("title").value;
    const bodyData = document.getElementById("body").value;
    const tagData = document.getElementById("tag").value;
    const imageData = document.getElementById("image").value;

    const postData = {
        title: titleData
    };

    if (bodyData.trim() !== "") {
        postData.body = bodyData;
    }

    if (tagData.trim() !== "") {
        postData.tags = [tagData];
    }

    if (isValidUrl(imageData)) {
        postData.media = {
            url: imageData
        };
    }

    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Optionally, you can perform any further actions here upon successful posting
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
