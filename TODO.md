# Maybe

## Nesting

Reduce nesting, as in turn this:

```js
verifyJson(JSON.parse(`false`), ["null"]) === false
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["array", ["number"]]) === true
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", [["number"], ["number"], ["number"], ["number"]]]) === true
verifyJson(JSON.parse(`"42"`), ["union", [["number"], ["string"]]]) === true
```

into this:

```js
verifyJson(JSON.parse(`false`), "null") === false
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["array", "number"]) === true
verifyJson(JSON.parse(`[1, 2, 3, 42]`), ["tuple", ["number", "number", "number", "number"]]) === true
verifyJson(JSON.parse(`"42"`), ["union", ["number", "string"]]) === true
```

maybe only for primitive types?

## Open objects

Currently an object which contains extra properties will fail:

```js
verifyJson(JSON.parse(`{"one": 1, "two": 2, "three": 3}`), ["object", {"one": ["number"], "two": ["number"], "three": ["number"], "four": ["exactly", 42]}]) === false
```

An option could be added to prevent that, e.g.:

```js
verifyJson(JSON.parse(`{"one": 1, "two": 2, "three": 3, "four": 42}`), [
  "object", {
    "one": ["number"], 
    "two": ["number"], 
    "three": ["number"]
  }, "open"
]) === true
```

Perhaps this should be the default?

## Optionality

Optional object properties, as in:

```js
verifyJson(JSON.parse(`{"one": 1, "two": 2, "four": 42}`), [
  "object", {
    "one": ["number"], 
    "two": ["number"], 
    "three": ["optional", "number"]
  }, "open"
]) === true
```
