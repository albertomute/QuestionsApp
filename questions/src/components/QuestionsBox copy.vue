<template>
    <div>
        <b-jumbotron>
            <template v-slot:lead>
                {{ qn.question }}
            </template>

            <hr class="my-3">

            <b-list-group class="mb-3">
                <b-list-group-item @click="selectAns(index)" v-for="(answer, index) in answers" :key="index"  button 
                    :variant="[selectedIndex === index ? 'primary' : '']">
                    {{ answer }}
                </b-list-group-item>
            </b-list-group>

            <b-button variant="primary float-left ml-3">Submit</b-button>
            <b-button @click="next" variant="success float-right mr-3">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        qn: Object,
        next: Function,
    },
    data() {
        return {
            selectedIndex: null,
            shuffledAnswers: [],
        }
    },
    watch: {
        qn: {
            immediate: true,
            handler() {
                this.selectedIndex = null
                this.shuffleAnswers()
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
</style>
