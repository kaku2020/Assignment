import React, { useState, useEffect } from 'react';
// import './Orders.css';
import {useRouter} from 'next/router';
import Ordersdata from '../data/OrdersData.js';
import userData from "../data/LoginData.js";

function Orders() {
  const [selectedorder, setSelectedOrder] = useState([]);
  const [currOrderUser, setCurrOrderUser] = useState({});
  const [search, setSearch] = useState('');
  const [curr_page, setPage] = useState(1);
  const [num_row, setRow] = useState(10);

  const router = useRouter();

  useEffect(() => {
    try {
      let user_id = sessionStorage.getItem('userid');
      
    // const handleSubmit = async () => {
        
    //     let formdata = {};
    //     formdata.userid = user_id;
       
    //     const response = await fetch("/api/user",{
    //         method : 'POST',
    //         body : JSON.stringify(formdata),
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         }
    //     });

    //     const data = await response.json();
    //     console.log(data);
    //     return data;
    // }
    
    // let userorder = handleSubmit();
      let userorder = Ordersdata.filter((item) => item.userId === user_id);
      let currUser = userData.filter((item) => item.id === user_id);
      debugger
      console.log(currUser)
      if(currUser !== undefined){
        setCurrOrderUser({id : currUser[0].id , email : currUser[0].email });
      }
      
      setSelectedOrder(userorder);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const NewBook = () => {
    return router.push('/newBook');
    console.log(Ordersdata);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredData = selectedorder.filter((item) => {
    return (
        item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase()) 
    );
  });

  const last_index = curr_page * num_row;
  const first_index = last_index - num_row;
  const current_rows = filteredData.slice(first_index, last_index);

  return (
    <div className='orders__container' key='orders__container'>
      <div className='orders__header'>
      <h1 className='orders__header-data'>User Id : {currOrderUser.id}</h1>
      <h1 className='orders__header-data'>Orders Page</h1>
      <h1 className='orders__header-data'>{currOrderUser.email}</h1>
      </div>
      <buuton onClick={NewBook}>Enter new book</buuton>
      <input
        type='text'
        value={search}
        onChange={handleSearch}
        className='orders__search'
        data-testid="orders__search"
      />
      <table className='orders__table'>
        <thead>
          <tr>
            <th className='orders__table-head'>ISBN Id</th>
            <th className='orders__table-head'>Author</th>
            <th className='orders__table-head'>Publication</th>
            <th className='orders__table-head'> Date</th>
            <th className='orders__table-head'>Title</th>
          </tr>
        </thead>
        <tbody>
          {current_rows.map((item) => (
            <tr key={item.isbn_id}>
                <td className='orders__table-data'>{item.isbn_id}</td>
              <td className='orders__table-data'>{item.author}</td>
              <td className='orders__table-data'>{item.publication}</td>
              <td className='orders__table-data'>{item.date}</td>
              <td className='orders__table-data'>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={Math.ceil(filteredData.length / num_row)}
        page={curr_page}
        rows={num_row}
        onChange={handlePageChange}
        className='orders__pagination'
      />
      {/* {show()} */}
    </div>
  );
}

const Pagination = ({ count, page, rows, onChange, className }) => {
  const page_num = [...Array(count).keys()].map((number) => number + 1);
  return (
    <nav className={className}>
      <ul className='orders__pagination-list'>
        {page_num.map((number) => {
          return (
            <li key={number} className='orders__pagination-item'>
              <button
                onClick={() => onChange(null, number)}
                disabled={page === number}
                className='orders__pagination-button'
                data-testid={number}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Orders;

