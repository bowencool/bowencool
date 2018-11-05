<script>
import { parseBarcode } from "./core";
export default {
	props: {
		value: {
			type: String,
			default: "null",
		},
		color: {
			type: String,
			default: "#000",
		},
		background: {
			type: String,
			default: "transparent",
		},
	},
	mounted() {
		const bars = parseBarcode(this.value);
		//   console.log(bars);
		const string = bars.join("");
		let html = "";
		for (let pos = 0; pos < string.length; pos += 2) {
			html += `<div class="bar${string.charAt(pos)} space${string.charAt(
				pos + 1
			)}"></div>`;
		}
		this.$el.innerHTML = html;
	},
};
</script>

 <template>
  <div
    class="barcode"
    :style="{ background, color }"
  >
  </div>
</template>

<style lang="scss">
.barcode {
  display: inline-block;
  height: 100%;
  min-height: 30px;
  width: 100%;
  text-align: center;
  [class^="bar"] {
    display: inline-block;
    height: 100%;
  }
  @for $i from 1 through 4 {
    .bar#{$i} {
      border-left: #{$i}px solid;
    }
    .space#{$i} {
      margin-right: #{$i}px;
    }
  }
}
</style>
