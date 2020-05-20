const mongoose = require('mongoose');
const requireDir = require('require-dir');
const chalk = require('chalk')
const {createPassword} = require('./src/libs/auth')
const randStr = require('randomstring');
const readline = require('readline');

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

const question = chalk.blue('Admin user found. create a new password? [y/n]: ')

const askQuestion = (query, admin, callback) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(callback(ans, admin));
  }))
}

const handleAnswer = (answer, admin) => {
  if (answer === 'y' || answer === 'Y') {
    const password = randStr.generate(16);
    User.updateOne({_id: admin._id}, {password}).then(() => {
      console.log('')
      console.log(chalk.green('Admin user updated.'))
      console.log(`User Name: ${chalk.blue('admin')}`)
      console.log(`New Password: ${chalk.blue(password)}`)
      process.exit()
    })
  } else if (answer === 'n' || answer === 'N') {
    console.log(chalk.red('Mission terminated.'))
    process.exit()
  } else askQuestion(question, admin, handleAnswer)
}

User.findOne({userName: 'admin'}).then((admin) => {
  if (admin) askQuestion(question, admin, handleAnswer)
  else {
    console.log(chalk.red('Admin user not found. Creating a new one...'))
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

    const user = new User(data)
    user.save().then(() => {
      console.log(chalk.green('Admin user create.'))
      console.log('')
      console.log(`User Name: ${chalk.blue('admin')}`)
      console.log(`Password: ${chalk.blue(password)}`)
      process.exit()
      process.exit()
    })
  }
})


