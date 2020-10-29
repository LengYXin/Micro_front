/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-10-20 20:26:03
 * @modify date 2020-10-20 20:26:03
 * @desc 课程 晒作业
 */
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
@Component
export class MixinsCourseSunDrying extends Vue {
    get PageStore() {
        return this.$store.$storeHomework;
    }
    get Pagination() {
        return this.PageStore.SunDrying;
    }
    get id() {
        return this.$route.params.id;
    }
    get body() {
        return { singleCourseId: this.id };
    }
    // 回复
    reply = {};
    /**
     * 回复
     */
    onReply(data) {
        if (data && data.id) {
            try {
                this.$InspectUser();
                this.onAddbrowsenum(data);
                this.reply = data;
            } catch (error) { }
        } else {
            this.reply = {};
        }
    }

    isLink(item) {
        return item.likeRecord ? "like" : "like-o";
    }
    getComment(item) {
        return {
            content: item.content,
            avatar: item.userHeader,
            author: item.userNickname,
            time: item.createTime,
            bishan: item.bishanNum,
            imgs: item.momentPicturelist,
        };
    }
    async onSubmit(event) {
        try {
            await this.Pagination.onInstall({
                singleCourseId: this.id,
                content: event.html,
                contentLength: event.length,
                picturesUrlList: event.fileResult,
                userType: 1,
            });
            event.onReset();
            this.Pagination.onReset();
            // this.$msg(this.$EnumMessage.sundrying_success);
        } catch (error) {
            console.log("LENG: PageView -> onSubmit -> error", error);
        }
    }
    onAddbrowsenum(item) {
        this.Pagination.onAddbrowsenum(item.id);
    }
    /**
     * 删除
     */
    async onDelete(item) {
        try {
            await this.Pagination.onDeleteMoment(item.id);
            this.onReply({});
        } catch (error) { }
    }
    async onLikes(item) {
        try {
            await this.Pagination.onLikes(item);
        } catch (error) {
            this.$msg(error);
        }
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}