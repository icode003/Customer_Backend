const express = require('express')
const router = express.Router()
const shopController = require('../controller/shopController')

router.post('/register', shopController.addShop)
router.post('/login', shopController.login)

module.exports = router