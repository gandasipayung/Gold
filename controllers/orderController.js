const Model = require('../models');
const CustomerModel = Model.Customer;
const MembershipModel = Model.Membership;
const OrderModel = Model.Order;
const MenuModel = Model.Menu;
var sequelize = require('sequelize');

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('db_pair', 'hendry', '123', {
//     host: 'localhost',
//     dialect: 'postgres',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })

// const db = require('pg')
// const { Client } = require('pg')
// const DB = new db()
// DB.connect()


class OrderController{
    // static getAdd(req, res){
    //     MembershipModel.findAll()
    //         .then(members => {
    //             res.render('customerRegistration.ejs', {members})
    //         })
    //         .catch( err => {
    //             res.res(err)
    //         })
    // }

    static getAdd(custId, req, res){
        let data ={};

        CustomerModel.findByPk(custId)
            .then(customer => {
                data.customer = customer;
                return MembershipModel.findByPk(customer.id)
            })
            .then(membership => {
                data.membership = membership;
                return MenuModel.findAll()        
            })
            .then(menu => {
                data.menu = menu;
                res.render('', data)
            })
            .catch(err => console.log(err))
    }

    static postAdd(req, res){
        console.log(req.body);
        
        OrderModel.create(req.body)
          .then(data => res.redirect('/'))
          .catch(err => console.log(err))
    }

    static getMenuFavorite(req,res){
        const data = [];
        const result = [];
        OrderModel.findAll({
            attributes: ['MenuId', [sequelize.fn('sum', sequelize.col('qty')), 'total']],
            group: ['Order.MenuId'],
            limit: 3,
            raw: true,
            order: sequelize.literal('total DESC')
        })
        .then (menu=> {
            menu.forEach(element => {
                data.push(element.MenuId);
            });
            return data
        })
        .then(items => {
           return CustomerModel.findAll({
                where: {
                  id: items
                }
              });            
        })
        .then(data => {
            console.log(data);
            
        })
        
        
        .catch(err => console.log(err))
    }
}

module.exports = OrderController;