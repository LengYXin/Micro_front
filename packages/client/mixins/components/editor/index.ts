// https://www.vue2editor.com/guide.html#installation
// import Quill from "quill";
import defaultToolbar from "./helpers/default-toolbar";
import oldApi from "./helpers/old-api";
import mergeDeep from "./helpers/merge-deep";
import markdown from "./helpers/markdown-shortcuts";
import lodash from "lodash";
// export * from "./toolbar";
export function MixinsComponentEdiror(Quill) {
    const MarkdownShortcuts = markdown(Quill)
    return {
        //   components: { toolbar },
        name: "VueEditor",
        mixins: [oldApi],
        props: {
            buttonText: {
                type: String,
            },
            rules: {
                type: Object,
                default: () => ({}),
            },
            id: {
                type: String,
                default: "quill-container",
            },
            placeholder: {
                type: String,
                default: "",
            },
            value: {
                type: String,
                default: "",
            },
            disabled: {
                type: Boolean,
            },
            editorToolbar: {
                type: Array,
                default: () => [],
            },
            editorOptions: {
                type: Object,
                required: false,
                default: () => ({}),
            },
            useCustomImageHandler: {
                type: Boolean,
                default: false,
            },
            useMarkdownShortcuts: {
                type: Boolean,
                default: false,
            },
        },
        data: () => ({
            quill: null,
            showFace: false
        }),
        watch: {
            value(val) {
                if (val != this.quill.root.innerHTML && !this.quill.hasFocus()) {
                    this.quill.root.innerHTML = val;
                }
            },
            disabled(status) {
                this.quill.enable(!status);
            },
        },
        mounted() {
            this.registerCustomModules(Quill);
            this.registerPrototypes();
            this.initializeEditor();
        },
        beforeDestroy() {
            this.quill = null;
            delete this.quill;
        },
        methods: {
            onSubmit(data) {
                this.$emit("submit", data);
            },
            onShowFace(showFace) {
                this.showFace = showFace;
            },
            initializeEditor() {
                this.setupQuillEditor();
                this.checkForCustomImageHandler();
                this.handleInitialContent();
                this.registerEditorEventListeners();
                this.$emit("ready", this.quill);
            },
            setupQuillEditor() {
                let editorConfig = {
                    debug: false,
                    modules: this.setModules(),
                    theme: "snow",
                    placeholder: this.placeholder ? this.placeholder : "",
                    readOnly: this.disabled ? this.disabled : false,
                };
                this.prepareEditorConfig(editorConfig);
                this.quill = new Quill(this.$refs.quillContainer, editorConfig);
            },
            setModules() {
                let modules = {
                    // LENG
                    // toolbar: this.editorToolbar.length
                    //   ? this.editorToolbar
                    //   : defaultToolbar,
                    toolbar: [],
                    // 只能写文字
                    clipboard: {
                        matchers: [
                            [
                                Node.ELEMENT_NODE,
                                (node, delta) => {
                                    if (
                                        delta &&
                                        delta.ops.some((item) => lodash.isObject(item.insert))
                                    ) {
                                        return { ops: [] };
                                    }
                                    delta.ops = lodash.map(delta.ops, (item) => {
                                        lodash.unset(item, "attributes");
                                        return item;
                                    });
                                    return delta;
                                },
                            ],
                        ],
                    },
                    // 只能写文字
                };
                if (this.useMarkdownShortcuts) {
                    Quill.register("modules/markdownShortcuts", MarkdownShortcuts, true);
                    modules["markdownShortcuts"] = {};
                }

                return modules;
            },
            prepareEditorConfig(editorConfig) {
                if (
                    Object.keys(this.editorOptions).length > 0 &&
                    this.editorOptions.constructor === Object
                ) {
                    if (
                        this.editorOptions.modules &&
                        typeof this.editorOptions.modules.toolbar !== "undefined"
                    ) {
                        // We don't want to merge default toolbar with provided toolbar.
                        delete editorConfig.modules.toolbar;
                    }
                    mergeDeep(editorConfig, this.editorOptions);
                }
            },
            registerPrototypes() {
                Quill.prototype.getHTML = function () {
                    return this.container.querySelector(".ql-editor").innerHTML;
                };
                Quill.prototype.getWordCount = function () {
                    return this.container.querySelector(".ql-editor").innerText.length;
                };
            },
            registerEditorEventListeners() {
                this.quill.on("text-change", this.handleTextChange);
                this.quill.on("selection-change", this.handleSelectionChange);
                this.listenForEditorEvent("text-change");
                this.listenForEditorEvent("selection-change");
                this.listenForEditorEvent("editor-change");
            },
            listenForEditorEvent(type) {
                this.quill.on(type, (...args) => {
                    this.$emit(type, ...args);
                });
            },
            handleInitialContent() {
                if (this.value) this.quill.root.innerHTML = this.value; // Set initial editor content
            },
            handleSelectionChange(range, oldRange) {
                if (!range && oldRange) this.$emit("blur", this.quill);
                else if (range && !oldRange) this.$emit("focus", this.quill);
            },
            handleTextChange(delta, oldContents) {
                if (!this.quill) {
                    return;
                }
                let editorContent =
                    this.quill.getHTML() === "<p><br></p>" ? "" : this.quill.getHTML();
                this.$emit("input", editorContent);
                if (this.useCustomImageHandler)
                    this.handleImageRemoved(delta, oldContents);
            },
            handleImageRemoved(delta, oldContents) {
                const currrentContents = this.quill.getContents();
                const deletedContents = currrentContents.diff(oldContents);
                const operations = deletedContents.ops;
                operations.map((operation) => {
                    if (operation.insert && operation.insert.hasOwnProperty("image")) {
                        const { image } = operation.insert;
                        this.$emit("image-removed", image);
                    }
                });
            },
            checkForCustomImageHandler() {
                this.useCustomImageHandler === true ? this.setupCustomImageHandler() : "";
            },
            setupCustomImageHandler() {
                let toolbar = this.quill.getModule("toolbar");
                toolbar.addHandler("image", this.customImageHandler);
            },
            customImageHandler(image, callback) {
                this.$refs.fileInput.click();
            },
            emitImageInfo($event) {
                //   const resetUploader = function () {
                //     var uploader = document.getElementById("file-upload");
                //     uploader.value = "";
                //   };
                //   let file = $event.target.files[0];
                //   let Editor = this.quill;
                //   let range = Editor.getSelection();
                //   let cursorLocation = range.index;
                //   this.$emit("image-added", file, Editor, cursorLocation, resetUploader);
            },
        },
    }
};