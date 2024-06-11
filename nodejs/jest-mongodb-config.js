const config = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    instance: {
      dbName: 'jest_example',
    },
    autoStart: false,
  },
}

export default config;