export default function arrayAddElement(target, element, unique = true) {
  if (!unique || !target.includes(element)) {
    target.push(element);
  }
}