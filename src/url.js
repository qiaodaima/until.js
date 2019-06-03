/**
 * 获取url上的查询参数
 *
 * example: getQueryParams('https://www.baidu.com/?color=3&name=清华')
 * return: {color: 3, name: '清华'}
 *
 * example: getQueryParams('https://www.baidu.com')
 * return: {}
 *
 * @param {string} url 不传递则表示获取当前url
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
