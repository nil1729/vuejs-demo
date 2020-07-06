<template>
	<div id="app">
		<div class="header">
			<h1>todo list app</h1>
		</div>
		<div class="main-body">
			<Todos
				v-bind:todos="todos"
				v-on:clearTodos="clearTodos"
				v-on:del-todo="deleteTodo"
				v-on:markCompleted="markCompleted"
			/>
			<AddTodo v-on:addTodo="addTodo" />
		</div>
	</div>
</template>

<script>
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
const saveData = data => {
	localStorage.setItem('TODOS', JSON.stringify(data));
};
const loadData = () => {
	try {
		return JSON.parse(localStorage.getItem('TODOS'));
	} catch (e) {
		console.log(e);
		return [];
	}
};
export default {
	name: 'App',
	components: {
		Todos,
		AddTodo,
	},
	data() {
		return {
			todos: loadData() ? loadData() : [],
		};
	},
	methods: {
		markCompleted() {
			saveData(this.todos);
		},
		deleteTodo(id) {
			this.todos = this.todos.filter(todo => todo.id !== id);
			saveData(this.todos);
		},
		addTodo(newTodo) {
			this.todos = [newTodo, ...this.todos];
			saveData(this.todos);
		},
		clearTodos() {
			this.todos = [];
			saveData(this.todos);
		},
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	text-transform: capitalize;
}
::selection {
	color: #fff;
	background: #9194ab;
}
body {
	background-color: #9194ab;
	font-family: 'Jost', sans-serif;
}
.header h1 {
	text-align: center;
	color: #fff;
	font-size: 36px;
	font-weight: 300;
	letter-spacing: 2px;
}
.main-body {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
