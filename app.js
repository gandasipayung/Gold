const express = require('express')
const app = express()
const session = require('express-session')
const bcrypt = require('bcryptjs')
const port = process.env.PORT || 4000
// controller
// const Customer = require('./controllers/customerController')
// const Member = require('./controllers/membershipController')
const MenuController = require('./controllers/menuController')
// const Order = require('./controllers/orderController')
const Model = require('./models')
const Customer = Model.Customer
const Member = Model.Membership
const Menu = Model.Menu
const Order = Model.Order

//setting
app.set('egnine view', 'ejs')
app.use(express.urlencoded({ extended : true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))


////
app.get('/',(req,res,next) => {
  if(!req.session.login){
    Menu.findAll()
        .then(items => {
          res.render('home.ejs', {items})
        })
        .catch(err =>{
          res.send(err)
        })
  }else {
    next()
  }
}, (req, res) =>{
  Menu.findAll()
      .then(items => {
        res.render('transaction.ejs', {items})
      })
      .catch(err => {
        res.send(err)
      })
})

app.get('/login', (req, res) =>{
  let valid = true
  res.render('login.ejs', {valid})
})

app.post('/', (req, res) => {
  Customer.findOne({
    where : {
      userName : req.body.userName
    }
  })
  .then(user => {
    if(bcrypt.compareSync(req.body.password, user.password)){
      req.session.login = user
      Menu.findAll()
          .then(menu => {
            res.render('transaction.ejs', {user, menu})
          })
          .catch(err => {
            res.send(err)
          })
    }else {
      valid = false
      res.render('login.ejs', {valid})
    }
  })
  .catch(err => {
    valid = false
    res.render('login.ejs', {valid})
  })
})

app.get('/register', (req, res) => {
  Member.findAll()
        .then(members => {
          res.render('register.ejs', {members})
        })
        .catch(err => {
          res.send(err)
        })
})

app.post('/register', (req, res) => {
  Customer.create(req.body)
          .then(data => {
            res.redirect('/')
          })
          .catch(err => {
            res.send(err)
          })
})

app.get('/buy', MenuController.getMenu)

app.post('/buy', (req, res) => {
  let data = {
    date : new Date(),
    CustomerId : req.session.login.id,
    MenuId : req.body.id,
    qty : req.body.qty
  }
  Order.create(data)
      .then(success => {
        res.render('new.ejs')
      })
      .catch(err => {
        res.send(err)
      })
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


app.listen(port, function(){
  console.log(`Server start on ${port}`);
  
})