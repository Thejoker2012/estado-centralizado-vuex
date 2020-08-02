import * as types from './mutation-types'

import TarefaService from '../_services/TarefasService'

export default {
  concluirTarefa: async ({ dispatch }, payload) => {
    const tarefa = Object.assign({}, payload.tarefa)
    tarefa.concluido = !tarefa.concluido
    dispatch('editarTarefa', { tarefa })
  },

  criarTarefa: ({ commit }, { tarefa }) => {
    return TarefaService.postTarefa(tarefa)
      .then((response) => {
        commit(types.CRIAR_TAREFA, { tarefa: response.data })
      })
      .catch((erro) => {
        commit(types.SETAR_ERRO, { erro })
      })
  },

  editarTarefa: async ({ commit }, { tarefa }) => {
    try {
      const response = await TarefaService.putTarefa(tarefa)
      commit(types.EDITAR_TAREFA, { tarefa: response.data })
    } catch (erro) {
      commit(types.SETAR_ERRO, { erro })
    }
  },
  deletarTarefa: async ({ commit }, { tarefa }) => {
    try {
      const response = await TarefaService.deleteTarefa(tarefa.id)
      commit(types.DELETAR_TAREFA, { tarefa })
    } catch (erro) {
      commit(types.SETAR_ERRO, { erro })
    }
  },

  buscarTarefa: async ({ commit }, { tarefa }) => {
    try {
      const response = await TarefaService.getTarefa(tarefa.id)
      commit(types.BUSCAR_TAREFA, { tarefa: response.data })
    } catch (erro) {
      commit(types.SETAR_ERRO, { erro })
    }
  },

  listarTarefas: async ({ commit }) => {
    try {
      const response = await TarefaService.getTarefas()
      commit(types.LISTAR_TAREFAS, { tarefas: response.data })
    } catch (erro) {
      commit(types.SETAR_ERRO, { erro })
    }
  },

  selecionarTarefa: ({ commit }, payload) => {
    commit(types.SELECIONAR_TAREFA, payload)
  },

  resetarTarefaSelecionada: ({ commit }) => {
    commit(types.SELECIONAR_TAREFA, { tarefa: undefined })
  }

  // buscarTarefas: (context, payload) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([
  //         { id: 1, titulo: 'Aprender Vue', concluido: true },
  //         { id: 2, titulo: 'Aprender Vue Router', concluido: true },
  //         { id: 3, titulo: 'Aprender Vuex', concluido: false }
  //       ])
  //     }, 2000)
  //   })
  // },

  // listarTarefas: ({ commit, dispatch }, payload) => {

  //   return dispatch('buscarTarefas').then((tarefas) => {

  //     commit('listarTarefas', { tarefas })
  //   })
  // }
  // listarTarefas: async (
  //   { commit, dispatch, state, rootStatem, getters, rootGetters },
  //   payload
  // ) => {
  //   const tarefas = await dispatch('buscarTarefas')
  //   commit(types.LISTAR_TAREFAS, { tarefas })
  //   //Quando precisamos executar um commit, actions, muttation que está state root
  //   //commit('logar', 'Iago Santos') //logar não funciona
  //   //commit('logar', 'Iago Santos', { root: true }) //logar
  //   //dispacth('logar', 'Iago Santos', { root: true }) //logar não funciona
  //   //dispacth('logar', null, { root: true }) //Caso não tiver payload passar null como segundo parâmetro

  //   dispatch('logar', 'Iago Santos', { root: true })
  // }
}
