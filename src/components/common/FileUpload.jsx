import React, { useState } from 'react';  

function FileUpload(props) {  
  const { field, form } = props;  
  const [isFileUpload, setIsFileUpload] = useState(true); // State to toggle between file upload and URL input  
  const defaultImageUrl = '/books/dummy.jpeg';

  const handleFileChange = (e) => {  
    const file = e.currentTarget.files[0];  
    const reader = new FileReader();  

    reader.onload = function (event) {  
      form.setFieldValue(field.name, event.target.result); // Set the Data URL  
    };  

    if (file) {  
      reader.readAsDataURL(file);  
    } else {  
      form.setFieldValue(field.name, null);  
    }  
  };  

  const handleUrlChange = (e) => {  
    form.setFieldValue(field.name, e.target.value); // Set the URL directly  
  };  

  return (  
    <div>  
      <label className="block text-gray-700 text-sm font-bold pt-2 pb-1">  
        Upload Image/ Enter URL  
      </label>  
      <div className="flex items-center">  
        <input  
          type="checkbox"  
          checked={isFileUpload}  
          onChange={() => setIsFileUpload(!isFileUpload)}  
          className="mr-2"  
        />  
        <span className="text-sm">Upload File</span>  
      </div>
      <br/>
      {isFileUpload ? (  
        <div className='mt-1'>  
          <input  
            type="file"  
            onChange={handleFileChange}  
            className={'form-control'}  
            accept="image/*"  
          />  
          <img src={field.value || defaultImageUrl} alt="preview" id={'image'} className="mt-2" />  
        </div>  
      ) : (  
        <div className='mt-1'>  
          <input  
            type="text"  
            placeholder="Enter image URL"  
            onChange={handleUrlChange}  
            className={'form-control'}  
          /> 
          <img src={field.value || defaultImageUrl} alt="preview" id={'image'} className="mt-2" />   
        </div>  
      )}  
    </div>  
  );  
}  

export default FileUpload;  