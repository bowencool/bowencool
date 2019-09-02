<style lang="scss">
$size: 4px;
$left-bg-color: #f5f5f5;
$right-bg-color: #1890ff;
.c-bubble {
  & + & {
    margin-top: 10px;
  }
  &__title {
    font-size: 14px;
    color: #999;
  }
  &__content {
    position: relative;
    padding: 16px 25px;
    width: max-content;
    max-width: 65%;
    border-radius: 6px;
    word-break: break-word;
    white-space: pre-wrap;
    &::after {
      /* content: ''; */
      box-sizing: border-box;
      display: inline-block;
      width: 0;
      height: 0;
      position: absolute;
      bottom: 0;
      border: $size solid;
    }
  }
  &--left {
    margin-left: $size * 2;
    // margin-right: auto;
    .c-bubble__content {
      border-bottom-left-radius: 0;
      background-color: $left-bg-color;
      &:after {
        content: '';
        left: -2 * $size;
        border-color: $left-bg-color;
        border-left-color: transparent;
        border-top-color: transparent;
      }
    }
  }
  &--right {
    margin-right: $size * 2;
    // margin-left: auto;
    .c-bubble__title {
      text-align: right;
    }
    .c-bubble__content {
      float: right;
      border-bottom-right-radius: 0;
      background-color: $right-bg-color;
      color: #fff;
      &:after {
        content: '';
        right: -2 * $size;
        border-color: $right-bg-color;
        border-right-color: transparent;
        border-top-color: transparent;
      }
    }
  }
}
</style>

<template>
  <div
    class="c-bubble g-clr"
    :class="`c-bubble--${pos}`"
  >
    <div
      class="c-bubble__title"
      v-if="title"
    >{{ title }}</div>
    <div class="c-bubble__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pos: {
      type: String,
      default: 'left',
    },
    title: String,
  },
};
</script>
