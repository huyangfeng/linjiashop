const host = 'http://linjiashop-mobile-api.microapp.store/'
export default ($wx) => {
  let handler = {
    get(target, property) {
      target[property] = (url, params = {}) => {
        return new Promise((resolve, reject) => {
          $wx.request({
            url: host + url,
            method: property.toLocaleUpperCase(),
            ...params,
            success: res => {
              if (Number(res.statusCode) !== 200) {
                $wx.showToast({title: '通讯错误，稍后再试', icon: 'none'})
                return false
              }
              console.log(url, res.data)
              resolve(res.data)
            },
            fail: error => {
              reject(error)
            }
          })
        })
      }
      return target[property]
    }
  }

  const API = new Proxy({}, handler)
  return API
}
