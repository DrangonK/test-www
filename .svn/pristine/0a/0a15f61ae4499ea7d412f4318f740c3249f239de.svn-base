
import { Application } from 'egg'

/**
 * @param {Egg.Application} app - egg application
 */
export default (application: Application) => {
    const { router, controller } = application
    // router.all('/api/(.+)?', controller.api.api.index);
    // router.get('/resume/view/:resumeIds', controller.resume.resume.index);
    // router.get('/resume/view/export/:resumeId', controller.resume.resume.export);
    router.get('/resume/view/exportPer/:resumeId', controller.resume.resume.exportPer)
    // router.get('/(.+)?', controller.app.app.index);
    router.get('/per/(.*)?', controller.app.app.index)
    router.get('/(.*)?', controller.app.app.index)
}
