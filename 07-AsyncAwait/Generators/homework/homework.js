function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let i = 1
  while(max ? i <= max: true){
    if(i%3 === 0 && i%5 === 0){
      yield 'Fizz Buzz'
    } else if(i%3 === 0){
      yield 'Fizz'
    } else if(i%5 === 0){
     yield 'Buzz'
    } else { 
      yield i
    }
    i++
  }

  // if(max){
  //   for(let i = 0; i<max; i++){
  //     if(max%3 === 0){
  //       yield 'Fizz'
  //     } else if(max%5 === 0){
  //       yield 'Buzz'
  //     } else if(max%3 === 0 && max%5 === 0){
  //       yield 'Fizz Buzz'
  //     }
  //   }
  // }
}

module.exports = fizzBuzzGenerator;
