export function money(num, decimals = 0, decSep = ',', thouSep = ',') {
  let n = num
  const c = decimals
  const d = decSep
  const t = thouSep
  const s = n < 0 ? "-" : ""
  const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
  const j = i.length > 3 ? i.length % 3 : 0;
  return '$\u00A0' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(Number(n) - Number(i)).toFixed(c).slice(2) : "");
}
