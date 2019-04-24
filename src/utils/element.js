export function isElement(value) {
  return value && value.nodeType === 1
}

export function $id(id) {
  return document.getElementById(id)
}
