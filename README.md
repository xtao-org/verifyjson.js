# verifyjson.js

Verifies if the return value of `JSON.parse` conforms to a type constraint.

Supports simple and complex type constraints.

Useful for validation of unreliable JSON.

## Installation

### Node.js

```
npm install xtao-org/verifyjson.js#semver:0.1.0
```

### Deno and the browser

Import from [jsDelivr](https://www.jsdelivr.com/):

```js
import {verifyJson} from 'https://cdn.jsdelivr.net/gh/xtao-org/verifyjson.js@v0.1.0/mod.js'
```

## Quickstart

For example:

```js
import {verifyJson} from 'https://cdn.jsdelivr.net/gh/xtao-org/verifyjson.js@v0.1.0/mod.js'

verifyJson(JSON.parse(`42`), ["exactly", 42]) === true
verifyJson(JSON.parse(`42`), ["number"]) === true
verifyJson(JSON.parse(`42`), ["any"]) === true

verifyJson(JSON.parse(`42`), ["string"]) === false
verifyJson(JSON.parse(`42`), ["boolean"]) === false
verifyJson(JSON.parse(`42`), ["null"]) === false

verifyJson(JSON.parse(`{"one": 1, "two": 2, "three": 3, "four": 42}`), [
  "object", {
    "one": ["number"], 
    "two": ["number"], 
    "three": ["union", [["number"], ["string"]]], 
    "four": ["exactly", 42]
  }
]) === true
```

## Supported costraints

### any

`any` matches any valid JSON value.

```js
verifyJson(JSON.parse(`{"whatever": "works"}`), ["any"]) === true
```

### exactly

`exactly` matches an exact JSON value.

```js
verifyJson(JSON.parse(`"42"`), ["exactly", "42"]) === true
verifyJson(JSON.parse(`"42"`), ["exactly", 42]) === false
```

### number

`number` matches any JSON number.

```js
verifyJson(JSON.parse(`"42"`), ["number"]) === false
verifyJson(JSON.parse(`42`), ["number"]) === true
```

### string

`number` matches any JSON string.

```js
verifyJson(JSON.parse(`"42"`), ["string"]) === true
verifyJson(JSON.parse(`42`), ["string"]) === false
```

### boolean

`number` matches `true` and `false`.

```js
verifyJson(JSON.parse(`true`), ["boolean"]) === true
verifyJson(JSON.parse(`false`), ["boolean"]) === true
verifyJson(JSON.parse(`42`), ["boolean"]) === false
```

### null

`number` matches only `null`.

```js
verifyJson(JSON.parse(`null`), ["null"]) === true
verifyJson(JSON.parse(`false`), ["null"]) === false
```

### array

`array` matches an array of given type.

```js
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["array", ["number"]]) === true
verifyJson(JSON.parse(`[1, 2, 3, "42"]`), ["array", ["number"]]) === false
```

### tuple

`array` matches an array which contains a number of values of specified types.

```js
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", [["number"], ["number"], ["number"], ["number"]]]) === true
verifyJson(JSON.parse(`[1, 2, 3, "42"]`), ["tuple", [["number"], ["number"], ["number"], ["string"]]]) === true
verifyJson(JSON.parse(`[1, 2, 3, "42"]`), ["tuple", [["number"], ["number"], ["number"], ["number"]]]) === false
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", [["number"], ["number"], ["number"]]]) === false
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", [["number"], ["number"], ["number"], ["string"]]]) === false
```

### object

`object` matches an object which contains only the properties with values of specified types.

```js
verifyJson(JSON.parse(`{"one": 1, "two": 2, "three": 3, "four": 42}`), ["object", {"one": ["number"], "two": ["number"], "three": ["number"], "four": ["exactly", 42]}]) === true
```

### union

`union` matches a value of any of the specified types.

```js
verifyJson(JSON.parse(`42`), ["union", [["number"], ["string"]]]) === true
verifyJson(JSON.parse(`"42"`), ["union", [["number"], ["string"]]]) === true
```

***

[MIT LICENSE](LICENSE)

© 2022 xtao.org