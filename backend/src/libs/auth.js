const bcCrypt = require('bcrypt-nodejs')
const createPassword = password => bcCrypt.hashSync(password, bcCrypt.genSaltSync(8), null)
const comparePassword = (password, hash) => bcCrypt.compareSync(password, hash)
const checkRole = (role, auth) => auth.isAdmin || (auth.roles && auth.roles.indexOf(role) !== -1)
module.exports = {createPassword, comparePassword, checkRole}