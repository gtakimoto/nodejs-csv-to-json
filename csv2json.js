const fs = require('fs')
const LReader = require('readline')
const path = require('path')
const csvFile = 'customer-data.csv'
const jsonFile = 'customer-data.json'
let isFirstRow = true
let cols = []
let buff = []
let jsonObj = {}

const lr = LReader.createInterface({
    input: fs.createReadStream(path.join(__dirname, csvFile))
})

lr.on('line', (line) => {

    jsonObj = {}

    if (isFirstRow) {
        line.split(',').forEach((item, index) => {
            cols[index] = item
        })
    } else {
        line.split(',').forEach((item, index) => {
            jsonObj[cols[index]] = item
        })

        buff.push(jsonObj)
    }

    isFirstRow = false
})

lr.on('close', () => {
    fs.writeFileSync(jsonFile, JSON.stringify(buff, null, 2));
})