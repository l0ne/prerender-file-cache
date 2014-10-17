prerender-file-cache
====================
Prerender plugin for caching in file system, to be used with the prerender node application from https://github.com/prerender/prerender.

<<<<<<< HEAD
This is a forked version from suhanovv/prerender-file-cache that calculates a MD5 hash of the URL to cache instead
of using the URL with some stripping. 

Also this version checks before starting if the cache dir exsist instead of on cache write. 

=======
>>>>>>> 9d3e190815f8b680dbd49872313b0153a147ce21
#How it works

This plugin will store all prerendered pages into a filesystem hierarchy.
For example: 

<<<<<<< HEAD
url http://domain.lo/?_escaped_fragment_=/en/about - will be saved in CACHE_ROOT_DIR/12cdac6f2485c7e41c06d7988bc7e79
url http://domain.lo/?_escaped_fragment_=/en/main/path/blah - will be saved in CACHE_ROOT_DIR/6908d15af9f9ce96b54ed946c397df8b
=======
url http://domain.lo/?_escaped_fragment_=/en/about - will be saved in CACHE_ROOT_DIR/en/about/___  
url http://domain.lo/?_escaped_fragment_=/en/main/path/blah - will be saved in CACHE_ROOT_DIR/en/main/path/blah/___
>>>>>>> 9d3e190815f8b680dbd49872313b0153a147ce21

and etc

#How to use

In your local prerender project run:

$ npm install prerender-file-cache --save
Then in the server.js that initializes the prerender:

server.use(require('prerender-file-cache'));

##Configuration

export CACHE_ROOT_DIR=/you/directory/for/cache  
export CACHE_LIVE_TIME=10000 (in seconds)

