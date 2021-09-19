Luz = 0
Temp = 0
radio.set_group(1)
radio.set_transmit_power(7)
pins.analog_write_pin(AnalogPin.P1, 0)
pins.analog_write_pin(AnalogPin.P2, 0)
Humedad = pins.analog_read_pin(AnalogPin.P0)
basic.show_string("L")
basic.pause(100)
led.plot_bar_graph(input.light_level(), 395)
basic.pause(5000)
basic.show_string("T")
led.plot_bar_graph(Temp, 40)
basic.pause(2000)
basic.show_string("H")
led.plot_bar_graph(Humedad, 200)
basic.pause(5000)

def on_forever():
    if Temp >= 20 and Temp <= 35:
        led.plot_bar_graph(Temp, 140)
        basic.pause(5000)
        basic.show_string("ESTABLE")
    basic.pause(5000)
    if Temp >= 35 and Temp <= 34:
        led.plot_bar_graph(Temp, 45)
        basic.pause(1000)
        basic.show_string("ALTA.TEMP")
    basic.pause(1000)
    if Temp >= 10 and Temp <= 16:
        led.plot_bar_graph(Temp, 150)
        basic.pause(2000)
        basic.show_string("BAJA.TEMP")
    if Humedad >= 300 and Temp >= 35:
        basic.show_icon(IconNames.NO)
        basic.pause(100)
        basic.show_string("A!")
        basic.pause(100)
        basic.show_icon(IconNames.NO)
    if Humedad >= 300 and Temp >= 35:
        basic.show_icon(IconNames.NO)
        basic.pause(200)
        basic.show_string("A!")
        basic.pause(200)
        basic.show_icon(IconNames.NO)
basic.forever(on_forever)

def on_forever2():
    global Temp, Humedad, Luz
    Temp = input.temperature()
    Humedad = pins.analog_read_pin(AnalogPin.P0)
    Luz = input.light_level()
basic.forever(on_forever2)

def on_forever3():
    basic.pause(1000)
    if input.button_is_pressed(Button.A):
        led.plot_bar_graph(input.temperature(), 140)
    basic.pause(1000)
    if input.button_is_pressed(Button.B):
        led.plot_bar_graph(Humedad, 200)
    basic.pause(1000)
    if input.button_is_pressed(Button.AB):
        led.plot_bar_graph(Luz, 395)
    basic.pause(1000)
basic.forever(on_forever3)

def on_forever4():
    if Humedad < 300:
        pins.analog_write_pin(AnalogPin.P1, 1023)
    else:
        pins.analog_write_pin(AnalogPin.P1, 0)
    basic.pause(100)
    if Luz < 100:
        pins.analog_write_pin(AnalogPin.P2, 1023)
    else:
        pins.analog_write_pin(AnalogPin.P2, 0)
    basic.pause(100)
basic.forever(on_forever4)

def on_in_background():
    basic.pause(1000)
    radio.send_number(Humedad)
    basic.pause(1000)
    radio.send_number(Luz)
    basic.pause(1000)
    radio.send_number(Temp)
    basic.pause(1000)
control.in_background(on_in_background)
