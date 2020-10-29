/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-10-20 20:26:03
 * @modify date 2020-10-20 20:26:03
 * @desc 课程 感想
 */
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
@Component
export class MixinsCourseThoughts extends Vue {
    get Pagination() {
        return this.$store.$storeCourse.Details.Thoughts;
    }
    get id() {
        return this.$route.params.id;
    }
    get body() {
        return {
            courseId: this.id,
            courseType: 1,
        };
    }
    getComment(item) {
        return {
            content: item.content,
            avatar: item.userHeadUri,
            author: item.userNickName,
            time: item.createTime,
        };
    }
    async onSubmit(event) {
        try {
            await this.Pagination.onInstall({
                courseId: this.id,
                comment: event.html,
                commentNum: event.length,
                courseType: 1,
                scoreLevel: 1,
            });
            event.onReset();
            this.Pagination.onReset();
        } catch (error) {
            console.log("LENG: PageView -> onSubmit -> error", error);
        }
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}