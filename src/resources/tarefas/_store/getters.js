export default {
  tarefasConcluidas: (state, getters, rootState, rootGetters) =>
    state.tarefas.filter((taref) => taref.concluido),
  tarefasAFazer: (state) => state.tarefas.filter((taref) => !taref.concluido),
  totalTarefaconcluida: (state, getters) => getters.tarefasConcluidas.length,
  totalTarefaAfazer: (state, getters) => getters.tarefasAFazer.length,
  buscaTarefaPorId: (state) => (id) =>
    state.tarefas.find((taref) => taref.id === id),

  //Acessando state global dentro de um módulo
  boasVindas: (state, getters, rootState, rootGetters) => {
    // state.tarefas // tarefas.tarefas
    // getters.tarefasAFazer // tarefas.tarefasAFazer

    return rootGetters.mensagemBoasVindas
  }
}
