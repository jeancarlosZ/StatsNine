//* Get and export our express router
const router = require('express').Router()
module.exports = router
//* Grab the API methods
const API = require('./apiUtils')
//* Here we are importing redis!
const Redis = require('redis')
//* Now we are creating our redis client,
//* this is how we will interact with redis.
const redisCli = Redis.createClient()

//* This route will update the redis cache with data (if required)
//* as well as respond with data from that cache (if included)
//* otherwise, it will automatically load the data (from the API)
//* and use the response data (from API) to populate the cache!
router.post('/', async (request, response, next) => {
  try {
    //* Get the data from the request
    const { symbol = 'system', key, saveAs, callback, args, experation } = request.body
    //* Before we go too far we're going to start of by checking whether
    //* we are trying to get a single piece of data, or multiple pieces!
    //* Note: This is really important as it will determine how many API
    //* calls we make. Remember we want to keep them at a minimum!
    if (Array.isArray(saveAs) || Array.isArray(key)) {
      //* First (this shouldn't happen, but) to avoid any errors
      //* we are going to MAKE SURE that both the keys and saveAs are arrays
      if (!Array.isArray(saveAs) || !Array.isArray(key)) {
        response.send({})
        return
      }
      //* Now that we have made sure both are arrays, we will
      //* prepare our data object by 'initializing' it as {}
      const data = {}
      //* We will also prepare a 'toLoad' array for any missing
      //* keys that we didn't have inside our redis cache.
      const toLoad = []
      //* Now we will go thru each of these keys we are looking for
      //* and we will see if we can find them inside our redis cache.
      await Promise.all(
        key.map(async (k, i) => {
          //* This is the key (where/location) we are looking in memory (redis)
          //* to find the the value at this point int he saveAs array!
          const query = `${symbol}:${saveAs[i]}`
          //* Now. Let's see if we can find it!
          return new Promise((resolve, reject) => {
            redisCli.get(query, async (error, result) => {
              //* If there was an error, print it!
              if (error) reject(error)
              //* If that key was found, we're going to add it to the data (to return)!
              if (result != null) data[k] = JSON.parse(result)
              //* Otherwise it looks like we didn't have anything in cache!
              //* So now we will add this particular key to the toLoad!
              else toLoad.push({ a: k, b: saveAs[i] })
              resolve(true)
            })
          })
        })
      )
      //* Now that we have gone through and checked to see if the key
      //* exists in cache and added it to the response data, we must
      //* check to see if anything needed to be loaded!
      if (toLoad.length > 0) {
        //* Since we must load the data from the API it's time to make our API call!
        const loadedData = args ? await API[callback](symbol, ...args) : await API[callback](symbol)
        //* Now that we have our data back from the API, we can add the
        //* remaining (missing) keys to the response data! But not only that,
        //* we can add it to our redis cache as well!
        toLoad.map(obj => {
          const { a, b } = obj
          //* Temporary object to hold our data
          let singletonData
          //* If the response is not an array. It is an object. This means it contains
          //* a key value pair (time series) for us to use!
          if (!Array.isArray(loadedData))
            singletonData = {
              keys: loadedData.keys,
              values: loadedData.values.map(x => x[a])
            }
          //* Otherwise it is an array, in this case we only want the first element.
          //* This is because the loadedData will only return an array if it's a single
          //* object inside. Ex. [{ hello: 'world' }]
          else if (Array.isArray(loadedData)) singletonData = loadedData[0][a]
          //* Otherwise it's just an object and we need the key! Ex. { hello: 'world' }
          else singletonData = loadedData[a]
          //* Now we can add that key (a) to the response data!
          data[a] = singletonData
          //* Now we will create our query to save under!
          const query = `${symbol}:${b}`
          //* and Finally we can send that data off to our redis cache!
          //* Now that the response has been sent, we will cache this
          //* data using redis. It will be stored using the query (key).
          //* Note: we are checking if there is an experation set, this is
          //* because we can choose to have the data 'persist' or expire after
          //* a set time. By default, in our case we'll let it persist.
          if (experation) redisCli.setex(query, experation, JSON.stringify(singletonData))
          else redisCli.set(query, JSON.stringify(singletonData))
        })
      }
      //* Finnally! We can now return our data back to the client via a response!
      response.send(data)
    } else {
      //* This is the key (where/location) we are looking in memory (redis)
      //* to find the value we are looking for.
      const query = `${symbol}:${saveAs}`
      //* We are going to try to GET that key from redis.
      //* If that key is not found; we will load the data
      //* using the provided func, and proceed to save it.
      redisCli.get(query, async (error, results) => {
        //* If there was an error, print it!
        if (error) console.error(error)
        //* If the key was found, we will simply return the value (data)
        if (results != null) return response.json(JSON.parse(results))
        //* If the key was not found, we are going to call that api function
        //* As we now know we need to get the data from the API.
        const loadedData = args ? await API[callback](symbol, ...args) : await API[callback](symbol)
        //* Now because we don't always want to store the WHOLE response,
        //* we will find the data we're looking for and only save it!
        let data = {}
        //* If the response is not an array. It is an object. This means it contains
        //* a key value pair (time series) for us to use!
        if (!Array.isArray(loadedData))
          data = { keys: loadedData.keys, values: loadedData.values.map(obj => obj[key]) }
        //* Otherwise it is an array, in this case we only want the first element.
        //* This is because the loadedData will only return an array if it's a single
        //* object inside. Ex. [{ hello: 'world' }]
        else if (Array.isArray(loadedData)) data = loadedData[0][key]
        //* Otherwise, it's just an object and we need the key! Ex. { hello: 'world' }
        else data = loadedData[key]
        //* Because we don't want to wait to save, then send that data
        //* we are going to send the response data back right away!
        response.send(JSON.stringify(data))
        //* Now that the response has been sent, we will cache this
        //* data using redis. It will be stored using the query (key).
        //* Note: we are checking if there is an experation set, this is
        //* because we can choose to have the data 'persist' or expire after
        //* a set time. By default, in our case we'll let it persist.
        if (experation) redisCli.setex(query, experation, JSON.stringify(data))
        else redisCli.set(query, JSON.stringify(data))
      })
    }
    //* If we encountered an error througout that whole process!
  } catch (error) {
    next(error)
  }
})
