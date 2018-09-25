export const isDescendant = (parent, child) => {
  if (parent === child) return true
  var node = child.parentNode;
  while (node != null) {
      if (node == parent) {
          return true;
      }
      node = node.parentNode;
  }
  return false;
}
