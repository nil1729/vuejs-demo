const createLogs = (yourPower, monsterPower, myHeal) => {
    return [{
            color: '#e05f5fb6',
            msg: `Monster hits player for ${monsterPower}`
        },
        {
            color: 'rgba(170, 240, 170, 0.589)',
            msg: yourPower ? `Player hits Monster for ${yourPower}` : `Player heals himself for ${myHeal}`
        }
    ];
};


new Vue({
    el: '#app',
    data: {
        monsterHealth: 100,
        yourHealth: 100,
        startGameShow: true,
        logs: []
    },
    computed: {
        show: function () {
            return this.logs.length > 0;
        }
    },
    watch: {
        yourHealth: function () {
            if (this.yourHealth <= 0) {
                alert('You Lost! Do you play Again ?');
                this.resetGame();
            }
        },
        monsterHealth: function () {
            if (this.monsterHealth <= 0) {
                alert('You Win! Do you play Again ?');
                this.resetGame();
            }
        }
    },
    methods: {
        resetGame: function () {
            this.monsterHealth = 100;
            this.yourHealth = 100;
            this.startGameShow = true;
            this.logs = [];
        },
        attack: function () {
            const yourPower = Math.ceil(Math.random() * 8);
            const monsterPower = Math.ceil(Math.random() * 13);

            const logs = createLogs(yourPower, monsterPower);
            this.logs = [...this.logs, ...logs];

            this.yourHealth -= monsterPower;
            this.monsterHealth -= yourPower;
            scrollDown();
        },
        spclAttack: function () {
            const yourPower = Math.ceil(Math.random() * 13);
            const monsterPower = Math.ceil(Math.random() * 13);

            const logs = createLogs(yourPower, monsterPower);
            this.logs = [...this.logs, ...logs];
            this.yourHealth -= monsterPower;
            this.monsterHealth -= yourPower;

            scrollDown();
        },
        heal: function () {
            if (this.yourHealth < 100) {
                const myHeal = Math.ceil(Math.random() * 10);
                const monsterPower = Math.ceil(Math.random() * 10);


                if ((this.yourHealth + myHeal) <= 100) {
                    this.yourHealth += (myHeal - monsterPower);
                } else {
                    return;
                }
                const logs = createLogs(null, monsterPower, myHeal);
                this.logs = [...this.logs, ...logs];
                scrollDown();
            }
        }
    }
});

const scrollDown = () => {
    const el = document.querySelector('.list-group');
    if (el) {
        el.scrollTop = el.scrollHeight;
    }
}