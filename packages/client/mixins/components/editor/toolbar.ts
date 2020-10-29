/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-10-20 20:25:30
 * @modify date 2020-10-20 20:25:30
 * @desc 富文本 扩展 
 */
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component({
    components: {},
})
export class MixinsComponentEdirorToolbar extends Vue {
    // 富文本 
    @Prop() quill;
    // 按钮文案
    @Prop({ default: "发布" }) buttonText;
    // 校验规则
    @Prop({}) rules;
    // 最大文件数量
    @Prop({ default: 9 }) maxFile;
    // 文件列表
    fileList = [];
    // 显示 上传按钮
    get disabled() {
        return this.fileList.length >= this.maxFile;
    }
    get max() {
        return lodash.get(this.rules, "max", 2000);
    }
    // 添加表情
    onAddFace(face) {
        this.quill.insertText(
            this.quill.getSelection() || this.quill.getLength() - 1,
            face.value
        );
        this.quill.scrollIntoView();
    }
    // 文本长度
    getLength() {
        try {
            if (this.quill) {
                return this.quill.getLength() - 1;
            }
        } catch (error) {
            console.log("LENG: extends -> getLength -> error", error);
        }
        return 0;
    }
    // 提交校验
    onSubmitRules() {
        try {
            // 必填内容
            const required = lodash.get(this.rules, "required", false);
            //  必填文件
            const requiredFile = lodash.get(this.rules, "requiredFile", false);
            // 最大数
            const max = this.max;
            // 自定义校验 函数
            const validator = lodash.get(this.rules, "validator", () => true);
            const fileList = lodash.cloneDeep(this.fileList);
            const data = {
                fileList: fileList,
                fileResult: lodash.map(fileList, "response.result"),
                text: this.quill.getText(),
                html: this.getLength() ? this.quill.getHTML() : "",
                length: this.getLength(),
                quill: this.quill,
                /** 重置内容 */
                onReset: () => {
                    this.quill.root.innerHTML = "";
                    this.fileList = [];
                },
            };
            console.log("LENG: extends -> onSubmitRules -> data", data);
            if (required) {
                if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.text)) {
                    if (data.fileList.length === 0) {
                        throw "内容必填";
                    }
                }
            }
            if (max != Number.MAX_SAFE_INTEGER) {
                if (data.length > max) {
                    throw "超过最大长度";
                }
            }
            if (requiredFile) {
                if (data.fileList.length === 0) {
                    throw "请上传图片";
                }
            }
            if (lodash.some(data.fileList, ["status", "uploading"])) {
                throw "图片还在上传中";
            }

            if (validator(data, this.rules)) {
                this.onSubmit(data);
            }
        } catch (error) {
            this.$msg(error, "warning")
        }
    }
    @Emit("submit")
    onSubmit(event) {
        return event;
    }
    onRemove(file) {
        const fileList = [...this.fileList];
        lodash.remove(fileList, ["uid", file.uid]);
        this.fileList = fileList;
    }
    onNineChange(fileList) {
        this.fileList = fileList;
    }
    updated() { }
    destroyed() { }
}