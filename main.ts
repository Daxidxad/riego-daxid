let Luz = 0
let Critico = false
let Alta_Temp = false
let Estable = false
let Baja_Temp = false
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
    Baja_Temp = Temp >= 10 && Temp <= 16
    Estable = Temp >= 20 && Temp <= 27
    Alta_Temp = Temp >= 28 && Temp <= 34
    Critico = Humedad >= 600 && Temp >= 35
})
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
    if (Temp >= 10 && Temp <= 16) {
        radio.sendString("Baja.Temp")
    }
    basic.pause(500)
    if (Temp >= 20 && Temp <= 27) {
        radio.sendString("Estable")
    }
    basic.pause(500)
    if (Temp >= 28 && Temp <= 34) {
        radio.sendString("Alta.Temp")
    }
    basic.pause(500)
    if (Humedad >= 600 && Temp >= 35) {
        radio.sendString("Critico")
    }
    basic.pause(500)
})
