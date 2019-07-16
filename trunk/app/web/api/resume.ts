import fetch from '../common/fetch'
import qs from 'qs'


// 简历 - 获取列表
export const getResumeList = () => fetch('/per/resume', {}, 'get')
// 简历 - 获取完整简历
export const getResume = (resumeId: number) => fetch(`/per/resume/${resumeId}`, {}, 'get')
// 简历 - 修改名称
export const renameResume = (resumeId: number, resumeName: string) => fetch(`/per/resume/${resumeId}/resumeName`, qs.stringify({ resumeName: resumeName }), {
    method: 'put',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
// 简历 - 修改默认简历
export const setDetaultResume = (resumeId: number) => fetch(`/per/resume/${resumeId}/default`, {}, 'put')
// 简历 - 简历 - 删除
export const deleteResume = (resumeId: number) => fetch(`/per/resume/${resumeId}`, {}, 'delete')
// 简历 - 简历 - 添加(中/英)
export const addResume = (resumeId: number, data: object) => fetch(`/per/resume/${resumeId}`, qs.stringify(data), {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
// 简历 - 刷新简历
export const refreshResume = (data: refreshResume, resumeId: number) => fetch(`/per/resume/${resumeId}/freshness`, data, 'get')


// 简历基础信息 - 创建简历并新(新用户填写)
export const createResume = (resumeData: createResumeData) => fetch('/per/resume/basicInfo', resumeData, 'post')
// 简历 - 导出
export const exportResume = (resumeId: number, suffix: exportSuffix) => fetch(`/per/resume/${resumeId}/export`, { exportFormat: suffix }, 'get')
// 个人头像 - 上传
export const uploadPhoto = (data: object) => fetch('/per/photo', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post'
})


// 简历基础信息 - 获取
export const getBasicInfo = (resumeId: number) => fetch(`/per/resume/${resumeId}/basicInfo`, {}, 'get')
// 简历基础信息 - 修改
export const modifyBasicInfo = (resumeData: basicInfo) => fetch('/per/resume/basicInfo', resumeData, 'put')


// 简历求职意向 - 获取   ||  个人评价也调用此接口
export const getIntentInfo = (resumeId: number) => fetch(`/per/resume/${resumeId}/intentInfo`, {}, 'get')
// 简历求职意向 - 修改
export const modifyIntentInfo = (data: object) => fetch(`/per/resume/${data.id}/intentInfo`, data, 'put')
// 简历求职意向 - 新增
export const createIntentInfo = (data: object) => fetch(`/per/resume/${data.id}/intentInfo`, data, 'post')

// 简历教育经历 - 获取
export const getEducationInfo = (resumeId: number) => fetch(`/per/resume/${resumeId}/educationInfo`, {}, 'get')
// 简历教育经历 - 修改
export const modifyEducationInfo = (data: educationInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/educationInfo/${data.id}`, data, 'put')
// 简历教育经历 - 新增
export const createEducationInfo = (data: educationInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/educationInfo`, data, 'post')
// 简历教育经历 - 删除
export const deleteEducationInfo = (resumeId: number, eduId: number) => fetch(`/per/resume/${resumeId}/educationInfo/${eduId}`, {}, 'delete')


// 简历工作经历(实践经历) - 获取
export const getWorkInfo = (resumeId: number) => fetch(`/per/resume/${resumeId}/workInfo`, {}, 'get')
// 简历工作经历(实践经历) - 修改
export const modifyWorkInfo = (data: workInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/workInfo/${data.id}`, data, 'put')
// 简历教育经历 - 新增
export const createWorkInfo = (data: workInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/workInfo`, data, 'post')
// 简历工作经历(实践经历) - 删除
export const deleteWorkInfo = (resumeId: number, workId: number) => fetch(`/per/resume/${resumeId}/workInfo/${workId}`, {}, 'delete')

// 简历项目经历 - 获取
export const getProjectInfo = (resumeId: number) => fetch(`/per/resume/${resumeId}/projectInfo`, {}, 'get')
// 简历项目经历 - 修改
export const modifyProjectInfo = (data: projectInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/projectInfo/${data.id}`, data, 'put')
// 简历项目经历 - 新增
export const createProjectInfo = (data: projectInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/projectInfo`, data, 'post')
// 简历项目经历 - 删除
export const deleteProjectInfo = (resumeId: number, id: number) => fetch(`/per/resume/${resumeId}/projectInfo/${id}`, {}, 'delete')

// 简历技能特长 - 获取
export const getSkillInfo = (resumeId: number) => fetch(`/per/resume/${resumeId}/skillInfo`, {}, 'get')
// 简历技能特长 - 修改
export const modifySkillInfo = (data: skillInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/skillInfo/${data.id}`, data, 'put')
// 简历技能特长 - 新增
export const createSkillInfo = (data: skillInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/skillInfo`, data, 'post')
// 简历技能特长 - 删除
export const deleteSkillInfo = (resumeId: number, id: number) => fetch(`/per/resume/${resumeId}/skillInfo/${id}`, {}, 'delete')

// 简历培训经历 - 获取
export const getTrainInfo = (resumeId: number) => fetch(`/per/resume/${resumeId}/trainInfo`, {}, 'get')
// 简历培训经历 - 修改
export const modifyTrainInfo = (data: trainInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/trainInfo/${data.id}`, data, 'put')
// 简历培训经历 - 新增
export const createTrainInfo = (data: trainInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/trainInfo`, data, 'post')
// 简历培训经历 - 删除
export const deleteTrainInfo = (resumeId: number, id: number) => fetch(`/per/resume/${resumeId}/trainInfo/${id}`, {}, 'delete')

// 简历附件作品 - 获取
export const getAccessory = (resumeId: number) => fetch(`/per/resume/${resumeId}/accessory`, {}, 'get')
// 简历附件作品 - 修改
export const modifyAccessory = (data: accessory, resumeId: number) => fetch(`/per/resume/${resumeId}/accessory/${data.id}`, data, 'put')
// 简历附件作品 - 新增
export const createAccessory = (data: accessory, resumeId: number) => fetch(`/per/resume/${resumeId}/accessory`, data, 'post')
// 简历附件作品 - 删除
export const deleteAccessory = (resumeId: number, id: number) => fetch(`/per/resume/${resumeId}/accessory/${id}`, {}, 'delete')

// 上传附件
export const uploadFile = (type: 'per_certification' | 'per_attachment', file: any) => fetch(`/upload/${type}/up_file`, file, {
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post'
})
/* export const uploadFile = (type: 'per_certification' | 'per_attachment') => {
    let data = {
        url: `/api/upload/${type}/upload_file`,
        headers: {
            AppType: 'pc'
        }
    }
    return data
}
 */

// 简历证书信息 - 获取
export const getCertificate = (resumeId: number) => fetch(`/per/resume/${resumeId}/certificate`, {}, 'get')
// 简历证书信息 - 修改
export const modifyCertificate = (data: certificateInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/certificate/${data.id}`, data, 'put')
// 简历证书信息 - 新增
export const createCertificate = (data: certificateInfo, resumeId: number) => fetch(`/per/resume/${resumeId}/certificate`, data, 'post')
// 简历证书信息 - 删除
export const deleteCertificate = (resumeId: number, id: number) => fetch(`/per/resume/${resumeId}/certificate/${id}`, {}, 'delete')


// 培训推荐 - 课程推荐
export const trainRecommend = () => fetch(`/per/train/recommend`, {}, 'get')










