module.exports = {
  apps: [
    {
      name: 'SMF_MNG',
      script: 'nodemon --watch src/ src/index.js',
      instances: 0,
      exec_mode: 'fork',
    },
  ],
};
