// Description: This file contains the functions that are used in the project.

function normaVector(arr){
  // norma of a vector
  const scuares =arr.reduce((acc,cur)=> acc + cur*cur,0,)
  return Math.sqrt(scuares)
}
function sumVector(arr1,arr2){
  // sum of two vectors
  return arr1.map((el,i)=> el + arr2[i])
}
function subVector(arr1,arr2){
  // sub of two vectors
  return arr1.map((el,i)=> el - arr2[i])
}
function multVector(arr1,num){
  // multiplication of a vector by a scalar
  return arr1.map((el,i)=> el*num)
}
function divVector(arr1,num){
  // division of a vector by a scalar
  return arr1.map((el,i)=> el/num)
}
function dotProduct(arr1,arr2){
  // dot product of two vectors
  return arr1.reduce((acc,cur,i)=> acc + cur*arr2[i],0)
}
function angleToVector(angle){
  // angle to unitary vector
  return [cos(angle),sin(angle)]
}
function scalarProduct(arr1,num){
  // multiplication of a vector by a scalar
  return arr1.map((el,i)=> el*num)
}
function reverseVector(arr){
  // reverse of a vector
  return arr.map((el,i)=> -el)
}
function unitVector(arr){
  // unitary vector in the direction of the vector
  // if the vector is 0, return the same vector ([0,0])
  if(normaVector(arr) === 0){
    return arr
  }
  return divVector(arr,normaVector(arr))
}