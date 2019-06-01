import React from 'react'

function formatNumber(num) {
  if (isNaN(num)) {
    return '--'
  }
  if (!num && num !== 0) {
    return '--'
  }
  let nt = num + ''
  nt = nt.trim()
  if (isNaN(parseInt(nt, 10))) {
    return '--'
  }
  let splt = nt.split('')
  let newArr = splt.reverse()
  let ret = ''
  for (let i = 0; i < newArr.length; i++) {
    if (i > 0 && i % 3 === 0) {
      ret += '.' + newArr[i]
    } else {
      ret += newArr[i]
    }
  }
  return ret.split('').reverse().join('')
}

export default {
  formatNumber
}
