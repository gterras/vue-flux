<template>
	<flux-grid
		ref="grid"
		:rows="rows"
		:cols="cols"
		:size="size"
		:images="images"
		:color="color"
		:depth="size.height"
		:css="gridCss"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'TransitionWave',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 1,
			cols: 8,
			tileDuration: 900,
			totalDuration: 0,
			easing: 'cubic-bezier(0.3, -0.3, 0.735, 0.285)',
			tileDelay: 110,
			sideColor: '#333',
			gridCss: {
				perspective: '1200px',
			},
			images: {},
			color: {},
		}),

		created() {
			this.totalDuration = this.tileDelay * this.cols + this.tileDuration;

			this.images = {
				front: this.from,
				top: this.to,
			};

			this.color = {
				left: this.sideColor,
				right: this.sideColor,
			};
		},

		mounted() {
			this.mask.overflow = 'visible';
		},

		played() {
			if (this.current)
				this.current.hide();

			this.$refs.grid.transform((tile, i) => {
				tile.setCss({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
				});

				tile.turnBottom();
			});
		},

		beforeDestroy() {
			if (this.current)
				this.current.show();
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			},
		},
	};
</script>
