const {updateName} = require('./updateName.js');
const {updatePassword} = require('./updatePassword.js');
function startDataUpdate() {
    updateName();
    updatePassword();
}
module.exports.startDataUpdate = startDataUpdate;