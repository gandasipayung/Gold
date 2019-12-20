const Model = require('../models');
const MenuModel = Model.Menu;

class MenuController{
    // static add(req, res){
    //     MenuModel.create({
    //         name: req.body.name,
    //         price: req.body.price 
    //       })
    //     //   .then(data => res.redirect('/students'))
    //       .catch(err => console.log(err))
    //   }

    static getMenu(req,res){
        MenuModel.findAll()
            .then(data => res.render('home.ejs', {items}))
            .catch(err => console.log(err))
    }

    // static getMenuAll(req, res) {
    //     MenuModel.findAll()
    //       // .then(data => res.render('', { data }))
    //       .catch(err => console.log(err))
    // }
}

module.exports = MenuController;