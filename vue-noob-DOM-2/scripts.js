new Vue({
    el: '#dom-1',
    data: {
        counter: 0
    },
    methods: {
        increase: function () {
            this.counter++;
        }
    }
});

new Vue({
    el: '#dom-2',
    data: {
        x: 0,
        y: 0,
    },
    methods: {
        updateCoordinates(event) {
            this.x = event.clientX
            this.y = event.clientY
        }
    }
});

new Vue({
    el: '#dom-3',
    data: {
        counter: 0
    },
    methods: {
        increase: function (step, event) {
            this.counter += step;
            console.log(event);
        }
    }
});

new Vue({
    el: '#dom-4',
    data: {
        x: 0,
        y: 0,
    },
    methods: {
        updateCoordinates(event) {
            this.x = event.clientX
            this.y = event.clientY
        },
        stopUpdating(event) {
            event.stopPropagation();
        }
    }
});

new Vue({
    el: '#dom-5',
    methods: {
        alertMe() {
            alert('Vue JS is a Frontend Framework');
        }
    }
})