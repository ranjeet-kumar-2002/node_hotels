const express = require('express');
const router = express.Router();

const Person = require('./../models/people');
// post route to add a person
router.post('/',async (req, res) =>{
    try {
      const data = req.body; // Assuming the request body contains the person data
      const newPerson = new Person(data); // Create the new Person using the mongoose model
      const response = await newPerson.save(); // Save the new person to the database
      console.log('data saved');
      res.status(200).json(response);
     } 
      catch (err) {
         console.log(err);
         res.status(500).json({error:'Internal Server Error'});
     }
  });

  // GET Method to get the person data

router.get('/',async (req, res) =>{
    try {
           const data = await Person.find();
           console.log('data fetched');
           res.status(200).json(data);
     } 
      catch (err) {
         console.log(err);
         res.status(500).json({error:'Internal Server Error'});
     }
  });

  
// parameterized api call
router.get('/:workType', async(req,res)=>{
    try {
      const workType = req.params.workType;
      if(workType =='chef' || workType =='manager' || workType =='waiter'){
        const response = await Person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else {
         res.status(404).json({error:'Intvalid work type'});
      }
      
    } catch (err) {
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
});

// update method
router.put('/:id', async (req, res) => {
   try {
       const personId = req.params.id;  // Extract the id from the URL parameter
       const updatedPersonData = req.body; // Updated data for person

       const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
           new: true, // Return the updated document
           runValidators: true // Run Mongoose validation
       });

       if (!response) {
           return res.status(404).json({ error: 'Person not found' });
       }

       console.log('Data updated');
       res.status(200).json(response);
   } catch (err) {
       console.log(err);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});


// Delet method

router.delete('/:id',async(req,res) =>{
    try {
       const personId = req.params.id;
       const response = await Person.findByIdAndDelete(personId);
       if (!response) {
         return res.status(404).json({ error: 'Person not found' });
      }
       console.log('Data deleted');
       res.status(200).json({message:'person deleted successfully'});

    } catch (error) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;