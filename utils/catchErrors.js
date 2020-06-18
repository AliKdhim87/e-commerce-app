const catchErrors = (error, displayError) => {
  let errorMsg;
  if (error.response) {
    errorMsg = error.response.data;
    console.log('Error response', errorMsg);
    // For Cloudinary image Uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    errorMsg = error.request;
    console.log('Error Request', errorMsg);
  } else {
    errorMsg = error.message;
    console.log('Error Message', errorMsg);
  }
  displayError(errorMsg);
};
export default catchErrors;
