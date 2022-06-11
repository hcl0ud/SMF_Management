module.exports = {
  apps: [
    {
      name: 'ssas',
      script: 'nodemon --watch src/ src/index.js',
      instances: 0,
      exec_mode: 'fork',
    },
  ],
};
