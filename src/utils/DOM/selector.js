/** querySelector 간편하게 쓰는 함수 */
export const $ = (selector, $target = document) =>
  $target.querySelector(selector);
