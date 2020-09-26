export default (diff) => {
  let braceCounter = 2;
  const diffArr = diff.split('');

  const stylishArr = diffArr.map((char) => {
    switch (char) {
      case '{':
        braceCounter += 4;
        return `${char}\n${' '.repeat(braceCounter)}`;
      case '}':
        braceCounter -= 4;
        return `\n${' '.repeat(braceCounter + 2)}${char}`;
      case ',':
        return `\n${' '.repeat(braceCounter)}`;
      case '"':
        return '';
      default:
        return char;
    }
  });

  return `{\n  ${stylishArr.join('')}\n}`;
};
