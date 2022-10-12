<template>
	<div class="loading-page">
		<div class="spinner"></div>
	</div>
</template>

<style lang="postcss" scoped>
div.loading-page {
	@apply w-full h-full bg-slate-900 flex justify-center items-center;
}

div.loading-page div.spinner {
	width: 8vmax;
	height: 8vmax;
	border-right: 4px solid #ffffff;
	border-radius: 100%;
	animation: spinRight 800ms linear infinite;
}

div.loading-page div.spinner:before,
div.loading-page div.spinner:after {
	content: "";
	width: 6vmax;
	height: 6vmax;
	display: block;
	position: absolute;
	top: calc(50% - 3vmax);
	left: calc(50% - 3vmax);
	border-left: 3px solid #ffffff;
	border-radius: 100%;
	animation: spinLeft 1000ms linear infinite;
}
div.loading-page div.spinner:after {
	width: 4vmax;
	height: 4vmax;
	top: calc(50% - 2vmax);
	left: calc(50% - 2vmax);
	border: 0;
	border-right: 2px solid #ffffff;
	animation: none;
}

@keyframes spinLeft {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(720deg);
	}
}

@keyframes spinRight {
	from {
		transform: rotate(360deg);
	}
	to {
		transform: rotate(0deg);
	}
}
</style>
