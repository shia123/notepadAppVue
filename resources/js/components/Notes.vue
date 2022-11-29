<template>
  <div class="container">
    <form action="">
      <textarea
        id=""
        cols="60"
        rows="10"
        :value="noteDetails"
        @input="$emit('update:noteDetails', $event.target.value)"
      ></textarea>
    </form>
  </div>
</template>
<script>
export default {
  props: ["noteDetails"],
  emits: ["update:noteDetails"],
};
</script>