const mongoose = require('mongoose');
const requireDir = require('require-dir');
const chalk = require('chalk')
const {createPassword} = require('./src/libs/auth')
const randStr = require('randomstring');
const password = randStr.generate(16);
const data = {
  userName: 'admin',
  email: 'admin@email.com',
  password: createPassword(password),
  fullName: 'Admin',
  birthday: new Date().setFullYear(1984, 7, 7),
  address: '',
  phoneNumber: '',
  sex: 1,
  description: '',
  isActive: true,
  cpUser: true,
  isAdmin: true
}

console.log('Checking for admin user exists...')

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/chien-profile';
mongoose.Promise = require('bluebird');
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
requireDir('./src/models');
const User = mongoose.model('User')
User.find({userName: 'admin'}).then((admin) => {
  if (admin) {
    console.log('Admin user found. Updating...')
    User.updateOne({_id: admin._id}, {password: data.password}).then(() => {
      console.log(chalk.green('Admin user updated.'))
      console.log('userName: admin')
      console.log('password: ' + password)
      process.exit()
    })
  }
  else {
    console.log('Admin user not found. Creating a new one...')
    const user = new User(data)
    user.save().then(() => {
      console.log('New admin user created.')
      console.log('userName: admin')
      console.log('password: ' + password)
      process.exit()
    })
  }
})


