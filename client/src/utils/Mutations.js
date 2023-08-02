import gql from 'graphql-tag';

export const login= gql`
mutation login($email: String!, $password:!String){
    login(email:$email, password:$password){
        token
        user{_id}
    }
}`;
export const add_user=gql`
mutation addUser($username:String!,$password:String!, $email:String!){
    adduser(username:$username, password:$password, email:$email){
        user{
        _id
        username
        email
        bookcount
        savedbooks{
            authors
            bookId
            image
            link
            title
            description
        }
        }
        token
    }
}`
export const save_book=gql`
mutation saveBook($input:savedBook!){
    saveBook(input:$input)
    {
        _id
        username
        email
        bookcount
        savedBooks={
        #_id
        bookId
        authors
        image
        link
        title
        description
        }
    }
}`
export const remove_book=gql`
mutation removeBook($bookId:Id!){
    removeBook(bookId:$bookid){
        _id
        username
        email
        bookCount
        savedBooks{
            #_id
            bookId
            authors
            image
            link
            title
            description
        }
    }
}`