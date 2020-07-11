<template>
	<div id="app">
		<nav class="py-1 navbar navbar-expand-lg navbar-dark bg-primary">
			<span class="navbar-brand mx-auto">Lyric Search App</span>
		</nav>
		<router-view />
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
* {
	font-family: 'Montserrat', sans-serif;
}
nav .navbar-brand {
	font-size: 1.5em;
	letter-spacing: 1px;
}
::-webkit-scrollbar {
	width: 0;
}
</style>
