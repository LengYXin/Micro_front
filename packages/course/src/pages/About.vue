<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button
      type="primary"
      block
      @click="onToggleTime"
    ></a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";

@Component({
  components: {},
})
export default class PageView extends Vue {
  onToggleTime() {
    Modal.info({ content: "哈哈哈哈哈" });
  }
  mounted() {
    console.log(this);
  }
  updated() {
    console.log("updated");
  }
  destroyed() {}
}
</script>

<style>
</style>