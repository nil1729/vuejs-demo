new Vue({
    el: '#dom-1',
    data: {
        title: 'I love Vue JS',
        showText: false
    },
    methods: {
        changeText: function () {
            this.showText = true;
            this.updateText()
        },
        updateText: function () {
            this.title = 'I love Vue JS very much.'
        },
    },
    computed: {
        lowerCaseTitle: function () {
            return this.title.toLowerCase();
        }
    },
    watch: {
        title: function (value) {
            alert(`Title is updated to ${value}`);
        }
    }
});

// --------
new Vue({
    el: '#app-21',
    data: {
        title: 'Multiple Vue Intances 1'
    }
});

new Vue({
    el: '#app-22',
    data: {
        title: 'Multiple Vue Intances 2'
    }
});
// -------

const vm31 = new Vue({
    el: '#app-31',
    data: {
        title: 'This the own title of App 1'
    }
});

const vm32 = new Vue({
    el: '#app-32',
    methods: {
        changeText() {
            vm31.title = 'This is the changed text by App 2'
        }
    }
});


const vm33 = new Vue({
    el: '#app-33',
    data: {
        title: 'This the own title of App 3'
    }
});

document.querySelector('#outside-btn').addEventListener('click', () => {
    vm33.title = 'This is the changed text by JS'
});
// ---------

const vm4 = new Vue({
    el: '#app-41',
    data: {
        title: 'I love Vue JS'
    }
});

document.getElementById('btn-4').addEventListener('click', () => {
    vm4.$data.title = 'I Love React JS'
    console.log(vm4.$el);
});

// =========

const vm5 = new Vue({
    el: '#dom-5',
    data: {
        title: 'I love Vue JS'
    },
    methods: {
        output: function () {
            console.log(this.$refs);
            console.log(typeof this.$refs);

            console.log(Object.keys(this.$refs));
            console.log(Object.values(this.$refs));

            const keys = Object.keys(this.$refs);
            keys.forEach(key => {
                console.log(this.$refs[key].innerText);
            });

            this.$refs.myButton.innerText = 'Text Changed'
        }
    }
});

// =================

const vm61 = new Vue({
    data: {
        title: 'I Love Vue JS'
    }
});

vm61.$mount('#app-61');


const vm62 = new Vue({
    template: '<p class="lead">I am a Template</p>'
});
vm62.$mount();
document.getElementById('app-62').appendChild(vm62.$el);

// ========

Vue.component('mycomponent', {
    template: '<p class="lead">I am a reusable component</p>'
});

new Vue({
    el: '#dom-7'
});

// ====
new Vue({
    el: '#dom-10',
    data: {
        title: 'This is Vue JS Lifecycle'
    },
    beforeCreate: function () {
        console.log('beforeCreate()');
    },
    created: function () {
        console.log('created()');
    },
    beforeMount: function () {
        console.log('beforeMount()');
    },
    mounted: function () {
        console.log('mounted()');
    },
    beforeUpdate: function () {
        console.log('beforeUpdate()');
    },
    updated: function () {
        console.log('updated()');
    },
    beforeDestroy: function () {
        console.log('beforeDestroy()');
    },
    destroyed: function () {
        console.log('destroyed()');
    },
    methods: {
        updateText: function () {
            this.title = 'I love Vue JS'
        },
        destroyInstance: function () {
            this.$destroy();
        }
    }
})