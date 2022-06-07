module.exports = {
  apps: [
    {
      name: 'app',
      script: 'node src/index.js',
      instances: 0,
      exec_mode: 'fork',
    },
  ],
};
