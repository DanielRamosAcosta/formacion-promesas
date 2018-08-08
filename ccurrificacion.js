function saludo(formaDeSaludo, nombrePersona) {
  console.log(`${formaDeSaludo} ${nombrePersona}`)
}

const saludoCurrificado = formaDeSaludo => nombrePersona =>
  saludo(formaDeSaludo, nombrePersona)

saludo('hola', 'pepe')
saludo('hola', 'juan')
saludo('hola', 'maria')

const saludoHola = saludoCurrificado('hola')

saludoHola('pepe')
saludoHola('juan')
saludoHola('maria')
