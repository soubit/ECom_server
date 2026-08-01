// all extra utility based function for session

// const util ={}

export  function regenerateSession(req) {
    return new Promise((resolve, reject) => {
        req.session.regenerate(err => {
            if (err) reject(err);
            else resolve();
        });
    });
}


// module.exports = util;
