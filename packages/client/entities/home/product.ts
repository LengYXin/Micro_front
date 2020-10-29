/*
 * @Author: Erlin
 * @CreateTime: 2020-09-01 18:28:10
 * @LastEditors: Erlin
 * @LastEditTime: 2020-10-14 14:41:42
 * @Description: 同学作业
 */
import { BindAll } from "lodash-decorators"
import { EnumApiHome } from "../../api"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { Pagination } from "../basics/pagination"
import { EnumMessage } from "../../languages"

/**
 * 同学作业
 * @export
 * @class ControllerProduct
 * @extends {Pagination<any>}
 */
@BindAll()
export class ControllerProduct extends Pagination<any> {
  constructor($ajax: AjaxBasics) {
    super($ajax, {
      url: EnumApiHome.ProductList,
      key: "productionId",
      onMapValues: "productionResponseVos",
      method: "post",
      infinite: true,
      //   defaultCurrent: 1,
      //   defaultPageSize: 20,
      currentKey: "pageIndex",
    })
  }
  /**
   * 点赞
   * @param data
   */
  async onLikes(data) {
    if (data.isLiked) {
      throw EnumMessage.like_error
    }
    await this.$ajax.post(EnumApiHome.ProductLike, {
      productionId: data.productionId,
    })
    this.onUpdate(data, (old) => {
      old.likeNum++
      old.isLiked = true
      return old
    })
  }
}
export default ControllerProduct
