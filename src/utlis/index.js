import Vue from 'vue'

export function updateObjectReactive (obj, data) {
  for (const key in data) {
    Vue.set(obj, key, data[key])
  }
}

export function getStr (val) {
  const res = typeof val === 'string' ? val : val + 'px'
  return res
}

export function getNumeric (val) {
  const res = typeof val === 'string' ? val.replace('px', '') : val
  return Number(res)
}
