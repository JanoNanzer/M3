'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise {
    constructor(executor, state = 'pending', value = undefined){
        if(typeof executor !== 'function') throw new TypeError('executor function')
        this._value = value;
        this._state = state;
        // let resolve = (someData)=> {this._internalResolve(someData)}
        // let reject = (someData)=> {this._internalReject(someData)}
        // executor(resolve,reject);
        this._handlerGroups = [];
        executor(this._internalResolve.bind(this), this._internalReject.bind(this))
    };
    static resolve(value){
        if(value instanceof $Promise) return value;
        return new $Promise(()=> {}, 'fulfilled', value);
    }
    
    static all(arr){
        if(!Array.isArray(arr)) throw new TypeError('error')
        else {
            this.resolve(arr)
        }
    }
}

$Promise.prototype._internalResolve = function(someData){
    if(this._state === 'pending'){
        this._state = 'fulfilled';
        this._value = someData;
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function(someData){
    if(this._state === 'pending'){
        this._state = 'rejected';
        this._value = someData
        this._callHandlers();
    }
};

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;
    // typeof errorCb !== 'function' ? (errorCb = undefined): 1;
    const downstreamPromise = new $Promise(function(){});
    this._handlerGroups.push({successCb,errorCb,downstreamPromise})
    if(this._state !== 'pending') this._callHandlers()
    return downstreamPromise;
};

$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length > 0){
        let actual = this._handlerGroups.shift();
        if(this._state === 'fulfilled'){
            // actual.successCb && actual.successCb(this._value)
            if(!actual.successCb){
                actual.downstreamPromise._internalResolve(this._value)
            } else{
                try{
                    const result = actual.successCb(this._value);
                    if(result instanceof $Promise){
                        result.then(value => actual.downstreamPromise._internalResolve(value), err => actual.downstreamPromise._internalReject(err));
                    } else {
                        actual.downstreamPromise._internalResolve(result)
                    }
                } catch(e){
                    actual.downstreamPromise._internalReject(e)
                }
            }
        } else if(this._state === 'rejected'){
            // actual.errorCb && actual.errorCb(this._value)
            if(!actual.errorCb){
                actual.downstreamPromise._internalReject(this._value)
            } else{
                try{
                    const result = actual.errorCb(this._value);
                    if(result instanceof $Promise){
                        result.then(value => actual.downstreamPromise._internalResolve(value), err => actual.downstreamPromise._internalReject(err));
                    } else {
                        actual.downstreamPromise._internalResolve(result)
                    }
                } catch(e){
                    actual.downstreamPromise._internalReject(e)
                }
            }
        }
    }
};

$Promise.prototype.catch = function(errorCb){
    // this._handlerGroups.push({successCb: null, errorCb})
    return this.then(null, errorCb)
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
