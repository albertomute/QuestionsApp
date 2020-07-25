<template>
    <div>
        <div>
            <b-jumbotron :class="submitted && index+1 == questions.length ? 'nodisplay' : 'display'">
                <template v-slot:lead>
                    {{ qn.question }}
                </template>

                <hr class="my-3">

                <b-list-group class="mb-3">
                    <b-list-group-item @click="selectAns(index)" v-for="(answer, index) in shuffledAnswers" :key="index"  button
                        :class="[ submitted && answer !== qn.correct_answer && selectedIndex === index ? 'notCorrect' :
                                submitted && answer === qn.correct_answer ? 'correct' : 
                                selectedIndex === index ? 'primary' : '']" 
                        :disabled="submitted">
                        {{ answer }}
                    </b-list-group-item>
                </b-list-group>

                <b-button variant="primary float-left ml-3"
                @click="submitAnswer" 
                :disabled="selectedIndex === null || submitted === true">

                    Submit
                </b-button>
                <b-button @click="next" variant="success float-right mr-3"
                :disabled="submitted === null || index+1 == questions.length ">
                    Next
                </b-button>
            </b-jumbotron>
        </div>
        <div>
            <p :class="submitted && index+1 == questions.length ? 'display danger' : 'nodisplay'">
                THANK YOU FOR PARTICIPATING
            </p>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        qn: Object,
        questions: Array,
        index: Number,
        next: Function,
        increment: Function,
    },
    data() {
        return {
            selectedIndex: null,
            shuffledAnswers: [],
            submitted: null,
            isCorrect: null,
        }
    },
    watch: {
        qn: {
            immediate: true,
            handler() {
                this.selectedIndex = null
                this.shuffleAnswers()
                this.submitted = null
                this.isCorrect = null
            }
        }
    },
    methods: {
        selectAns(index) {
            this.selectedIndex = index
        },
        shuffleAnswers() {
            let answers = [...this.qn.incorrect_answers, this.qn.correct_answer]
            this.shuffledAnswers = _.shuffle(answers)
        },
        submitAnswer() {
            this.submitted = true

            if( this.shuffledAnswers[this.selectedIndex] === this.qn.correct_answer ) {
                this.isCorrect = true
            }

            this.increment(this.isCorrect)
        }
    },
    computed: {
        answers() {
            let answers = [...this.qn.incorrect_answers, this.qn.correct_answer]
            return answers
        }
    }
}
</script>

<style scoped>
    .list-group-item{
        outline: none;
    }
    .primary{
        background: lightblue;
    }
    .correct{
        background: lightgreen;
    }
    .notCorrect{
        background: lightcoral;
    }
    .display{
        display: block;
    }
    .danger{
        color: rgb(245, 49, 49);
    }
    .nodisplay{
        display: none;
    }
</style>
