/* eslint-disable */
const path = require('path');
const isObject = require('lodash/isObject');
const isFunction = require('lodash/isFunction');
const isArray = require('lodash/isArray')
const importDir = require('directory-import');
const { forEach } = require('lodash');
const  has  = require('lodash/has');
const routesDir = './routes';
const { server } = require('./server');

const schemas = importDir({directoryPath:'./schemas', importMethod:'sync'})

importDir({directoryPath: routesDir, importMethod: 'sync'}, (routeName, routePath, routeMethods ) => {
    
    const isModule = path.extname(routePath) === '.js';

    if(!isModule) {
        return process.stdout.write(`File ${routePath} is not a route`);
    }

    if(!isObject(routeMethods)) {
        return process.stdout.write(`Object with methods expected in the file ${routePath}`)
    }
    
    const cleanedPath = routeName === 'index'
    ? routePath.slice(0, routePath.length - 'index.js'.length)
    : routePath.slice(0, routePath.length - '.js'.length);

    forEach(routeMethods, (handler, methodName) => {
        
        let schema = schemas[`/${routeName}.json`][methodName];

        if (!schema) {
            schema = {};
        }

        if (isFunction(handler)) {
            server[methodName](cleanedPath,  {schema} , handler);
        } else if (isArray) {
            const [settings] = methodName;
            
            if (!settings.schema) {
                settings.schema = schema;
                server[methodName](cleanedPath, ...handler);
            }
        }
        else {
            return process.stdout.write(`Route ${routePath} invalid!`);
        }
    });

});
