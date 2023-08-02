export const retrieveSavedBooks=()=>{
    const savedBookIds= localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    :[]
    return savedBookIds;
}
export const saveBooks=(bookIdArray)=>{
    if(bookIdArray.length){
        localStorage.setItem('saved_books', JSON.stringify(bookIdArray))

    }else{
        localStorage.removeItem('saved_books')
    }
}
export const removeBook=(bookId)=>{
    const savedBookIds=localStorage.getItem('saved_boooks')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null
if(!savedBookIds){
    return false
}
const updatedSavedBookIds=savedBookIds?.filter((savedBookId)=>savedBookId !==bookId)
localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds))
return true;
}