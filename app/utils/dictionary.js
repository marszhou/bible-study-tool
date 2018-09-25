export const getDictionaryId = (lang, no) =>
  (lang === 'WH' ? 'H' : 'G') + '0'.repeat(4 - (no.length + '')) + no

export const dictionaryDefCnEllipsis = text => {
  const _lines = text.split(/\n/)
  const lines = _lines.length > 10 ? [..._lines.slice(0, 10), '<a class="more" href="###">更多...</a>'] : _lines
  return lines.join('<br/>')
}
