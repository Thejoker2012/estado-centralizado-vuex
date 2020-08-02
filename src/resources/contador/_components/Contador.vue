<template>
  <div class="container"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Contador',
  data: () => ({
    contadorLocal: 2
  }),
  computed: {
    //Primeiro parâmetro do mapState é o namespaced
    ...mapState('contador', {
      contador: (state) => state.contador,
      contadorAlias: (state) => state.contador,
      contadorMultiplicado(state) {
        return state.contador * this.contadorLocal
      }
    })
  },
  methods: {
    decrementar() {
      this.$store.state.contador.contador--
    },
    incrementar() {
      this.$store.state.contador.contador++
    }
  }
}
</script>

<style></style>
