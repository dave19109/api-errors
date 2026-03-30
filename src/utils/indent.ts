/**
 * Indents each line of the given string by a specified number of characters.
 *
 * @param str - The string to indent.
 * @param count - The number of indent characters to add to each line. Default is 2.
 * @param options - Additional options for indentation.
 * @param options.indent - The string to use for indentation. Default is a single space.
 * @param options.includeEmptyLines - Whether to indent empty lines. Default is false.
 * @returns The indented string.
 * @throws Will throw an error if `count` is negative or if `options.indent` is not a string.
 */
export const indent = (
  str: string,
  count = 2,
  options: { indent?: string; includeEmptyLines?: boolean } = {
    indent: ' ',
    includeEmptyLines: false
  }
): string => {
  const { indent = ' ', includeEmptyLines = false } = options

  // Preserve current runtime behavior for non-string / empty string
  if (!(typeof str === 'string' && str.length > 0)) {
    return str
  }

  if (count < 0) {
    throw new RangeError(`Expected \`count\` to be at least 0, got \`${count}\``)
  }

  if (typeof indent !== 'string') {
    throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``)
  }

  if (count === 0) {
    return str
  }

  const unit = indent.repeat(count)
  const endsWithNewline = str.endsWith('\n')
  const lines = str.split('\n')

  // Remove the trailing empty element created by split when the string ends with '\n'
  // We will re-append the final newline after processing
  if (endsWithNewline) {
    lines.pop()
  }

  const transformed = lines.map((line) => {
    const isEmptyOrWhitespace = line.trim().length === 0

    // Default behavior: do not indent empty/whitespace-only lines
    if (!includeEmptyLines && isEmptyOrWhitespace) {
      return line
    }

    return unit + line
  })

  let result = transformed.join('\n')

  if (endsWithNewline) {
    result += '\n'
  }

  return result
}

export default indent
