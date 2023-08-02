let productSchema = {
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
};

let personDataSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/schemas/person.json",
    "title": "h+ Sport People",
    "description": "Schema for h+ Sport people cards",
    "type": "object",
    "items": {
        "type": "array",
        "properties": {
            "img": {
                "type": "object",
                "properties": {
                    "src": {
                        "type": "string"
                    },
                    "alt": {
                        "type": "string"
                    }
                }
            },
            "cardInfo": {
                "type": "object",
                "properties": {
                    "cardName": {
                        "type": "string"
                    },
                    "cardTitle": {
                        "type": "string"
                    }
                }
            },
            "cardText": {
                "type": "string"
            }
        }
    }
};