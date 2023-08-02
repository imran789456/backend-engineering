let weatherSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://explorecalifornia.com/schemas/weather.sjon",
    "title": "Explore California Weather",
    "description": "Schema for Explore California weather data.",
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
            "name_ascii": {
                "type": "string"
            },
            "lat": {
                "type": "string"
            },
            "lng": {
                "type": "string"
            },
            "population": {
                "type": "string"
            },
            "country_id": {
                "type": "string"
            },
            "province": {
                "type": "string"
            },
            "country_name": {
                "type": "string"
            },
            "unit": {
                "type": "string"
            },
            "season": {
                "type": "string"
            },
            "forecast": {
                "type": "array",
                "properties": {
                    "data": {
                        "type": "string"
                    },
                    "temp_min": {
                        "type": "number"
                    },
                    "temp_max": {
                        "type": "number"
                    },
                    "season_min": {
                        "type": "number"
                    },
                    "season_max": {
                        "type": "number"
                    },
                    "condition_name": {
                        "type": "string"
                    },
                    "condition_desc": {
                        "type": "string"
                    },
                    "condition_video": {
                        "type": "string"
                    },
                    "condition_icon": {
                        "type": "string"
                    }
                }
            }
        }
    }
};
