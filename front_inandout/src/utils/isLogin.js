const isLogin = () => !!localStorage.getItem('userRole')  // !! 느낌표 두개는 undefined 값을 가진 내용 논리 연산 true / false

export default isLogin;