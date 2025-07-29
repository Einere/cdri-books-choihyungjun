const formatter_ko_kr = new Intl.NumberFormat("ko-KR", {
  style: "decimal",
});

export function formatNumber(n: number | string) {
  const _n = typeof n === "string" ? parseInt(n, 10) : n;

  return formatter_ko_kr.format(_n);
}
