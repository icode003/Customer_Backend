const User = require('../models/User.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const addUser = async(req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            gender,
            user_type,
            mobile_number,
            address
        } = req.body;

        //Check emptyness of the incoming data
        if (!full_name || !email || !password || !gender || !user_type || !mobile_number) {
            return res.json({
                message: 'Please enter all the details'
            })
        }

        //Check if the user already exist or not
        const emailCheck = await User.findOne({
            email: req.body.email
        });
        if (emailCheck) throw ("Email already Exist!")

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const user = new User(req.body);
        await user.save();

        const token = await jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.send({
            code: 200,
            message: 'user data Added Successfully',
            data: {
                data: user,
                token: token
            },
            error: false
        })
    } catch (error) {
        res.send({
            code: 200,
            message: error.toString(),
            data: null,
            error: true
        })
    }
}

const login = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            throw ("User not Found!")
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            throw ("Credentials Not Matched!")
        }

        const token = await jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.send({
            code: 200,
            message: 'User Login Successfully!',
            data: {
                user,
                token
            },
            error: false
        })
    } catch (error) {
        res.send({
            code: 200,
            message: error.toString(),
            data: null,
            error: true
        })
    }
}

module.exports = {
    addUser,
    login
}