export function shareweibo(
  title: string,
  url: string,
) {
  const e = encodeURIComponent
  const s = screen
  const f = 'http://v.t.sina.com.cn/share/share.php?'
  const u = window.location.href
  const p = ['url=', e(u), '&title=', e(title), '&appkey=1389975891', '&pic=', e(url)].join('')

  function a() {
    if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (s.width - 620) / 2, ',top=', (s.height - 450) / 2].join(''))) { window.location.href = [f, p].join('') }
  }
  if (/Firefox/.test(navigator.userAgent)) { setTimeout(a, 0) }
  else { a() }
}
