export default function arrayRemoveElement(target, element) {
  const index = target.indexOf(element);
  if (index > -1) {
    target.splice(index, 1);
  }
}