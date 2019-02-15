import fs from 'fs'
import concat from 'concat-stream'

export const toBase64 = (path) => {
  return new Promise((resolve, reject) => {
      fs.createReadStream(path, { encoding: 'base64' }).pipe(concat(resolve, reject))
  })
}

export const isType = (type, val) => {
  return Object.prototype.toString.call(val).toLowerCase() === '[object '+ type +']'
}

/**
* in(boolean true) => out(false)
* in(array []) => out(true)
* in(array [1]) => out(false)
* in(string '') => out(true)
* in(string ' ') => out(false)
* in(object {}) => out(true)
* in(object {foo: '123'}) => out(fasle)
* in(object null) => out(true)
* in(object undefined) => out(true)
* in(number 0) => out(true)
* in(number 1) => out(false)
*/
export const isEmpty = (val) => {
  if ( isType('string', val) || isType('array', val) ) {
    return val.length === 0
  }
  if ( isType('object', val) ) {
    return Object.keys(val).length === 0
  }
  if ( isType('number', val) ) {
    return val === 0
  }
  if ( isType('undefined', val) ) {
    return true
  }
  if ( isType('boolean', val) ) {
    return val === false
  }
  return false
}

export const trim = (str) => {
  if (!isType('string', str)) {
    return ''
  }
  return trimLeft(trimRight(str))
} 

export const trimRight = (str) => {
  if (!isType('string', str)) {
    return ''
  }
  return str.replace(/\s*$/, '')
} 

export const trimLeft = (str) => {
  if (!isType('string', str)) {
    return ''
  }
  return str.replace(/^\s*/, '')
} 