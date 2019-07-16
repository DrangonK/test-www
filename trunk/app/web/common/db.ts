import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
const adapter = new LocalStorage('ztDB')
export default low(adapter)
