export interface UserInfo{
  isLogin:boolean,
  avatar:string,
  token:string,
  userName?:string
}
export const DefaultState:UserInfo = {
  isLogin: false,
  avatar: 'http://img.fishstar.xyz/norumor/%E7%99%BB%E9%99%86.png',
  token: '',
};

export const getState = () => {
  let state = localStorage.getItem('NoRumorState');
  if (!state) {
    localStorage.setItem('NoRumorState', JSON.stringify(DefaultState));
    console.log("第一次使用")
    return DefaultState;
  }
  else
    return JSON.parse(state)
};
export const setState = (newState:UserInfo) => {
  localStorage.setItem('NoRumorState', JSON.stringify(newState));
};