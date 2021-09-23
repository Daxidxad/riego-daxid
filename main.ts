let Luz = 0
let Temp = 0
radio.setGroup(1)
pins.analogWritePin(AnalogPin.P1, 0)
pins.analogWritePin(AnalogPin.P2, 0)
let Humedad = pins.analogReadPin(AnalogPin.P0)
basic.showString("L")
basic.pause(100)
led.plotBarGraph(
input.lightLevel(),
395
)
basic.pause(5000)
basic.showString("T")
led.plotBarGraph(
Temp,
40
)
basic.pause(2000)
basic.showString("H")
led.plotBarGraph(
Humedad,
200
)
basic.pause(5000)
basic.forever(function () {
    if (Temp >= 20 && Temp <= 35) {
        led.plotBarGraph(
        Temp,
        140
        )
        basic.pause(5000)
        basic.showString("ESTABLE")
    }
    basic.pause(5000)
    if (Temp >= 35 && Temp <= 34) {
        led.plotBarGraph(
        Temp,
        45
        )
        basic.pause(1000)
        basic.showString("ALTA.TEMP")
    }
    basic.pause(1000)
    if (Temp >= 10 && Temp <= 16) {
        led.plotBarGraph(
        Temp,
        150
        )
        basic.pause(2000)
        basic.showString("BAJA.TEMP")
    }
    if (Humedad >= 300 && Temp >= 35) {
        basic.showIcon(IconNames.No)
        basic.pause(100)
        basic.showString("A!")
        basic.pause(100)
        basic.showIcon(IconNames.No)
    }
    if (Humedad >= 300 && Temp >= 35) {
        basic.showIcon(IconNames.No)
        basic.pause(200)
        basic.showString("A!")
        basic.pause(200)
        basic.showIcon(IconNames.No)
    }
})
basic.forever(function () {
    Temp = input.temperature()
    Humedad = pins.analogReadPin(AnalogPin.P0)
    Luz = input.lightLevel()
})
basic.forever(function () {
    basic.pause(1000)
    if (input.buttonIsPressed(Button.A)) {
        led.plotBarGraph(
        input.temperature(),
        140
        )
    }
    basic.pause(1000)
    if (input.buttonIsPressed(Button.B)) {
        led.plotBarGraph(
        Humedad,
        200
        )
    }
    basic.pause(1000)
    if (input.buttonIsPressed(Button.AB)) {
        led.plotBarGraph(
        Luz,
        395
        )
    }
    basic.pause(1000)
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
control.inBackground(function () {
    basic.pause(1000)
    radio.sendNumber(Humedad)
    basic.pause(1000)
    radio.sendNumber(Luz)
    basic.pause(1000)
    radio.sendNumber(Temp)
    basic.pause(1000)
})
