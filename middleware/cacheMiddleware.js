const cache = {};

const TTL = 60 * 1000; 

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cachedData = cache[key];

   
    if (!cachedData) {
        res.set("X-Cache", "MISS");
        return next();
    }

  
    const currentTime = Date.now();
    const age = currentTime - cachedData.createdAt;

    if (age > TTL) {
        delete cache[key];

        res.set("X-Cache", "MISS");
        return next();
    }

   
    res.set("X-Cache", "HIT");

    return res.json(cachedData.data);
}



function setCache(key, data) {
    cache[key] = {
        data: data,
        createdAt: Date.now()
    };
}


function clearCache() {
    Object.keys(cache).forEach((key) => {
        delete cache[key];
    });
}

module.exports = {
    cacheMiddleware,
    setCache,
    clearCache
};