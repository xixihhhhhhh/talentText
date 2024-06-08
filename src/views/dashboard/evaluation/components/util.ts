export function isFenDuan(str: string) {
  return str.includes('①');
}

export const stringArr = {
  chaoshi: [
    '以下描述哪些是不合法的：',
    '①超市收银台因为没有零钱，用等价的零食糖果找钱',
    '②老人定好遗嘱，遗产只分给儿子，但儿子和女儿都必须赡养老人',
    '③小明聚餐喝了一杯啤酒，他叫的代驾不擅长停车，他怕自己的车被撞坏了，到了停车场就自己停车',
    '④黄灯亮时，已越过停止线的车辆可以继续通行',
    '⑤KTV谢绝自带酒水，客人如需自带酒水，加收50元清洁费',
  ],
  changge: [
    '下列a、b、c三项分别与①②③三句衔接得最好的一组是',
    '① 我不仅知道你会唱歌，',
    '② 不仅我知道你会唱歌，',
    '③ 我知道你不仅会唱歌，',
    'a.而且会跳舞',
    'b.还知道你会跳舞',
    'c.我们组的同事都知道你会唱歌',
  ],
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay = 200,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;

  return function (...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
