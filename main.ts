let Luz = 0
let Temp = 0
radio.setGroup(1)
radio.setTransmitPower(7)
pins.analogWritePin(AnalogPin.P1, 0)
pins.analogWritePin(AnalogPin.P2, 0)
let Humedad = pins.analogReadPin(AnalogPin.P0)
basic.showString("Luz")
basic.pause(100)
led.plotBarGraph(
input.lightLevel(),
395
)
basic.pause(5000)
basic.showString("Temp")
led.plotBarGraph(
Temp,
60
)
basic.pause(2000)
basic.showString("hUMEDAD")
led.plotBarGraph(
Humedad,
200
)
basic.pause(5000)
basic.forever(function () {
    radio.sendNumber(Humedad)
    radio.sendNumber(Luz)
    radio.sendNumber(Temp)
})
basic.forever(function () {
    if (Temp >= 15) {
        led.plotBarGraph(
        Temp,
        140
        )
        basic.pause(1000)
        basic.showString("ESTABLE")
    } else {
        led.plotBarGraph(
        Temp,
        150
        )
        basic.pause(1000)
        basic.showString("BAJA.TEMP")
    }
    basic.pause(500)
    if (Temp >= 35) {
        led.plotBarGraph(
        Temp,
        45
        )
        basic.pause(1000)
        basic.showString("ALTA.TEMP")
    }
    basic.pause(1000)
})
basic.forever(function () {
    Temp = input.temperature()
    Humedad = pins.analogReadPin(AnalogPin.P0)
    Luz = input.lightLevel()
})
basic.forever(function () {
    if (Humedad < 300) {
        pins.analogWritePin(AnalogPin.P1, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P1, 0)
    }
    basic.pause(100)
    if (Luz < 100) {
        pins.analogWritePin(AnalogPin.P2, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P2, 0)
    }
    basic.pause(100)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        led.plotBarGraph(
        input.temperature(),
        140
        )
    }
    if (input.buttonIsPressed(Button.B)) {
        led.plotBarGraph(
        Humedad,
        200
        )
    }
    if (input.buttonIsPressed(Button.AB)) {
        led.plotBarGraph(
        Luz,
        395
        )
    }
})
