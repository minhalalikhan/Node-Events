const express = require('express')
const EventEmitter = require('events')

const app = express()
const PORT = 3000

const CustomEmitter = new EventEmitter()
CustomEmitter.on('Init', (data) => console.log(`new Object Created of type ${data.constructor.name}`))
CustomEmitter.on('processing', (data) => console.log(`Object is processing new data`))
CustomEmitter.on('finish', (data) => console.log(`Process finished`))

class DummyEmitter {


    constructor() {
        // console.log(this)
        this.name = 'this is a dummy emitter';
        this.id = '536482'
        CustomEmitter.emit('Init', this)
    }

    async process(a, b) {
        CustomEmitter.emit('processing')

        function delayit() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 2000);
            })
        }

        await delayit().then(() => console.log(a + b)).then(() => CustomEmitter.emit('finish'))



    }
}


const d1 = new DummyEmitter()
d1.process(30, 40)