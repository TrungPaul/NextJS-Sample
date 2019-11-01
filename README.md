# Giới thiệu

Template cho frontend sử dụng Next.js + Mobx
Các thành phần có trong template

- Tính năng login, register, logout (sử dụng cookie)
- Setup thư viện quản lý state: mobx với nhiều store
- Layout gồm header, breadcumb ,phần content, footer
- Một phần quản lý user để làm sample cho một trang CRUD (create, read, update, delete)
- File helpers/index.js chứa các hàm tiện ích để thực hiện các việc thường gặp như - Thông báo tác vụ thành công hay gặp lỗi (ví dụ: tạo người dùng thành công hay thất bại) - format number dưới dạng có phân cách dấu phảy - Xác nhận trước khi thực hiện một tác vụ quan trọng (ví dụ: xóa người dùng) - Format ngày tháng

# Installation

Install and start an development server ([http://localhost:5001/](http://localhost:5001/))

```sh
$ npm install
$ npm run dev
```

Start an production server ([http://localhost:3000/](http://localhost:3000/))

```sh
$ npm run build
$ npm run start
```

# Cách sử dụng

## Next.js

### Routing

#### Cách tạo trang thường

Tạo một trang bằng cách tạo một file .js trong thư mục pages/
Ví dụ:
Tạo file pages/about.js sẽ tạo thành một route /about
Tạo file pages/info/backend.js sẽ tạo thành một route /info/backend

#### Cách tạo trang dynamic

Là những trang như /users/23, /users/30, /users/edit/23
Tạo file pages/users/[id].js
Tạo file pages/users/edit/[id].js

#### Tạo link đến một trang thường

import Link from 'next/link'

<Link href="/users">
<a> ... </a>
</Link>
Trong dấu "..." có thể là text hoặc là một component như <Button>
#### Tạo link đến một trang dynamic
Làm theo cách sau thì khi click vào link page sẽ không cần tải lại (không cần gửi request mới đến server)
<Link href="/users/[id]" as={`/users/${id}`}>
  <a> ... </a>
</Link>
#### Chuyển hướng đến một trang thường
import Router from 'next/router'
Router.push('/users')

#### Chuyển hướng đến một trang dynamic

Làm theo cách sau thì khi chuyển hướng sẽ không cần tải lại (không cần gửi request mới đến server)
Router.push('/users/[id]', `/users/${id}`)

### Hàm getInitialProps

Thường lấy thông tin về token (nếu là dynamic page thì lấy thêm các params)
Bắt buộc phải return một object (dù là rỗng)
Ta có thể truy cập vào thuôc tính trong object này bằng cách dùng this.props.[tenthuoctinh]

component.getInitialProps = async ctx => {
let token = (await auth(ctx)) || null
return { id: ctx.query.id, token }
}

### Bảo mật các trang cần authenticated

Trong hàm getInitialProps
component.getInitialProps = async ctx => {
let token = (await auth(ctx)) || null
return { token }
}
chú ý: auth là một hàm trong thư mục utils,
Nếu chưa login, hàm này sẽ chuyển hướng request sang trang login
Nếu login rồi, trả về token.

### Dùng axios

Trong template đã viết sẵn helper getAxios

```javascript
getAxios(token)
  .get('/user')
  .then(resp => {
    //
  })
  .catch(err => console.log('err :', _.get(err, 'response.data')))
```

- không cần dùng url full path
- Đã cấu hình sẵn bearer token

## Mobx

Là thư viện quản lý state
Ta sẽ chia các state trong một app thành các store. Mỗi store chịu trách nhiệm về một chức năng riêng, ví dụ: AuthStore có các hàm chịu trách nhiệm về việc authentication như: login, logout, register, UserStore chịu trách nhiệm liên quan đến quản lý User, có các state như users lưu thông tin về các list users lấy từ server, userDetail lưu thông tin về một user cụ thể. Các hàm fetchListUser để lấy thông tin list user , fetchUserById để lấy thông tin một user, deleteUser để xóa một user ...
Trong template này, Mỗi store được viết trong một file trong thư mục stores và được
setup trong file pages/\_app.js

### Truy cập đến store từ component

Muốn dùng store nào thì thêm
@inject('Store1', 'Store2' )
@observer
vào phía trước dòng định nghĩa component, bên trong component, truy cập store từ this.props
const { Store1, Store2 } = this.props

```javascript
import { inject, observer } from 'mobx-react'

@inject('UserSt')
@observer
class Users extends React.Component {
    componentDidMount() {
        const { UserSt, token } = this.props
        UserSt.fetchUsersList(token)
    }
    render(){
      const { UserSt } = this.props
      return (
        <ul>
         {UserSt.users.map(...)}
        </ul>
      )
  }
}
```

### Các thành phần trong một store

Store là một class và có các thành phần sau:

#### Observable state

Là các state mà các component sẽ theo dõi để render lại khi những state này thay đổi
Thực ra là một thuộc tính của class, trong mobx, ta đặt "@observable" phía trước tên thuộc tính
Ta có thể gán giá trị ban đầu (mặc đinh cho state)

```javascript
import { observable } from 'mobx'
class UserStore {
  @observable firstName = 'john'
  @observable lastName = 'doe'
}
```

#### Computed value

Là các giá trị được tính ra từ các observable state
Khi observable state thay đổi, computed cũng thay đổi theo -> component render lại đúng theo computed value
Là một function, được đặt "@computed get" phía trước
Khi dùng trong component, không dùng dấu (). Ví dụ

```html
<span className="fullname">{UserStore.fullName}</span>
```

```javascript
import { observable, computed } from 'mobx'
class UserStore {
  @observable firstName = 'john'
  @observable lastName = 'doe'
  @computed get fullName() {
    return this.firstName.toUpperCase() + ' ' + this.lastName.toUpperCase()
  }
}
```

Ta cũng có thể đặt các logic trong hàm computed trong component nhưng đặt trong mobx sẽ dễ dàng quản lý và tránh đặt quá nhiều logic trong component

#### Action

```javascript
import { observable, computed, action } from 'mobx'
class UserStore {
  @observable firstName = 'john'
  @observable lastName = 'doe'
  @computed get fullName() {
    return this.firstName.toUpperCase() + ' ' + this.lastName.toUpperCase()
  }
  @action changeLastName(newLastName) {
    this.lastName = newLastName
  }
  @action setter = (propertyname, value) => {
    this[propertyname] = value
  }
}
```

Action là một function để thực hiện một việc nào đó ví dụ
hàm login() sẽ set một cookie lưu token và chuyển hướng về trang chủ

Action thường gắn với việc thay đổi observable value, ví dụ: gọi request lấy về list users, sau đó gán cho biến users

Vì việc thay đổi observable state diễn ra thường xuyên, trong template viết sẵn action setter để tiện cho việc này

```javascript
@action setter = (propertyname, value) => {
   this[propertyname] = value
}
```

```html
<button onClick={e=> UserStore.setter('lastName', 'new name')}>
Change Last Name
</button>

<button onClick={e=> UserStore.changeLastName('new name 2')}>
Change Last Name 2
</button>
```
