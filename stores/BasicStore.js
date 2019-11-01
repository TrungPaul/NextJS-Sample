import { action } from 'mobx'

export class BasicStore {
  @action setter = (propertyname, value) => {
    this[propertyname] = value
  }

  @action toggle = propertyname => {
    let target = this[propertyname] ? false : true
    this[propertyname] = target
  }
}

export default new BasicStore()
