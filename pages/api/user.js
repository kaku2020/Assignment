const mongoose = require('mongoose');
import monmodel from '@/components/schema';

mongoose.connect('mongodb://127.0.0.1:27017/readerapp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log('Error connecting to MongoDB', error);
});




const  handler = async (req,res) => {
    if(req.method === 'POST'){
        const data = req.body;
       



try{
    const data = new monmodel({
        name: req.body.name,
        email: req.body.email,
        
    })
    const val = await data.save();
    res.json(val);
}catch(err) {
    console.log('could not save data');
}

    }
}

export default handler;