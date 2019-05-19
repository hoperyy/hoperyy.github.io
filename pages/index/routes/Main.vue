<template>
    <div>
        <h-nav></h-nav>
        <p>{{message}}</p>
    </div>
</template>

<script>

// 导航模块
import Nav from '../modules/Nav.vue';

export default {
    components: {
        'h-nav': Nav
    },
    data() {
        return {
            message: 'Hello World'
        };
    }
};

</script>

<style lang="less">
div {
    font-size: 20px;
    text-align: center;
}
</style>
