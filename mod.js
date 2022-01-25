/**
 * 
 * @param {*} json 
 * @param {*} rtti -- assume it's a string or an object
 * @returns 
 */
export function verifyJson(json, [tag, ...rtti]) {
  if (tag === "any") {
    return true
  }
  if (tag === "string") {
    return typeof json === "string"
  }
  if (tag === "number") {
    return typeof json === "number"
  }
  if (tag === "boolean") {
    return typeof json === "boolean"
  }
  if (tag === "null") {
    return json === null
  }
  if (tag === "exactly") {
    const [value] = rtti
    return json === value
  }
  if (tag === "object") {
    const [object] = rtti
    if (json === null) return false
    if (Array.isArray(json)) return false
    const entries = Object.entries(json)
    for (let i = 0; i < entries.length; ++i) {
      const [key, value] = entries[i]
      const type = object[key]
      if (type === undefined) return false
      if (verifyJson(value, type) === false) return false
    }
    return true
  }
  if (tag === "tuple") {
    const [types] = rtti
    if (Array.isArray(json) === false) return false
    if (json.length !== types.length) return false
    for (let i = 0; i < types.length; ++i) {
      if (verifyJson(json[i], types[i]) === false) return false
    }
    return true
  }
  if (tag === "array") {
    const [type] = rtti 
    if (Array.isArray(json) === false) return false
    for (let i = 0; i < json.length; ++i) {
      if (verifyJson(json[i], type) === false) return false
    }
    return true
  }
  if (tag === "union") {
    const [types] = rtti 
    for (let i = 0; i < types.length; ++i) {
      if (verifyJson(json, types[i]) === true) return true
    }
    return false
  }
  // if (tag === "product") {
  //   // todo
  //   return
  // }
  throw Error(`Unrecognized tag ${tag}`)
}