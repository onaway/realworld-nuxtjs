export default function ({ store, redirect }) {
    // 若登录，跳转首页
    if (store.state.user) {
        return redirect('/')
    }
}
  