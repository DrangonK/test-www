// 搜索联想
import fetch from '../common/fetch'

// 联想 - 邮箱
export const fuzzyMatchEmail = (word: string) => fetch('/association/fuzzyMatchEmail', { word: word }, 'get')
// 联想 - 学校名
export const fuzzyMatchSchool = (word: string) => fetch('/association/fuzzyMatchSchool', { word: word }, 'get')
// 联想 - 专业名
export const fuzzyMatchSpecialty = (word: string) => fetch('/association/fuzzyMatchSpecialty', { word: word }, 'get')
// 联想 - 证书名称
export const fuzzyMatchCertificate = (word: string) => fetch('/association/fuzzyMatchCertificate', { word: word }, 'get')


