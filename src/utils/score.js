export function score(p) {
  const views = p.views || 0;
  const likes = p.likes || 0;
  const shares = p.shares || 0;
  return views + likes * 5 + shares * 10;
}
