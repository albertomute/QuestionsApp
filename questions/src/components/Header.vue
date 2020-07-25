<template>
    <div>
        <b-nav tabs>
            <b-nav-item disabled><b>Fancy Quiz App</b></b-nav-item>
            <b-nav-item disabled>Score {{numCorrect}}</b-nav-item>
            <b-nav-item disabled>Question {{index+1}} / {{questions.length}}</b-nav-item>
        </b-nav>
    </div>
</template>
<script>
export default {
    props: {
        numCorrect: Number,
        numTotal: Number,
        questions: Array,
        index: Number
    }
}
</script>