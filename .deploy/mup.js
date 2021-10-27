module.exports = {
  servers: {
    one: {
      //! Connect with VPN on sunshine-connection-circuit to use
      host: '192.168.1.38',
      username: 'maxall4',
      // pem: './path/to/pem'
      password: 'Max2menlo!'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'Pilot',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      ROOT_URL: 'https://pilot.maxcampbell.dev',
      MONGO_URL: 'mongodb+srv://admin:dRtmLotNiS5RVE0f@cluster0.sl2vo.mongodb.net/pilotDB?retryWrites=true',
    },

    docker: {
      image: 'zodern/meteor:root',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
