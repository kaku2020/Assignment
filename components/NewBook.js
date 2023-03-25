import {useState,useEffect} from 'react';


function NewBook () {
    const [title,setTitle] = useState('');
    const [publication,setPublication] = useState('')
    const [author,setAuthor] = useState('');
    const [date,setDate] = useState('')
    const [isbn,setIsbn] = useState('');
   
    const handleSubmit = async () => {
        let formdata = {};
        formdata.title = title;
        formdata.publication = publication;
        formdata.author = author;
        formdata.date = date;
        formdata.isbn = isbn;
        debugger
        console.log(formdata);
        const response = await fetch("/api/user",{
            method : 'POST',
            body : JSON.stringify(formdata),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        return data;
    }

    return(<form>
        <div><input type='text' className='1st-key' key ='1' value={title} onChange={(e) => {setTitle(e.target.value)}}></input></div>
        <br></br>
        <div><input type='text'  className='2st-key' key ='2' value={publication} onChange={(e) => {setPublication(e.target.value)}}></input></div>
        <br></br>
        <div> <input type='text'  className='3st-key'  key ='3' value={author} onChange={(e) => {setAuthor(e.target.value)}}></input></div>
        <br></br>
        
        <div><input type='text'  className='4st-key' key ='4' value={date} onChange={(e) => {setDate(e.target.value)}}></input></div>
        <br></br>
        <div><input type='text'   className='5st-key' key ='5' value={isbn} onChange={(e) => {setIsbn(e.target.value)}}></input></div>
        
        
        <button type='submit' onChange={handleSubmit}>Submit</button>
    </form>)
}

export default NewBook;