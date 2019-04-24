import { POST } from '@/api'

export function fetchAllData(fullName, monitorTitle) {
  return POST('baBizUnit/updateByTitle.do', { fullName, monitorTitle })
}
