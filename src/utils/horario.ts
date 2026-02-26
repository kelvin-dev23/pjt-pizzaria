export function estaAberto() {
  const agora = new Date()

  const diaSemana = agora.getDay()
  const hora = agora.getHours()

  const diasFuncionamento = [0, 4, 5, 6] // Dom, Qui, Sex, Sab
  const horaAbertura = 19
  const horaFechamento = 23

  const diaValido = diasFuncionamento.includes(diaSemana)
  const horarioValido = hora >= horaAbertura && hora < horaFechamento

  return diaValido && horarioValido
}