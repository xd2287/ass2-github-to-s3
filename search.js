const photoGallery = document.getElementById("photoGallery");

function callGetApi(query) {

    const params = {
        q: query 
    };

    const additionalParams = {
        headers: {
            'x-api-key': 'w6vaVGp7Cf1ompYgRcezxak2ahRPwNPToB8xoSR4',
        }
      };

    return sdk.searchGet(params, {}, additionalParams);
}

searchButton.addEventListener('click', function() {
    const searchInputElement = document.getElementById('searchInput');
    const searchInputValue = searchInputElement.value;
    console.log(searchInputValue);
    
    if (searchInputValue == "") {
        alert('Please input your query.');
        return;
    }

    console.log("Start search");

    // mock_urls = [
    //     "https://cloud-computing-ass2-b2-photos.s3.us-west-2.amazonaws.com/cats2.png",
    //     // "https://cloud-computing-ass2-b2-photos.s3.us-west-2.amazonaws.com/cats.png",
    //     // "https://cloud-computing-ass2-b2-photos.s3.us-west-2.amazonaws.com/cats2.png",
    //     "https://cloud-computing-ass2-b2-photos.s3.us-west-2.amazonaws.com/cat3.png",
    //     "https://cloud-computing-ass2-b2-photos.s3.us-west-2.amazonaws.com/cat2.png"
    // ];
    // photoUrls = mock_urls;

    // photoGallery.innerHTML = '';
    // let currentRow = null;

    // photoUrls.forEach(function (photoUrl, index) {

    //     if (index % 4 === 0) {
    //         currentRow = document.createElement("div");
    //         currentRow.classList.add("photo-row");
    //         photoGallery.appendChild(currentRow);
    //     }

    //     // Create an <img> element
    //     const imgElement = document.createElement("img");
    
    //     // Set the src attribute to the photo URL
    //     imgElement.src = photoUrl;
    //     imgElement.classList.add("photo-item");
    
    //     // Append the <img> element to the photoGallery div
    //     currentRow.appendChild(imgElement);
    // });

    callGetApi(searchInputValue)
      .then((response) => {
        console.log(response);
        photoUrls = response["data"]["urls"]
        photoGallery.innerHTML = '';
        let currentRow = null;

        photoUrls.forEach(function (photoUrl, index) {

            if (index % 4 === 0) {
                currentRow = document.createElement("div");
                currentRow.classList.add("photo-row");
                photoGallery.appendChild(currentRow);
            }

            // Create an <img> element
            const imgElement = document.createElement("img");
        
            // Set the src attribute to the photo URL
            imgElement.src = photoUrl;
            imgElement.classList.add("photo-item");
        
            // Append the <img> element to the photoGallery div
            currentRow.appendChild(imgElement);
        });
    });
});