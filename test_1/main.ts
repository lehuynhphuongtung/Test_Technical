function createProcessWithDelay() {
  let isCancelled = false;
  let progress = 0;

  async function processWithDelay(numbers: number[], delay: number = 1000): Promise<void> {
    if (!Array.isArray(numbers) || !numbers.every((num) => typeof num === "number")) {
      throw new Error("Invalid input: Must be an array of numbers.");
    }

    if (numbers.length === 0) return Promise.resolve();

    for (const num of numbers) {

      if (isCancelled) {
        console.log("Process cancelled.");
        return;
      }

      console.log(num);
      progress += 1;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return Promise.resolve();
  }

  function cancel() {
    isCancelled = true;
  }

  function getProgress() {
    return progress;
  }

  return { processWithDelay, cancel, getProgress };
}

const processor = createProcessWithDelay();

processor.processWithDelay([1, 2, 3, 4, 5])
// processor.processWithDelay([1, 2, 3, 4, 5], 2000)

setTimeout(() => {
  processor.cancel();
  console.log("Cancelled at progress:", processor.getProgress());
}, 3000);
