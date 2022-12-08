// const bcrypt = require('bcryptjs')

// const pass = 'toneko'
// const salt = bcrypt.genSaltSync(8);
// const hash = bcrypt.hashSync(pass, salt)

// const compare = bcrypt.compareSync('tonekoo', hash)

// console.log(compare);

const { nanoid } = require('nanoid')

console.log(nanoid());