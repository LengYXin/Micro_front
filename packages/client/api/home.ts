/*
 * @Author: Erlin
 * @CreateTime: 2020-10-12 19:24:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-10-14 14:38:31
 * @Description:首页 api 枚举
 */

export enum EnumApiHome {
  /** 轮播图 */
  Banner = "/carouselimg/list",
  Banner_method = "post",
  H5Banner = "/carouselimg/listforweb",
  /**
   * 获取同学作业列表
   */
  ProductList = "/production/list",
  /**
   * 同学作业点赞
   */
  ProductLike = "/production/praise",
}
