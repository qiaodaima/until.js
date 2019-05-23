/**
 * 获取 url 参数
 *
 * @param {string} url 不传递则表示获取当前 url 参数对象
 * @returns {object} url 参数对象集合
 */
export const getQueryParams = (url = location.search) => {
  let params = {};

  if (!url.includes('?')) {
    return params;
  }

  url.split('?')[1].split('&').map(item => {
    const [key, value] = item.split('=');

    params[key] = Number(value).toString() === 'NaN' ? decodeURI(value) : Number(value);
  });

  return params;
}
