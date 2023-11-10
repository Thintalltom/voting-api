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
    const found = voters.some(voters => voters.name === req.params.name)// parseInt cannot be used because name is a string not a numeric value
    if(found)
    {
    res.json(voters.filter(voters => voters.name === req.params.name))
    }else{
        res.sendStatus(400)
    }
})

// to post new voters 
router.post('/', (req, res) => {
    const newVoter= {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email
    }
    if(!newVoters.name||!newVoter.email)
    {
        return res.sendStatus(400)
    }
    voters.push(newVoter)
    res.json(voters)
})
module.exports = router