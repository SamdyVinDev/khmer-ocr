const { exec } = require("child_process");

function os_func() {
  this.execCommand = function (cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  };
}
const os = new os_func();

const apiUrl = "http://localhost:8000";

module.exports = {
  apiUrl,
  os,
};
