import {verifyJson} from './mod.js'

const assertions = [
  () => verifyJson(JSON.parse(`42`), ["exactly", 42]) === true,
  () => verifyJson(JSON.parse(`42`), ["number"]) === true,
  () => verifyJson(JSON.parse(`42`), ["any"]) === true,
  
  () => verifyJson(JSON.parse(`42`), ["string", 42]) === false,
  () => verifyJson(JSON.parse(`42`), ["boolean"]) === false,
  () => verifyJson(JSON.parse(`42`), ["null"]) === false,

  
  () => verifyJson(JSON.parse(`{"whatever": "works"}`), ["any"]) === true,

  () => verifyJson(JSON.parse(`"42"`), ["exactly", "42"]) === true,
  () => verifyJson(JSON.parse(`"42"`), ["exactly", 42]) === false,


  () => verifyJson(JSON.parse(`"42"`), ["number"]) === false,
  () => verifyJson(JSON.parse(`42`), ["number"]) === true,


  () => verifyJson(JSON.parse(`"42"`), ["string"]) === true,
  () => verifyJson(JSON.parse(`42`), ["string"]) === false,


  () => verifyJson(JSON.parse(`true`), ["boolean"]) === true,
  () => verifyJson(JSON.parse(`false`), ["boolean"]) === true,
  () => verifyJson(JSON.parse(`42`), ["boolean"]) === false,


  () => verifyJson(JSON.parse(`null`), ["null"]) === true,
  () => verifyJson(JSON.parse(`false`), ["null"]) === false,

  () => verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["array", ["number"]]) === true,
  () => verifyJson(JSON.parse(`[1, 2, 3, "42"]`), ["array", ["number"]]) === false,

  () => verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", [["number"], ["number"], ["number"], ["number"]]]) === true,
  () => verifyJson(JSON.parse(`[1, 2, 3, "42"]`), ["tuple", [["number"], ["number"], ["number"], ["string"]]]) === true,
  () => verifyJson(JSON.parse(`[1, 2, 3, "42"]`), ["tuple", [["number"], ["number"], ["number"], ["number"]]]) === false,
  () => verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", [["number"], ["number"], ["number"]]]) === false,
  () => verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", [["number"], ["number"], ["number"], ["string"]]]) === false,

  () => verifyJson(JSON.parse(`{"one": 1, "two": 2, "three": 3, "four": 42}`), ["object", {"one": ["number"], "two": ["number"], "three": ["number"], "four": ["exactly", 42]}]) === true,

  () => verifyJson(JSON.parse(`42`), ["union", [["number"], ["string"]]]) === true,
  () => verifyJson(JSON.parse(`"42"`), ["union", [["number"], ["string"]]]) === true,
]

for (const a of assertions) {
  if (a() === false) console.log('Assertion failed', a.toString())
}