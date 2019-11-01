import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import CustomLayout from './../components/CustomLayout.js'

@observer
class test extends React.Component {
  render() {
    // eslint-disable-next-line
    return (
      <div className="test-wr">
        <CustomLayout
          activeNavLinkKey="2"
          breadcrumbItems={['Home', 'Test']}
          titlePage="Test"
        >
          <div>
            <h2>Test</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
              itaque recusandae at molestiae temporibus id voluptate quia
              architecto iste voluptatem eligendi ad natus labore ut vitae
              impedit, ducimus corrupti asperiores nihil consequuntur illo,
              quidem sit. Alias quaerat provident impedit unde neque repellendus
              exercitationem perspiciatis, facere quas quam assumenda quae eius
              adipisci cumque error architecto atque nobis. Dolor iste,
              voluptate, numquam deleniti temporibus, blanditiis veniam ex
              maxime minus atque a veritatis harum fugit maiores, cumque!
              Doloremque dignissimos neque similique voluptatem, aliquid odio
              obcaecati deserunt ab eveniet rem in voluptates, consequuntur
              temporibus officia accusantium illo sequi esse quidem distinctio
              recusandae consectetur perspiciatis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
              itaque recusandae at molestiae temporibus id voluptate quia
              architecto iste voluptatem eligendi ad natus labore ut vitae
              impedit, ducimus corrupti asperiores nihil consequuntur illo,
              quidem sit. Alias quaerat provident impedit unde neque repellendus
              exercitationem perspiciatis, facere quas quam assumenda quae eius
              adipisci cumque error architecto atque nobis. Dolor iste,
              voluptate, numquam deleniti temporibus, blanditiis veniam ex
              maxime minus atque a veritatis harum fugit maiores, cumque!
              Doloremque dignissimos neque similique voluptatem, aliquid odio
              obcaecati deserunt ab eveniet rem in voluptates, consequuntur
              temporibus officia accusantium illo sequi esse quidem distinctio
              recusandae consectetur perspiciatis.
            </p>
          </div>
        </CustomLayout>
      </div>
    )
  }
}

export default test
