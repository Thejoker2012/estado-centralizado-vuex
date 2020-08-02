import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  erro: undefined,
  tarefas: [],
  tarefaSelecionada: undefined
}

export default {
  namespaced: true,
  state,
  getters,
  mutations, //Mutations sempre executam de forma sincrona, nunca se deve executar código assincrono aqui
  actions //As actions são responsaveis por executar código assincrono
}
