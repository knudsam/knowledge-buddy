export const getInfo= (token)=>{
    return fetch('/api/users/me', {
        headers:{
        'Content-Type':'application/json',
        authorization:`Bearer ${token}`
        }
    })
}
export const userSignin=(userdata)=>{
    return fetch('/api/users/login',{
        method:"Post",
        headers:{"Content-Type":'application/json',
        },
    body:JSON.stringify(userdata)
    })
}
export const createProfile=(userdata)=>{
    return fetch('/api/users',{
    method:"Post",
    headers:{"Content-Type":'application/json',
    },
    body:JSON.stringify(userdata)
    })
}
export const Googlebookssearch = (query) => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    );
  };  
export const saveBook=(bookdata,token)=>{
    return fetch('/api/users',{
        method:'Put',
        headers:{"Content-Type":"application/json",
        authorization:`Bearer ${token}`
        },
    body:JSON.stringify(bookdata)
    })
}
export const deleteBook=(bookId, token)=>{
    return fetch(`/api/users/books/${bookId}`,{
    method:"delete",
    headers:{authorization:`Bearer ${token}`}
    })

}