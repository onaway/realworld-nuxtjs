export default function ({ store, redirect }) {
    // 若没登录，跳转登录页
    if (!store.state.user) {
        return redirect('/login')
    }
}
  