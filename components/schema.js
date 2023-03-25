const mongoose = require('mongoose');
const sch={
    
    title : String,
   publication : String,
   author : String,
    date : String,
    isbn : String,
   
  }
  
  const monmodel = mongoose.model("charter",sch);

  export default  monmodel;