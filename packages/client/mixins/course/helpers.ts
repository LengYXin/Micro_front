/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-10-20 20:26:03
 * @modify date 2020-10-20 20:26:03
 * @desc 课程 课时详情
 */
import { Component, Prop, Vue, Provide, Inject, Watch, Emit } from "vue-property-decorator";
import { EnumMessage } from '../../languages';
import lodash from "lodash";
@Component
export class MixinsCourseHelpers extends Vue {
    CourseHelpers = {
        /**
         * 检查课程权限
         */
        onCheck: (dataSource) => {
            console.log("LENG: MixinsCourseHelpers -> dataSource", dataSource)
            try {
                this.$InspectUser()
            } catch (error) {
                throw undefined
            }
            if (dataSource.courseOver) {
                throw EnumMessage.course_end_of_class
            }
            if (!dataSource.purchased) {
                throw EnumMessage.course_not_registered
            }
            return true
        }
    }
}