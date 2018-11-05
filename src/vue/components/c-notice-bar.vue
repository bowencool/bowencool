<style lang="scss">
.c-notice-bar {
  position: relative;
  height: 40px;
  line-height: 40px;
  background: #fffcee;
  overflow: hidden;
  .text {
    display: inline-block;
    position: absolute;
    left: 100%;
    white-space: nowrap;
    animation: moving 20s linear infinite;
  }
}

@keyframes moving {
  from {
    transform: translateX(0);
    left: 100%;
  }
  to {
    transform: translateX(-100%);
    left: 0;
  }
}
</style>

<template>
  <div class="c-notice-bar">

    <span class="text">
      <slot></slot>
    </span>

  </div>
</template>

<script>
export default {
  name: 'c-notice-bar',
};
</script>
