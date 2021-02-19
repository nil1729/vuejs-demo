new Vue({
    el: '#dom-1',
    data: {
        counter: 0
    },
    methods: {
        increase: function (step) {
            this.counter += step;
        }
    }
});

new Vue({
    el: '#dom-2',
    data: {
        text: 'I love Vue JS'
    }
});

new Vue({
    el: '#dom-3',
    data: {
        counter: 0,
        secondCounter: 0
    },
    computed: {
        output: function () {
            console.log('Computed')
            return this.counter > 5 ? 'Greater than 5' : 'Smaller than 5'
        }
    },
    methods: {
        result: function () {
            console.log('Methods')
            return this.counter > 5 ? 'Greater than 5' : 'Smaller than 5'
        }
    }
});

new Vue({
    el: '#dom-4',
    data: {
        counter: 0,
        computedPost: '',
        watchPost: ''
    },
    computed: {
        output: async function () {
            console.log(this.counter);

            const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const JSONData = await res.json();

            this.computedPost = JSONData.title;
            return this.computedPost;
        }
    },
    watch: {
        counter: async function (value) {
            const vm = this;

            const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + value);
            const JSONData = await res.json();
            console.log(JSONData.title, '==== Watch');

            vm.watchPost = JSONData.title;
        }
    }
});

new Vue({
    el: '#dom-5',
    data: {
        link: 'https://google.com',
        counter: 0
    }
});