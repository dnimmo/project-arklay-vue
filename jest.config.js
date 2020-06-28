module.exports = {
    "moduleFileExtensions": [
        "js",
        "json",
        "vue"
    ],
    "transform": {
        // process `*.vue` files with `vue-jest`
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.(js|jsx)?$": "babel-jest"
    }
}