<template>
    <div class="full-width center-content">
        <h1>Hello World!</h1>
        <div>
            <router-link :to="{'name':'document-list'}">
                Document list
            </router-link>
        </div>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        "name": "app"
    }
</script>

<style scoped>
    .full-width {
        width: 100%;
    }

    .center-content {

    }
</style>
