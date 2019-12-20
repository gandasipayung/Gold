const Model = require('../models');
const MembershipModel = Model.Membership;

class MembershipController{
    static getMembership(req,res){
        MembershipModel.findAll()
            .then(data => res.render('', {data}))
            .catch(err => console.log(err))
    }
}

module.exports = MembershipController;