<template>
  <div id="app">
    <Header 
        :numTotal="numTotal" 
        :numCorrect="numCorrect" 
        :questions="questions" 
        :index="index"/>

    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col offset="3" sm="6">
          <QuestionsBox 
            v-if="questions.length"
            :questions="questions"
            :index="index"
            :qn="questions[index]"
            :next="next"
            :increment="increment"/>
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import axios from 'axios'
import Header from "./components/Header.vue"
import QuestionsBox from "./components/QuestionsBox.vue"

export default {
  name: 'App',
  components: {
    Header,
    QuestionsBox
  },
  data(){
    return{
      questions: [],
      index: 0,
      numTotal: 0,
      numCorrect: 0,
    }
  },
  methods: {
    next() {
      this.index++
    },
    prev() {
      this.index--
    },
    increment(isCorrect) {
      if(isCorrect) {
        this.numCorrect++
      }
      this.numTotal++
    }
  },
  mounted: function() {
    axios
    // .get('https://opentdb.com/api.php?amount=10&type=multiple')
    .get('http://localhost:3000')
    .then(response => { this.questions = response.data })
    .catch(error => { console.log(error)})
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
  margin-top: 60px;
}
</style>
