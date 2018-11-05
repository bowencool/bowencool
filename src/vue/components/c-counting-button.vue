<template>
  <a-button
    v-bind="$attrs"
    @click="handleClick"
    :disabled="remaining > 0"
    :loading="loading"
  >
    <slot
      v-if="remaining > 0"
      name="counting"
      :remaining="remaining"
    >{{ remaining }}s</slot>
    <slot v-else>Start</slot>
  </a-button>
<!-- 使用示例:
  <c-counting-button
    @click="fn"
    :seconds="3"
    block
  >
    发送验证码
    <template
      slot="counting"
      slot-scope="{ remaining }"
    >
      重新发送({{ remaining }}秒)
    </template>
  </c-counting-button>
 -->
</template>

<script>
/**
 * @author zhaobowen<z.bowen66@gmail.com>
 * @description 倒计时按钮，常用于发送验证码
 * @param {Number} [seconds=60] 倒计时的事件（秒）
 * @param {Function<Promise|void>} [onClick] 点击事件处理函数。如果返回promise，则resolve后自动开始计时，否则立即开始；支持接口返回剩余秒数
 */
export default {
  props: {
    seconds: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      remaining: 0,
      loading: false,
    };
  },
  methods: {
    handleClick(e) {
      if (!this.$listeners.click) return;
      const p = this.$listeners.click.fns(e);
      if (p instanceof Promise) {
        this.loading = true;
        p.then(() => {
          this.start();
        }).catch(err => {
          console.log(err && err.response);
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.data &&
            err.response.data.data.leftTime !== undefined
          ) {
            console.log(err.response.data.data.leftTime);
            this.start(err.response.data.data.leftTime);
          } else {
            this.loading = false;
          }
        });
      } else {
        this.start();
      }
    },
    start(seconds = this.seconds) {
      clearInterval(this.timerId);
      this.loading = false;
      this.remaining = +seconds;
      this.timerId = setInterval(() => {
        this.remaining--; //
        if (this.remaining <= 0) {
          clearInterval(this.timerId);
        }
      }, 1000);
    },
  },
  destroyed() {
    clearInterval(this.timerId);
  },
};
</script>
