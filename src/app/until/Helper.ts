type AnyFunction = (...args: any[]) => any;

export function debounce<F extends AnyFunction>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay) as any;
  };
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
