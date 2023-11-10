const express = require('express')
const router = express.Router() // this is used to get the router
let voters = require('../../Voters') // save all the voters information from the json package into voters 

//get all the voters 
router.get('/' , (req, res) => {
    res.json(voters)
})

router.get('/:id', (req, res) => {//get users based on api
    const found = voters.some(voters => voters.id === parseInt(req.params.id))// some is used as it satisfy the constraint if any as an ID 
    if(found)
    {
    res.json(voters.filter(voters => voters.id === parseInt(req.params.id)))
    }else{
        res.sendStatus(400)
    }
})


router.get('/:name', (req, res) => {//get users based on api
    const voterName = req.params.name;
    const foundVoter = voters.find(voter => voter.name === voterName);
  
    if (foundVoter) {
      res.json(foundVoter);
    } else {
      res.status(404).json({ error: 'Voter not found' });
    }
})

// to post new voters 
router.post('/', (req, res) => {
    const newVoter= {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email
    }
    if(!newVoter.name || !newVoter.email)
    {
        return res.sendStatus(400)
    }
    voters.push(newVoter)
    res.json(voters)
})

//update voters by selecting id
router.put('/:id', (req, res) => {
    const found = voters.some(voters => voters.id === parseInt(req.params.id))// some is used as it satisfy the constraint if any as an ID 
   if(found)
   {
       const updateVoter = req.body;
       voters.forEach(voters => {
           if(voters.id === parseInt(req.params.id))
           {
               voters.name = updateVoter.name ? updateVoter.name: voters.name
               voters.email = updateVoter.email? updateVoter.email: voters.email
               res.json({
                   message: 'voter Updated',
                   voters
               })
           }
       })
   }
})

//remove a voter by selecting id
router.delete('/:id', (req, res)=> {
    const found = voters.some(voters =>  voters.id === parseInt(req.params.id))
    if(found){
        voters = voters.filter(voters => voters.id !==  parseInt(req.params.id))
        res.json({
            message: 'voters deleted',
           voters
        })
    }else {
        res.sendStatus(400)
    }
})

module.exports = router