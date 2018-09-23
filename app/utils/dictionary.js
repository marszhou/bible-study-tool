export const getDictionaryId = (lang, no) => (lang === 'WH' ? 'H' : 'G') + '0'.repeat(4-(no.length+'')) + no
