const express = require('express')
const userService = require('../services/UserService')

const router = express.Router()

router.post('/create', async function (req, res) {
    
    if(req.body.name == undefined || req.body.password == undefined || req.body.type == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.create(req.body)
    if(response == null){
        return res.status(400).send({error_msg:'User exist'});
    }
    res.send(response)
})

router.post('/login',authenticate, async function (req, res) {
    
    if(req.body.name == undefined || req.body.password == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.login(req.body)
    if(response == null){
        return res.status(400).send({error_msg:'login failed'});
    }
    res.send(response)
})

router.post('/:id/create_record', async function (req, res) {
    
    if(req.body.section == undefined || req.body.time_stamp == undefined || req.body.desc == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.createRecord(req.params.id,req.body)
    if(response == null){
        return res.status(400).send({error_msg:'Record creation failed'});
    }
    res.send(response)
})

router.post('/create_patient', async function (req, res) {
    
    if(req.body.name == undefined || req.body.gender == undefined || req.body.dob == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.createpatient(req.body)
    if(response == null){
        return res.status(400).send({error_msg:'patient creation failed'});
    }
    res.send(response)
})
router.post('/:userid/:patientid/create_usermapping', async function (req, res) {
    if(req.params.userid == undefined || req.params.patientid == undefined ){
        return res.status(400).send({error_msg:'input missing'});
    }
   

    var response = await userService.usermapping(req.params.userid,req.params.patientid)
    //console.log(response)
    if(response == null){
        return res.status(400).send({error_msg:'usermapping creation failed'});
    }
    res.send(response)
})
router.get('/:id/get_records', async function (req, res) {
    var response = await userService.getAllRecords(req.params.id)
    res.send(response)
})

router.get('/doctor_search', async function (req, res) {
    if(req.query.q == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.searchDoctor(req.query.q)
    res.send(response)
})


router.post('/attach_records/:id', async function (req, res) {
    
    if(req.params.id == undefined || req.body.records == undefined){
        return res.status(400).send({error_msg:'input missing'});
    }

    var response = await userService.attachToDoctor(req.params.id,req.body.records)
    if(response == null){
        return res.status(400).send({error_msg:'Record attach failed'});
    }
    res.send(response)
})


router.get('/get_shared_records/:id', async function (req, res) {
    var response = null
    if (req.params.id != undefined) {
        response = await userService.getSharedRecords(req.params.id)
    }
    res.send(response)
})

router.get('/get-all', async function (req, res) {
    var response = await userService.getAll()
    res.send(response)
})
function authenticate(req, res, next) {
    user.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
module.exports = router