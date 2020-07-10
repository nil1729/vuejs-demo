Vue.component('my-comp', {
    data: function () {
        return {
            title: 'I love Vue JS'
        }
    },
    template: '<p class="lead">{{ title }}</p>'
});

new Vue({
    el: '#dom-1'
});


// /=========/
const data = {
    title: 'I love Vue JS'
}
Vue.component('my-comp-1', {
    data: function () {
        return data;
    },
    template: '<div><p class="lead">{{ title }}</p><button @click="changeText" class="btn btn-primary btn-sm">Change Text</button></div>',
    methods: {
        changeText: function () {
            this.title = 'I love React JS'
        }
    }
});

Vue.component('my-comp-2', {
    data: function () {
        return {
            title: 'I love Vue JS'
        }
    },
    template: '<div><p class="lead">{{ title }}</p><button @click="changeText" class="btn btn-primary btn-sm">Change Text</button></div>',
    methods: {
        changeText: function () {
            this.title = 'I love React JS'
        }
    }
});

new Vue({
    el: '#dom-2'
})
// =========

const cmp = {
    data: function () {
        return {
            title: 'I love Vue JS'
        }
    },
    template: '<p class="lead">{{ title }}</p>'
};

Vue.component('g-comp', {
    data: function () {
        return {
            title: 'I love Javascript'
        }
    },
    template: '<p class="lead">{{ title }}</p>'
});

new Vue({
    el: '#app-31',
    components: {
        'app1-comp': cmp
    }
});
new Vue({
    el: '#app-32',
})