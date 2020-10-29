import { registerMicroApps, addGlobalUncaughtErrorHandler, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
const production = process.env.NODE_ENV === 'production';
export default (props: any, container: HTMLDivElement, onLoading: (loader: Boolean) => void) => {
    addGlobalUncaughtErrorHandler(error => {
        console.log("LENG: error", error)
    })
    try {
        registerMicroApps(
            [
                {
                    name: 'xt_course',
                    entry: onEntry('course', 8001),
                    activeRule: '/course',
                    container: container,
                    props: props,
                    loader: onLoading,
                },
            ],
            {
                //   beforeLoad: [
                //     app => {
                //       console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
                //     },
                //   ],
                //   beforeMount: [
                //     app => {
                //       console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
                //     },
                //   ],
                //   afterUnmount: [
                //     app => {
                //       console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
                //     },
                //   ],
            },
        );
        start({ prefetch: false });
    } catch (error) {
        console.log("LENG: error", error)
    }
}
function onEntry(name, locaPort) {
    return production ? `${window.location.origin}/childrens/${name}?t=${Date.now()}` : `//localhost:${locaPort}`
}