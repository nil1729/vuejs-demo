new Vue({
    el: '#dom-1',
    data: {
        bgRed: false
    }
});
new Vue({
    el: '#dom-2',
    data: {
        bgRed: false
    },
    computed: {
        divClasses: function () {
            return {
                'bg-primary': this.bgRed,
                'bg-info': !this.bgRed
            }
        }
    }
});

new Vue({
    el: '#dom-3',
    data: {
        bgRed: false,
        bgInput: 'bg-success'
    }
});

new Vue({
    el: '#dom-4',
    data: {
        color1: 'pink',
        width: 100,
        color2: 'lightblue'
    },
    computed: {
        myStyles: function () {
            return {
                backgroundColor: this.color2,
                width: `${this.width}px`
            }
        }
    }
})

new Vue({
    el: '#dom-5',
    data: {
        color: 'khaki',
        width: 150,
    },
    computed: {
        myStyles: function () {
            return {
                backgroundColor: this.color,
                width: `${this.width}px`
            }
        }
    }
})