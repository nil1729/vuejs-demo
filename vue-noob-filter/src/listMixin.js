export const listMixin = {
    data() {
        return {
            input: "",
            items: [
                "C",
                "Cpp",
                "Python",
                "JavaScript",
                "Java",
                "Ruby",
                "Go",
                "ReactJS",
                "VueJS",
                "NodeJS"
            ]
        };
    },
    computed: {
        filteredList() {
            const vm = this;
            return this.items.filter(item => {
                if (item.toLowerCase().match(vm.input.toLowerCase())) return item;
            });
        }
    },
    created() {
        console.log('created() from List Mixin');
    }
};