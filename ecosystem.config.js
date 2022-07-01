module.exports = {
  apps: [
    {
      name: 'SMF_MNG',
      script: 'nodemon --watch src/ src/db.controller.js',
      instances: 0,
      exec_mode: 'fork',
    },
  ],
};
