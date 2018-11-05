<style lang="scss" scoped>
.base64-img {
	//   max-width: 100px;
	//   max-height: 100px;
	padding: 4px;
	img {
		max-width: 100px;
		max-height: 100px;
	}
}
</style>


<template>
    <div class="base64-img">
        <img v-if="value"
             :src="value"
             @click="handleClick">
        <Button v-else
                size="small"
                @click="handleClick">选择</Button>
        <input type="file"
               accept="image/jpeg,image/png"
               hidden
               ref="input"
               @change="handleChange">
    </div>
</template>

<script>
export default {
	props: {
		value: String,
	},
	methods: {
		handleClick() {
			this.$refs.input.click();
		},
		handleChange(e) {
			const file = e.target.files[0];
			const reader = new FileReader();

			//   reader.addEventListener(
			//     'load',
			reader.onload = () => {
				const img = new Image();
				img.src = reader.result;
				img.onload = () => {
					this.$emit("input", reader.result, img.width, img.height);
				};
			};
			//     false
			//   );

			if (file) {
				reader.readAsDataURL(file);
			}
		},
	},
};
</script>
