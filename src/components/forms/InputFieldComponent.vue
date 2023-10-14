<template>
  <!--INPUT FIELD-->
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control has-icons-left has-icons-right">
      <input
          :value="value"
          @input="$emit('update', $event.target.value)"
          :class="['input', { 'is-success': success, 'is-danger': error }]"
        :type="type"
        :placeholder="placeholder"
      >
      <span class="icon is-small is-left">
        <i :class="[iconType, icon]"></i>
      </span>
      <span v-if="success || error" class="icon is-small is-right">
        <i :class="[iconType, {'fa-check': success, 'fa-danger': error}]"></i>
      </span>
    </div>
    <p v-if="success" class="help is-success">{{ message }}</p>
    <p v-if="error" class="help is-danger">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
      required: true
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      required: true
    },
    iconType: {
      type: String
    },
    icon: {
      type: String
    },
    success: {
      type: Boolean,
      default: false,
      required: true
    },
    error: {
      type: Boolean,
      default: false,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    hint: String
  },
  emits: ["update"],
}

</script>

<style scoped>

</style>
