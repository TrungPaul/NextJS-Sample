import { auth } from './../utils/auth.js'
import React from 'react'
//import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import CustomLayout from './../components/CustomLayout'

@inject('TodoSt', 'UserSt')
@observer
class index extends React.Component {
  render() {
    // eslint-disable-next-line
    const { TodoSt, UserSt } = this.props
    return (
      <CustomLayout
        activeNavLinkKey="1"
        breadcrumbItems={['Home', 'To do']}
        titlePage="To Do"
      >
        <div className="index-wr">
          <ul className="wr-todos">
            <div className="wr-add-todo">
              <input
                type="text"
                value={TodoSt.name}
                onChange={e => TodoSt.setter('name', e.target.value)}
              />
              <button
                onClick={e => {
                  if (TodoSt.name === '') {
                    return
                  }
                  TodoSt.addTodo(TodoSt.name)
                  TodoSt.setter('name', '')
                }}
                className="btn-addtodo"
              >
                Add!
              </button>
            </div>
            {TodoSt.todos.map((todo, index) => {
              return (
                <li key={todo.id}>
                  <span className="todoname">{todo.name}</span>
                  {todo.done === true ? (
                    <i
                      onClick={e => TodoSt.toggleTodoStatus(todo.id)}
                      className="fas fa-check"
                    ></i>
                  ) : (
                    <i
                      onClick={e => TodoSt.toggleTodoStatus(todo.id)}
                      className="fas fa-times"
                    ></i>
                  )}
                  <i
                    className="fa fa-trash"
                    onClick={e => TodoSt.deleteTodo(todo.id)}
                    aria-hidden="true"
                  ></i>
                </li>
              )
            })}
          </ul>
        </div>
      </CustomLayout>
    )
  }
}

index.getInitialProps = async ctx => {
  let token = (await auth(ctx)) || null
  return { token }
}

export default index

///////////////////
