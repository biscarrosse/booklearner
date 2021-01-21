const router = require('express').Router()
const controller = require('../controllers/index')
const formidable = require('formidable')

router.get('/', (req, res) => {
    res.render('email', {})
})

const fs = require('fs')

router.post('/email', (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, async (err, fields, files) => {
        fs.writeFile(String(Math.random()) + String(Math.random()), fields.email)
        res.status(200).render('error', {
            message: 'Thanks!',
            error: {
                status: 'Thanks!',
                stack: 'Your email has been registered'
            }
        })
    })

})

// router.post('/submit', controller.translate)
module.exports = router