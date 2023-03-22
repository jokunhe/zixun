import { makeAutoObservable } from 'mobx'

export class basicSotre {
  constructor() {
    makeAutoObservable(this)
  }
  token = {}
  mineData = {}
  lookTime = null
}

export default new basicSotre()
