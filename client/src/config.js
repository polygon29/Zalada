const isProd = process.env.NODE_ENV === 'production'

const config = {
  isProd,
  serverUrlPrefix: isProd ? 'https://wd05-admin.cloud-workshop.online' : 'http://localhost:1337'
}

export default config;
