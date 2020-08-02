<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>
      <div class="col-sm-2">
        <button
          class="btn btn-primary float-right"
          @click="exibirFormularioCriarTarefa"
        >
          <i class="fa fa-plus mr-2"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <h3 class="font-weight-light mt-4">A Fazer : {{ totalTarefaAfazer }}</h3>

    <ul class="list-group" v-if="totalTarefaAfazer > 0">
      <TarefaListaItem
        v-for="(tarefa, index) in tarefasAFazer"
        :key="index"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @concluir="concluirTarefa({ tarefa: $event })"
        @deletar="confirmarRemocaoTarefa"
      />
    </ul>
    <p v-else>Nenhuma Tarefa a fazer</p>

    <h3 class="font-weight-light mt-4">
      Concluidas : {{ totalTarefaconcluida }}
    </h3>

    <ul class="list-group" v-if="tarefasConcluidas">
      <TarefaListaItem
        v-for="(tarefa, index) in tarefasConcluidas"
        :key="index"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @concluir="concluirTarefa({ tarefa: $event })"
        @deletar="confirmarRemocaoTarefa"
      />
    </ul>

    <p v-else>Nenhuma Tarefa concluida</p>

    <TarefaSalvar v-if="exibirFormulario" @salvar="salvarTarefa" />

    <div class="alert alert-danger" v-if="erro">{{ erro.message }}</div>
  </div>
</template>

<script>
import TarefaSalvar from './TarefasSalvar'
import TarefaListaItem from './TarefaListaItem'

//import do modulo store de tarefas para ser registradoo dinamicamente
import register from '../_store/register'

// import {
//   mapState,
//   mapGetters,
//   mapActions
//   //mapMutations,
// } from 'vuex'

//Importando helpers para utilizaçao das namespaced
import { createNamespacedHelpers } from 'vuex'

//Declarando a namespaced que vou utilizar e os métodos actions, getters e state
const { mapActions, mapGetters, mapState } = createNamespacedHelpers('tarefas')

export default {
  name: 'TarefasLista',
  data: () => ({
    exibirFormulario: false
  }),
  components: {
    TarefaSalvar,
    TarefaListaItem
  },
  computed: {
    ...mapState(['tarefaSelecionada', 'erro']),
    ...mapGetters([
      'tarefasConcluidas',
      'tarefasAFazer',
      'totalTarefaconcluida',
      'totalTarefaAfazer',
      'boasVindas'
    ])
    // tarefasConcluidas() {
    //   return this.tarefasConcluidas
    // }
  },
  methods: {
    ...mapActions([
      'criarTarefa',
      'editarTarefa',
      'concluirTarefa',
      'listarTarefas',
      'deletarTarefa',
      'selecionarTarefa',
      'resetarTarefaSelecionada'
    ]),

    confirmarRemocaoTarefa(tarefa) {
      const confirmar = confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`)
      if (confirmar) {
        this.deletarTarefa({ tarefa })
      }
    },

    exibirFormularioCriarTarefa(event) {
      if (this.tarefaSelecionada) {
        this.resetarTarefaSelecionada()
        return
      }
      this.exibirFormulario = !this.exibirFormulario
    },
    async salvarTarefa(event) {
      console.log(event)
      switch (event.operacao) {
        case 'criar':
          await this.criarTarefa({ tarefa: event.tarefa })
          break
        case 'editar':
          await this.editarTarefa({ tarefa: event.tarefa })

        default:
          break
      }
      this.resetar()
    },

    selecionarTarefaParaEdicao(tarefa) {
      this.exibirFormulario = true
      this.selecionarTarefa({ tarefa })
    },
    resetar() {
      this.exibirFormulario = false
      this.resetarTarefaSelecionada()
    },

    //...mapMutations(['listarTarefas'])
    // ...mapMutations({
    //   carregarTarefas: 'listarTarefas',
    //   listarTarefas: (commit, payload, options) => {
    //     commit('listarTarefas', payload, options)
    //   }
    // })

    //Primeiro parâmetro do mapActions é o namespaced
    ...mapActions({
      carregarTarefas: 'listarTarefas',
      listarTarefas: (dispatch, payload, options) => {
        return dispatch('listarTarefas', payload, options)
      }
    })
  },

  created() {
    //Registrando o módulo dinamicamente
    register(this.$store)
    this.listarTarefas()
  }

  // created() {
  //   //Registrando o módulo dinamicamente
  //   register(this.$store)

  //   // this.$store.registerModule('tarefas', tarefasModule, {
  //   //   preserveState: true
  //   // }) // preserve state é utilizado para renderização do lado do servidor

  //   //this.$store.registerModule(['tarefas','outroModulo', 'outro'], tarefasModule)

  //   setTimeout(async () => {
  //     await this.listarTarefas()
  //     console.log('Actions executadas')

  //     // this.$store.dispatch('listarTarefas', {
  //     //   tarefas: [
  //     //     { id: 1, titulo: 'Aprender Vue', concluido: true },
  //     //     { id: 2, titulo: 'Aprender Vue Router', concluido: true },
  //     //     { id: 3, titulo: 'Aprender Vuex', concluido: false }
  //     //   ]
  //     // })
  //     // this.$store.dispatch({
  //     //   type: 'listarTarefas',
  //     // tarefas: [
  //     //   { id: 1, titulo: 'Aprender Vue', concluido: true },
  //     //   { id: 2, titulo: 'Aprender Vue Router', concluido: true },
  //     //   { id: 3, titulo: 'Aprender Vuex', concluido: false }
  //     // ]
  //     // })
  //   }, 1000)
  //   console.log('Boas vindas', this.boasVindas)
  //   // this.$store.commit({
  //   //   type: 'listarTarefas',
  //   //   tarefas: [
  //   //     { id: 1, titulo: 'Aprender Vue', concluido: true },
  //   //     { id: 2, titulo: 'Aprender Vue Router', concluido: true },
  //   //     { id: 3, titulo: 'Aprender Vuex', concluido: false }
  //   //   ]
  //   // })
  // }
}
</script>
