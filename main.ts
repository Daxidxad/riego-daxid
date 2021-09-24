// Inicio
// 
// 
radio.setGroup(1)
pins.analogWritePin(AnalogPin.P1, 1023)
pins.analogWritePin(AnalogPin.P2, 0)
let Temp = input.temperature()
let Luz = input.lightLevel()
let Humedad = pins.analogReadPin(AnalogPin.P0)
let Baja_Temp = Temp >= 10 && Temp <= 16
let Estable = Temp >= 20 && Temp <= 27
let Alta_Temp = Temp >= 28 && Temp <= 34
let Critico = Humedad >= 600 && Temp >= 35
basic.showString("L")
basic.pause(100)
led.plotBarGraph(
input.lightLevel(),
395
)
basic.pause(1000)
basic.showString("T")
led.plotBarGraph(
Temp,
36
)
basic.pause(2000)
basic.showString("H")
led.plotBarGraph(
Humedad,
200
)
basic.pause(1000)
// Controles
// 
basic.forever(function () {
    basic.pause(1000)
    led.plotBarGraph(
    Humedad,
    200
    )
    basic.pause(1000)
    if (Temp >= 20 && Temp <= 35) {
        basic.showNumber(Temp)
        led.plotBarGraph(
        Temp,
        20
        )
        basic.pause(1000)
        basic.showString("ESTABLE")
    }
    basic.pause(1000)
    if (Temp >= 35 && Temp <= 34) {
        basic.showNumber(Temp)
        led.plotBarGraph(
        Temp,
        45
        )
        basic.pause(1000)
        basic.showString("ALTA.TEMP")
    }
    basic.pause(1000)
    if (Temp >= 10 && Temp <= 16) {
        basic.showNumber(Temp)
        led.plotBarGraph(
        Temp,
        150
        )
        basic.pause(1000)
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
    while (Humedad <= 300) {
        pins.analogWritePin(AnalogPin.P2, 1023)
    }
    basic.pause(100)
    while (pins.analogReadPin(AnalogPin.P0) <= 300) {
        pins.analogWritePin(AnalogPin.P2, 1023)
    }
    basic.pause(100)
})
// Transmicion
// 
basic.forever(function () {
    if (Temp >= 10 && Temp <= 16) {
        radio.sendString("Baja.Temp")
        basic.pause(500)
        radio.sendString("" + (Baja_Temp))
    }
    basic.pause(500)
    if (Temp >= 20 && Temp <= 27) {
        radio.sendString("Estable")
        basic.pause(500)
        radio.sendString("" + (Estable))
    }
    basic.pause(500)
    if (Temp >= 28 && Temp <= 34) {
        radio.sendString("Alta.Temp")
        basic.pause(500)
        radio.sendString("" + (Alta_Temp))
    }
    basic.pause(500)
    if (Humedad >= 600 && Temp >= 35) {
        radio.sendString("Critico")
        basic.pause(500)
        radio.sendString("" + (Critico))
    }
    basic.pause(500)
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
        basic.pause(1000)
        led.plotBarGraph(
        Luz,
        395
        )
    }
    basic.pause(1000)
})
