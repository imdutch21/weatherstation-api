const { builtinModules } = require("module");

module.exports = {
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || 'dsjfkl;3lkl3nr2jkdsf',
    secretKey: process.env.SECRETKEY|| 'sakldjlkeasdjlhkhl765f',
    databaseHost: process.env.DATABASEHOST,
    databasePassword: process.env.DATABASEPASSWORD,
    databaseUsername: process.env.DATABASEUSERNAME
}