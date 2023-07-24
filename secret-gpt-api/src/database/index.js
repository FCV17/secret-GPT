const config = require('$config')
const logDebug = require('$core-services/logFunctionFactory').getDebugLogger()
const startRedis = require('./redis')

let Redis = {}
// let RedisSubscribe = {};
if (process.env.USE_REDIS === 'true') {
  console.log('Use REDIS try to connect : ', process.env.USE_REDIS)
  Redis = startRedis(config.redisUrl)
  // RedisSubscribe = startRedis(config.redisUrl)
}

const Database = {
  saveToken: async (key, token, ttl) => {
    let sTtl = ttl || config.REDIS_AUTH_TTL

    let res = await Redis.SETEX(key, sTtl, token)
    console.log('result after saved redis key ', res)
  },

  getToken: async (key) => {
    console.log('[DATA_REDIS] will get token...')
    let token = await Redis.get(key)
    console.log('[DATA_REDIS] returned token ', token)
    return token
  },

  initKYCData: async (key, idt, reference) => {
    let res = await Redis.hset(key, 'ref', reference, 'idt', idt, 'status', 'request.pending')
    let ex = await Redis.expire(key, 1200) //expire after 20 minutes
    logDebug('[DATA_REDIS] initKYCData result ', res, ' expire ', ex)
  },

  updateKYCData: async (key, field, data) => {
    let res = await Redis.hset(key, field, data)
    logDebug('[DATA_REDIS] updateKYCData result ', res)
  },

  getKYCData: async (key, param) => {
    let result

    if (!param) result = await Redis.hgetall(key)
    else result = await Redis.hget(key, param)

    logDebug('[DATA_REDIS] getKYCData result ', result)
    return result
  }
}

module.exports = Database
