// import UserSchema from '../models/users'
const User = require('../models/User');

async function isUsersExist() {
  const exec = await User.find().exec()
  return exec.length > 0
}

// Initialize first user
exports.initializeData = async () => {
  if(!await isUsersExist()) {
    const user = [
      new User({
        imie: "admin",
        nazwisko: "admin",
        email: "admin@admin.com",
        nrTelefonu: "123 456 789",
        rola: "ADMIN",
        dataUtworzenia: "2020/11/07",
        dataModyfikacji: "2020/11/07",
        haslo: "admin"
      })
    ]
    let done = 0;
    for (let i = 0; i < user.length; i++) {
      user[i].save((err, result) => {
        done++;
      })
    }
  }
}