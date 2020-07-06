new Vue({
    el: '#dom-6',
    data: {
        fullLink: '<a target="_blank" href="https://google.com">Google</a>',
    }
});

new Vue({
    el: '#dom-5',
    data: {
        title: 'Hello Vue JS',
    },
    methods: {
        sayHello() {
            this.title = 'Welcome Vue JS'
            return this.title
        }
    }
});

new Vue({
    el: '#dom-4',
    data: {
        title: 'Hello Vue JS',
        link: 'https://google.com'
    },
    methods: {
        sayHello() {
            return this.title
        }
    }
})

new Vue({
    el: '#dom-3',
    data: {
        title: 'Hello Vue JS'
    },
    methods: {
        sayHello() {
            return this.title
        }
    }
})


new Vue({
    el: '#dom-2',
    methods: {
        sayHello() {
            return 'Hello Vue JS'
        }
    }
})


new Vue({
    el: '#dom-1',
    data: {
        title: 'Hello Vue JS'
    }
})