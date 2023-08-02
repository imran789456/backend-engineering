## [JSON Essential Training](https://www.linkedin.com/learning/json-essential-training) — Sasha Vodnik

- [x] Introduction
- [x] 1. Understanding JSON
- [x] 2. Processing JSON Data
- [x] 3. Using JSON Data
- [x] 4. Applying Techniques for Working with JSON
- [x] 5. Working with JSON Schema
- [x] 6. Structuring Data with JSON-LD
- [x] Conclusion

## JSON (JavaScript Object Notation)

* web page — https://www.json.org/json-en.html
* Wiki Page — https://en.wikipedia.org/wiki/JSON
* Python — https://docs.python.org/3/library/json.html
* JavaScript — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
* JSON with comments — https://github.com/komkom/jsonc
* JSON-P — https://en.wikipedia.org/wiki/JSONP
* JSON-LD [semantic markup] — https://json-ld.org/
* JSON5 – JSON for Humans - https://json5.org/

### JSON Rules

* `""` for keys and values (strings).
* JSON objects starts with `{}`.
* JSON arrays starts with `[]`.
* No leading zeros(0) in number.
* No trailing decimals in number.
* No trailing comma.
* No comments.
* No circular refeence.

### JSON vs JavaScript

```json
{
    "filename": "contacts.pdf",
    "version": 2,
    "sequence": 1,
    "approved": true
}
```

if zero is significant in front of number in json then make them as string "01"

```js
{
    filename: 'contacts.pdf',
    approved: true,
    sequence: 01, // valid
    version: 2., // valid
}
```

### Conversion

* JSON to JavaScript object/array `JSON.parse(string [,reviver]);`
* JavaScript object/array to JSON `JSON.stringify(value [,replacer, space]);` 
* JSON to Python object/array `json.loads(strings);`
* Python object/array to JSON `json.dumps(objects);`    

Other available formats are `YAML, XML, CSV`.

### Convert XML to JSON

* xml2json — http://goessner.net/ 
* XML string to DOM Node
    * `let peopleDataNode = (new DomParser()).parseFromString(rawData, "text/xml");`
* DOM Node to JSON
    * `let ConvertedData = xml2json(peopleDataNode, "");`
* JSON to Object
    * `let parseData = JSON.parse(convertedData);`

### JSON Schema

* Web Page — https://json-schema.org/
* Create Schema from JSON — https://jsonschema.net/app/schemas/0
* Validate Schema — https://www.jsonschemavalidator.net/
* JSON Formatter — https://jsonformatter.org/

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/schemas/products.json",
    "title": "h+ Sport Products",
    "description": "Schema for h+ Sport product data",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": {
                "type": "string"
            },
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "image_title": {
                "type": "string"
            },
            "image": {
                "type": "string"
            }
        }
    }
}
```