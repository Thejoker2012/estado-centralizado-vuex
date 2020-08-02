<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Vuex</h1>
        <p class="lead">
          Padrão de Gerenciamento de Estado Centralizado no Vue
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 border-right">
          <TarefasLista />
        </div>
        <div class="col-sm-3">
          <Contador />
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import Contador from '@/resources/contador/_components/Contador.vue'
import TarefasLista from '@/resources/tarefas/_components/TarefasLista.vue'

export default {
  components: {
    Contador,
    TarefasLista
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
