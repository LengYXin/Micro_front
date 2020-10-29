/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-10-20 20:26:03
 * @modify date 2020-10-20 20:26:03
 * @desc 课程 课时详情
 */
import { Component, Prop, Vue, Provide, Inject, Watch, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component
export class MixinsCourseClasshour extends Vue {
    @Prop({ default: () => ({}) }) classhour;
    get id() {
        // h5 query.id
        return this.$route.query.id || lodash.get(this.classhour, 'classhourId')//this.$route.params.id;
    }
    get CourseId() {
        // h5 query.course pc params.id
        return this.$route.query.course || this.$route.params.id;
    }
    tabPane = [
        { key: 1, title: "资料区" },
        { key: 2, title: "交作业" },
    ];
    activeKey = 1;
    get Details() {
        return this.PageStore.Details;
    }
    get PageStore() {
        return this.$store.$storeCourse.Details.Map;
    }

    get liveUrl() {
        const url = lodash.get(
            {
                development: `http://localhost:5000`,
                production: `/live`,
            },
            this.$store.$global.NODE_ENV
        );
        return `${url}?id=${this.id}`;
    }
    getPopupContainer() {
        return this.$refs.Container;
    }
    tabsChange(activeKey) {
        this.activeKey = activeKey;
    }
    async onLoading(classhourId) {
        if (classhourId) {
            this.activeKey = 1;
            this.Details.onLoading({ classhourId });
            this.Details.onGetMaterial(classhourId);
        }
    }
    getSize(size) {
        let str = "";
        if (size <= 1024) {
            return Math.round(size) + "B";
        } else if (size <= 1024 * 1024 && size > 1024) {
            return Math.round(size / 1024) + "KB";
        } else if (size > 1024 * 1024) {
            return (size / 1024 / 1024).toFixed(2) + "MB";
        }
    }
    // 作业按钮
    getSubmitText(homeworkSubmit, type) {
        switch (type) {
            case "text":
                return { "0": "未提交", "1": "已提交", "2": "已评阅" }[homeworkSubmit];
                break;
            case "button":
                return { "0": "交作业", "1": "查看", "2": "查看" }[homeworkSubmit];
                break;
        }
    }
    onToHomework(item) {
        console.log("PageView -> onToHomework -> item", item);
        // this.$router.push({
        //   path: "/homework",
        //   name: "homework-id",
        //   params: { id: item.homeworkAssignId },
        //   query: { classhourId: item.classhourId, courseId: item.courseId },
        // });
        // this.Details.dataSource
        this.$router.push({
            path: "/homework/" + item.homeworkAssignId,
            query: {
                classhourId: this.Details.dataSource.classhourId,
                courseId: this.CourseId,
            },
        });
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}