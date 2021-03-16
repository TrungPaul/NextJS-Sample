import React from 'react'
import About from './index'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'mobx'

configure({ adapter: new Adapter() })

describle('Check render element', () => {
  it('should render one <div>', () => {
    const wrapper = shallow(<About />)
    expect(wrapper.find(div)).toHaveLength(1)
  })
})
