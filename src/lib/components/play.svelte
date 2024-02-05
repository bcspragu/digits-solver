<script lang="ts">
  import { Confetti } from 'svelte-confetti';
  import { cubicInOut } from 'svelte/easing';

  import DigitCheckbox from './atoms/digit-checkbox.svelte';
  import OperationCheckbox from './atoms/operation-checkbox.svelte';
  import { calculate, operations } from '$lib/utils/numbers';
  import clsx from 'clsx';
  import { getAllPuzzles, getPuzzleDate, getTodaysPuzzleIndex } from '$lib/utils/puzzles';
  import { formatDate } from '$lib/utils/format-date';
  import Solution from './molecules/solution.svelte';

  const allDays = getAllPuzzles();
  let selectedDayIdx = getTodaysPuzzleIndex();
  let puzzle = allDays[selectedDayIdx];
  let puzzleIdx = 0;

  $: puzzle;
  $: target = puzzle.targets[puzzleIdx];

  let numbers = [...puzzle.numbers[puzzleIdx]];
  let checkedNumberIndex = -1;
  let selectedOperationSymbol = '';

  type State = {
    numbers: number[];
    checkedNumberIndex: number;
  };

  let states: State[] = [];

  $: hasReachedTarget = numbers.includes(target);

  const gridClassNames = [
    'row-start-1 col-start-1',
    'row-start-1 col-start-2',
    'row-start-1 col-start-3',
    'row-start-2 col-start-1',
    'row-start-2 col-start-2',
    'row-start-2 col-start-3',
  ];

  const getGridClasses = (index: number): string => gridClassNames[index];

  const move = (exitingNode: HTMLElement, { duration }: { duration: number }) => {
    const { x: startX, y: startY } = exitingNode.getBoundingClientRect();
    const targetNode = document.querySelector(`label[for="number-${checkedNumberIndex}"`);
    if (!targetNode) {
      // TODO Shouldn't happen, but handle it
      return;
    }

    const { x: endX, y: endY } = targetNode.getBoundingClientRect();

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    return {
      duration,
      css: (t: number) => {
        const eased = 1 - cubicInOut(t);

        return `
          z-index: 10;
					transform: translate(${deltaX * eased}px, ${deltaY * eased}px);
        `;
      },
    };
  };

  const availableOperations = [
    operations.add,
    operations.subtract,
    operations.multiply,
    operations.divide,
    // operations.exponent,
  ];

  const onSubmit = async (e: Event) => {
    e.preventDefault();
  };

  const onCheckedNumberChange = (changedIndex: number) => {
    const selectedOperation = availableOperations.find(
      (operation) => operation.symbol === selectedOperationSymbol
    );

    if (changedIndex === checkedNumberIndex) {
      checkedNumberIndex = -1;
      selectedOperationSymbol = '';
      return;
    }

    if (checkedNumberIndex === -1 || !selectedOperation) {
      checkedNumberIndex = changedIndex;
      return;
    }

    const firstNumber = numbers[checkedNumberIndex];
    const secondNumber = numbers[changedIndex];

    const result = calculate(selectedOperation.operation, firstNumber, secondNumber);

    selectedOperationSymbol = '';

    if (result === null) {
      const checkboxes = document.querySelectorAll<HTMLInputElement>(
        'fieldset[name="numbers"] input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      checkedNumberIndex = -1;
      return;
    }

    states = [
      ...states,
      {
        numbers,
        checkedNumberIndex,
      },
    ];

    let nextNumbers = [...numbers];
    nextNumbers[checkedNumberIndex] = -1;
    nextNumbers[changedIndex] = result;
    numbers = nextNumbers;

    checkedNumberIndex = changedIndex;
    selectedOperationSymbol = '';
  };

  const onUndoClick = () => {
    const previousState = states.at(-1);

    if (!previousState) {
      return;
    }

    states = states.slice(0, -1);
    numbers = previousState.numbers;
    checkedNumberIndex = previousState.checkedNumberIndex;
  };
</script>

<div class="flex flex-col items-center mb-8">
  <h2
    class="mt-12 mb-6 px-4 text-7xl font-medium text-badger-900 text-center md:text-8xl font-serif"
  >
    Digits
  </h2>

  <div class="w-full space-y-4">
    <label class="sr-only" for="date" />
    <select
      id="date"
      name="date"
      class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
      on:change={(e) => {
        selectedDayIdx = Number(e.target.value);
        puzzle = allDays[selectedDayIdx];
        puzzleIdx = 0;
        numbers = [...puzzle.numbers[puzzleIdx]];
        checkedNumberIndex = -1;
        selectedOperationSymbol = '';
        states = [];
      }}
    >
      {#each allDays as _, i}
        <option value={i} selected={i === selectedDayIdx}>{formatDate(getPuzzleDate(i))}</option>
      {/each}
    </select>

    <nav class="w-full isolate flex divide-x divide-badger-200 shadow" aria-label="Tabs">
      {#each puzzle.targets as puzzleTarget, i}
        <button
          class={clsx(
            'group relative min-w-0 flex-1 overflow-hidden bg-white p-4 text-center text-sm font-medium hover:bg-badger-50 focus:z-10',
            i === puzzleIdx ? 'text-badger-900' : 'text-badger-500 hover:text-badger-700'
          )}
          on:click={() => {
            puzzleIdx = i;
            numbers = [...puzzle.numbers[puzzleIdx]];
            checkedNumberIndex = -1;
            selectedOperationSymbol = '';
            states = [];
          }}
        >
          <span>{puzzleTarget}</span>
          <span
            aria-hidden="true"
            class={clsx(
              'absolute inset-x-0 bottom-0 h-0.5',
              i === puzzleIdx ? 'bg-primary-500' : 'bg-transparent'
            )}
          />
        </button>
      {/each}
    </nav>
  </div>

  <form
    class="flex flex-col items-center mx-4 my-8 space-y-12 w-full max-w-md"
    on:submit={onSubmit}
  >
    <p class="text-center">Use any combination of numbers to reach the target.</p>

    <div class="flex flex-col items-center text-center text-5xl font-bold outline-primary-500">
      {#if hasReachedTarget}
        <Confetti cone x={[-0.5, 0.5]} />
        <Confetti cone amount="10" x={[-1, -0.4]} y={[0.25, 0.75]} />
        <Confetti cone amount="10" x={[0.4, 1]} y={[0.25, 0.75]} />
      {/if}
      {target}
    </div>

    <fieldset name="numbers">
      <legend class="sr-only">Available numbers</legend>
      <div class="grid grid-cols-3 grid-rows-2 gap-4">
        {#each numbers as number, i}
          {#if number !== -1}
            <div class={clsx('z-20', getGridClasses(i))} out:move|global>
              <DigitCheckbox
                class={'justify-self-center'}
                id="number-{i}"
                label={number.toString()}
                checked={i === checkedNumberIndex}
                on:change={(e) => onCheckedNumberChange(i)}
              />
            </div>
          {/if}
        {/each}
      </div>
    </fieldset>

    <fieldset class="flex gap-3 flex-wrap justify-center">
      <legend class="sr-only">Operations</legend>
      <button
        class="w-14 h-14 rounded-full nice-focus bg-lime-600 text-white flex items-center justify-center"
        on:click={() => {
          onUndoClick();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="4"
          aria-label="Undo"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </button>

      {#each availableOperations as operation}
        <OperationCheckbox
          class="justify-self-center"
          label={operation.label}
          symbol={operation.symbol}
          value={operation.symbol}
          bind:operation={selectedOperationSymbol}
        />
      {/each}
    </fieldset>
  </form>

  <Solution {numbers} {target} />
</div>
