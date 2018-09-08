require('dotenv').config()

const axios = require('axios'),
      jwt = require('jsonwebtoken'),
      User = require('../models/users');


module.exports = {
      signdulu: (req, res) => {
            console.log('signin headers', req.headers)

            axios({
                  method:'GET',
                  url:`https://graph.facebook.com/me?fields=id,name,email&access_token=${req.headers.accesskey}`
            })
            .then(response => {
                  console.log(response.data)

                  User.findOne({
                        name: response.data.name,
                        email: response.data.email
                  })
                  .then(user => {
                        console.log('Successfully enter')
                        if (user === null) {
                              console.log('User now is :',user)
                              User.create({
                                    name: response.data.name,
                                    email: response.data.email
                              })
                              .then(() => {
                                    jwt.sign({
                                          name: user.name,
                                          email: user.email
                                    }, process.env.Secret, (err, token) => {
                                          if (!err) {
                                                res.status(200).json({
                                                      message: 'succesfully get token',
                                                      token: token
                                                })
                                          }
                                          else {
                                                res.status(404).json({
                                                      message: 'token not found'    
                                                })
                                          }
                                    })
                              })
                              .catch(err => {
                                    res.status(500).json({
                                          message: 'error generate token'
                                    })
                              })
                        } else if (user) {
                              console.log('Current user is : ',user)
                              jwt.sign({
                                    name: user.name,
                                    email: user.email
                              }, process.env.Secret, (err, token) => {
                                    if (!err) {
                                          res.status(200).json({
                                                message: 'succesfully get token',
                                                token: token
                                          })
                                    }
                                    else {
                                          res.status(404).json({
                                                message: 'token not found'    
                                          })
                                    }
                              })
                        }  else {
                              res.status(404).json({
                                    message: 'user not found'    
                              })
                        }
                  })
                  .catch(err => {
                        res.status(500).json({
                              message: err.message
                        })
                  })

            });
      },

      checkdulu: (req, res) => {
            console.log('check headers', req.headers)

            
      }
}