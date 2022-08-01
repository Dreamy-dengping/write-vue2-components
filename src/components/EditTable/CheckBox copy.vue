<template>
  <div>
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    {{ text }}
  </div>
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: Boolean,
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less"></style>
