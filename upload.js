const BUCKET_NAME = "cloud-computing-ass2-b2-photos"



document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const photoUploadInput = document.getElementById('photoUpload');
    const photoLabelsInput = document.getElementById('photoLabels');
  
    uploadButton.addEventListener('click', function() {
      const file = photoUploadInput.files[0]; // Get the file from the input
      const customLabels = photoLabelsInput.value; // Get the custom labels from the input
      console.log("customLabels are ");
      if (!file) {
        alert('Please select a file to upload.');
        return;
      }
  
      console.log("Successfully upload the file");
      console.log(file);
      // Read the file content as a binary string
      const reader = new FileReader();
      reader.onload = function(e) {
        if (e.target.result != "") {
          // Extract the base64 data
          const binaryData = e.target.result;
          console.log("the binary data is")
          console.log(binaryData)
          const base64Data = btoa(binaryData);
          const body = base64Data
          console.log("the encoded data is")
          console.log(body);
        
          // Prepare parameters
          const params = {
            bucket: BUCKET_NAME, // Replace with your bucket name
            key: file.name, // Replace 'folder/' with your folder path or leave empty if not needed
            'x-amz-meta-customLabels': customLabels, // Add custom labels if provided
          };
        
          // Additional parameters if needed
          const additionalParams = {
            headers: {
              'Content-Type': 'application/octet-stream', // Set the correct content type
              'x-api-key': 'w6vaVGp7Cf1ompYgRcezxak2ahRPwNPToB8xoSR4',
            },
          };
        
          // Use the SDK to invoke the API Gateway endpoint
          sdk.uploadBucketKeyPut(params, body, additionalParams)
            .then(response => {
              console.log('Success', response);
              alert('Photo uploaded successfully!');
            })
            .catch(error => {
              console.error('Error uploading file:', error);
              alert('Failed to upload the file.');
            });
        }
        else {
          console.error('Invalid file format');
          alert('Invalid file format');
        }
      };
      
      reader.onerror = function(error) {
        console.error('Error reading file:', error);
        alert('Error reading file');
      };
      
      reader.readAsBinaryString(file);
    });
  });
  