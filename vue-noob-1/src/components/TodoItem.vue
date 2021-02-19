<template>
	<div class="todo-item">
		<span
			v-on:click="markCompleted"
			v-bind:class="{ 'is-complete': todo.completed }"
			class="check"
		>
			<i class="far fa-check-circle"></i>
		</span>
		<p v-bind:class="{ 'is-complete': todo.completed }">{{ todo.title }}</p>
		<span @click="$emit('del-todo', todo.id)" class="delete">
			<i class="far fa-trash-alt"></i>
		</span>
	</div>
</template>

<script>
export default {
	name: 'TodoItem',
	props: ['todo'],
	methods: {
		markCompleted() {
			this.todo.completed = !this.todo.completed;
			this.$emit('markCompleted');
		},
	},
};
</script>

<style>
.todo-item {
	background: #fff;
	font-size: 20px;
	letter-spacing: 1.5px;
	padding: 0 10px;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 5px;
}
.todo-item:first-child {
	margin: 0;
}
.check {
	cursor: pointer;
	font-size: 25px;
	color: grey;
}
.delete {
	cursor: pointer;
	font-size: 25px;
	color: red;
}
p.is-complete {
	text-decoration: line-through;
}
.check.is-complete {
	color: #b2d42a;
}
</style>
