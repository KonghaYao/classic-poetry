/**
 * 数字转中文
 * 来源：
 * https://juejin.cn/post/6844903714168258574#heading-10
 */

export function clearZero(str: string) {
    const regMiddle = /零{2}/g;
    const regEnd = /零?零$/;
    const regTen = /一十/g;
    str = str.replace(regMiddle, "零");
    str = str.replace(regTen, "十");
    return str.replace(regEnd, "");
}

export function NumberToCN(number: string) {
    const ChineseText = "零一二三四五六七八九";
    const unit = "十百千万十百千亿十百千";
    const length = number.length;
    let n = length - 2;
    let string = "";
    for (var i = 0; i < length; i++) {
        let num = number.charAt(i);
        let currentUnit = unit.charAt(n);
        string += ChineseText.charAt(num as any);
        // 通过下面这步相当于将字符串分割成四位一组，因为每四位都会有一个单位，所以零不可能相连超过两个了。
        string +=
            num === "0" && "万亿".indexOf(currentUnit) < 0 ? "" : currentUnit;
        n--;
    }
    return clearZero(string);
}
