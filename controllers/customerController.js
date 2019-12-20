const Model = require('../models');
const CustomerModel = Model.Customer;
const MembershipModel = Model.Membership;
const bcrypt = require('bcryptjs')

class CustomerController{
    static getAdd(req, res){
        MembershipModel.findAll()
                        .then(members => {
                            res.render('customerRegistration.ejs', {members})
                        })
                        .catch( err => {
                            res.send(err)
                        })
    }

    
    static postAdd(req, res){
        CustomerModel.create(req.body)
          .then(data => res.redirect('/'))
          .catch(err => res.send(err))
    }

    static getAll(req, res) {
        CustomerModel.findAll()
          .then(data => res.render('customer', { data }))
          .catch(err => console.log(err))
    }

    static find(req, res) {
        CustomerModel.findOne({
            where : {
              name : req.body.name,
              email : req.body.email
            }
          })
          .then(customer => {
            res.redirect(`/order/${customer.id}`)
          })
          .catch(err =>{
            valid = false
            let message = {
              msg : 'Username / Password salah'
            }
            res.render('login.ejs', {message, valid})
          })
    }

    static login(req,res){
        CustomerModel.findOne({
            where : {
                userName : req.body.userName
            }
        })
            .then(customer => {
               if(bcrypt.compareSync(req.body.password, customer.password)) {
                    req.session.oke = customer
                    res.redirect('/')
               }
               else res.send('ads') 
            })
            .catch(err => {
                console.log(err);
                
                res.send(err)
            })
    }

    static postEdit(req, res) {
        // const data = {
        //     id: req.body.id,            
        //     name: req.body.name,
        //     dob: req.body.dob,
        //     MembershipId: req.body.membershipId,
        //     email: req.body.email
        // }

        CustModel.update(req.body, (err, success) => {
            if (err) res.send(err)
            else res.send('Edited')
        })
    }

    static postDelete(req, res) {
        // const data = {
        //     id: req.body.id,
        //     name: req.body.name,
        //     dob: req.body.dob,
        //     MembershipId: req.body.membershipId,
        //     email: req.body.email
        // }

        CustomerModel.update(req, (err, success) => {
            if (err) res.send(err)
            else res.send('Edited')
        })
    }
}

module.exports = CustomerController;