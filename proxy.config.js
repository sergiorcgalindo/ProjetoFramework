const proxy = [
    {
      context: '/api',
      target: 'https://localhost:44364',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;

  