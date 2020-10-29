import { onCreateRootStore } from '@xt/client/store';
import { message } from 'ant-design-vue';
import lodash from 'lodash';
const root = onCreateRootStore();
root.onResetAjaxBasics((error) => {
  message.error({ content: lodash.get(error, 'response.msg', error.message), key: 'message' })
})
root.onCreatePersist()
export const ajax = root.ajax;
export default root.RootSrore;