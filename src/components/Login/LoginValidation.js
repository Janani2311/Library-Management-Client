const validateForm = (email,password) => {  

    let error = ''; 
    let valid = true;   

    // Email validation  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailPattern.test(email)) {  
        valid = false;  
        error = "Invalid email format.\n";
        return error
    }  

    // Password validation  
    if (password.length < 4) {  
        valid = false; 
        error = "Password must be at least 4 characters long.\n"; 
        return error
    }  

    return null; 
};  

export default validateForm;