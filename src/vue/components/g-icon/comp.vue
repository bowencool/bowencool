<template functional>
  <i class="g-icon anticon" :class="`g-icon-${props.type}`">
    <svg aria-hidden="true" :style="{color: props.color}">
      <use :xlink:href="`#icon-${props.type}`" />
    </svg>
  </i>
</template>

<style lang="scss">
.g-icon svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
  //  display: inline-block;
  // font-style: normal;
  // vertical-align: -0.125em;
  // text-align: center;
  // text-transform: none;
  // line-height: 0;
  // text-rendering: optimizeLegibility;
  // -webkit-font-smoothing: antialiased;
}

</style>
