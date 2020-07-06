<template>
	<div class="addTodo">
		<form @submit="handleSubmit">
			<input
				name="title"
				v-model="title"
				id="text-input"
				type="text"
				placeholder="Add Todo"
			/>
			<button type="submit">
				<i class="fas fa-plus-circle"></i>
			</button>
		</form>
	</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
	name: 'AddTodo',
	data() {
		return {
			title: '',
		};
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			if (this.title.trim().length === 0) {
				return;
			}
			const newTodo = {
				id: uuidv4(),
				title: this.title,
				completed: false,
			};
			this.title = '';
			this.$emit('addTodo', newTodo);
		},
	},
};
</script>

<style scoped>
.addTodo {
	border: 2px solid aliceblue;
	width: 23rem;
	padding: 3px;
	height: 3rem;
	margin-top: 10px;
}
.addTodo form {
	height: 100%;
	display: flex;
	justify-content: center;
}
.addTodo form #text-input {
	width: 100%;
	margin-right: 5px;
	outline: none;
	border: none;
	padding: 5px;
	border: 1px solid #7d87e3;
	font-size: 18px;
	letter-spacing: 1px;
	font-family: 'Jost', sans-serif;
}
.addTodo form button {
	background: #9194ab;
	cursor: pointer;
	width: 25px;
	font-size: 25px;
	color: white;
	outline: none;
	border: none;
}
</style>
