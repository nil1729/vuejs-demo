<template>
	<div>
		<div class="todos">
			<div class="time">
				<span @click="$emit('clearTodos')">
					<i class="fas fa-sync"></i>
				</span>
				<p>{{ today }}</p>
			</div>
			<div class="container">
				<TodoItem
					v-bind:key="todo.id"
					v-for="todo in todos"
					v-bind:todo="todo"
					v-on:del-todo="$emit('del-todo', todo.id)"
					v-on:markCompleted="$emit('markCompleted')"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import TodoItem from './TodoItem';
const Month = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const d = new Date();
const y = d.getFullYear();
const m = d.getMonth();
const day = d.getDate();
export default {
	name: 'Todos',
	props: ['todos'],
	components: {
		TodoItem,
	},
	data() {
		return {
			today: `${day} ${Month[m]} ${y}`,
		};
	},
};
</script>

<style scoped>
.todos {
	width: 23rem;
	position: relative;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	border: 2px solid aliceblue;
}
.todos .time {
	position: relative;
	color: aliceblue;
	background: url('../assets/bg.jpg');
	background-position: center;
	background-size: cover;
	padding: 10px;
	height: 10rem;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	font-size: 25px;
	letter-spacing: 1.5px;
}
.todos .time span {
	position: absolute;
	top: 5px;
	right: 5px;
	cursor: pointer;
	transition: ease-in-out 0.3s;
}
.todos .time span:hover {
	transform: rotateZ(60deg);
}
.todos .container {
	position: relative;
	overflow-y: scroll;
	height: 22rem;
	padding: 5px;
	background-color: rgb(163, 136, 100);
}
.container::-webkit-scrollbar {
	width: 0px;
}
</style>
