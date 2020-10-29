/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-10-20 20:25:53
 * @modify date 2020-10-20 20:25:53
 * @desc 课程地图页
 */
import { Component, Prop, Vue, Provide, Mixins } from "vue-property-decorator";
import lodash from "lodash";
import { MixinsCourseHelpers } from "./helpers";
@Component
export class MixinsCourseMap extends Mixins(MixinsCourseHelpers) {
    get id() {
        return this.$route.params.id;
    }
    get Details() {
        return this.$store.$storeCourse.Details;
    }
    get PageStore() {
        return this.$store.$storeCourse.Details.Map;
    }
    // 模板类
    get template() {
        return "xt-cc-template-" + this.Details.dataSource.tempNum;
    }
    // 背景图
    get bgSrc() {
        return `/template/${this.Details.dataSource.tempNum}.png`;
    }
    get isReview() {
        return true;
    }
    getMapList(list) {
        return lodash.filter(list, "classhourName");
    }
    // 笔山列表
    getTask(item) {
        if (item && item.homeworkTaskList) {
            return lodash.concat(
                [
                    {
                        hasCompleted: false,
                        homeworkTaskId: -1,
                        homeworkTitle: "观看直播",
                        homeworkType: 1,
                        homeworkTypeDesc: "观看直播",
                    },
                ],
                item.homeworkTaskList
            );
        }
        return [];
    }
    // 路径地址
    getLineSrc(index) {
        const path = lodash.get(
            { 10: "ten", 20: "twenty" },
            this.Details.dataSource.tempNum
        );
        if (index <= this.Details.dataSource.tempNum && path) {
            return `/template/${path}/${index}.png`;
        }
    }
    onLoading(courseId) {
        this.PageStore.onReset();
        this.PageStore.onLoading({ courseId });
    }
    onToReview() {
        try {
            this.CourseHelpers.onCheck(this.Details.dataSource)
            this.$router.push({
                name: "course-review",
                query: { id: this.id },
            });
        } catch (error) {
            this.$msg(error);
        }
    }
    onToClasshour(item) {
        try {
            this.CourseHelpers.onCheck(this.Details.dataSource)
            this.$router.push({
                name: "course-classhour",
                query: { id: item.classhourId, course: this.id },
            });
        } catch (error) {
            this.$msg(error);
        }
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}