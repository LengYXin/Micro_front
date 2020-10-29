/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 表情
 */
<template>
  <div>
    <ckeditor
      :editor="options.editor"
      :config="options.editorConfig"
      v-model="options.editorData"
      @ready="onReady"
    ></ckeditor>
  </div>
</template>

<script lang="ts">
import lodash from "lodash";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
@Component({
  components: {
    ckeditor: CKEditor.component,
  },
})
export default class extends Vue {
  options = {
    editor: DecoupledEditor,
    editorConfig: {},
    editorData: "<p>Content of the editor.</p>",
  };
  onReady(editor) {
    // Insert the toolbar before the editable area.
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style>
/* .ck-editor__editable {
  min-height: 400px;
} */
 /* .cke5-decoupled-document-editable {
    padding: 5rem 0;
    max-height: 700px;
    overflow-y: auto;
} */
.ck-content.ck-editor__editable {
  width: calc(21cm + 2px);
  min-height: calc(29.7cm + 2px);
  margin: 0 auto;
  margin-top: 1rem;
  padding: 2cm 1.2cm;
  border: 1px #d3d3d3 solid;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>