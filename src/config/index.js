export default {
  server:
    process.env.NODE_ENV === 'development' ? 'api' : 'api'
}
