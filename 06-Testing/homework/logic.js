function sumaArray(array,num){
    if(!Array.isArray(array)) throw new TypeError('array');
    if(typeof num !== 'number') throw new TypeError('number');
    for(let i = 0; i<array.length-1; i++){
        for(let j = i+1; j < array.length; j++){
            if(array[i]+array[j] === num) return true;
        }
    }
    return false;
}

function pluck(array,prop){
    // for(let i=0; i<array.length;i++){
    //     if(array[i].car.length === 0 || !Array.isArray(array)){
    //         return res.sendStatus(400)
    //     }
    // }
    return array.map(p => p[prop]);
}
module.exports = {sumaArray, pluck}