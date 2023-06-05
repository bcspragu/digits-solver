<script lang="ts">
  import { useWebWorker } from '@svelteuidev/composables';

  import Button from '$lib/components/atoms/button.svelte';
  import { solve } from '$lib/utils/solve';
  import { getFromMap } from '$lib/utils/get-from-map';

  export let target: number;
  export let numbers: number[];

  const isNotUndefined = <T>(x: T | undefined): x is T => x !== undefined;

  $: isSolvable = isNotUndefined(target) && numbers.every(isNotUndefined);

  const memoizedSolutions = new Map<string, Awaited<ReturnType<typeof solve>>>();
  const { workerFn: solveInWebWorker } = useWebWorker(solve);
  let solutionsPromise: ReturnType<typeof solve>;

  let solutions: Awaited<typeof solutionsPromise> = [];

  let isShowingSolution = false;

  $: hasSolution = solutions && solutions.length > 0;
  $: hasCalculatedSolution = typeof solutionsPromise !== 'undefined';
  $: firstSolution = solutions[0];

  $: if (typeof numbers !== 'undefined' && typeof target !== 'undefined') {
    hasCalculatedSolution = false;
  }
  const showSolution = () => {
    isShowingSolution = true;
  };

  const onClick = async (e: Event) => {
    e.preventDefault();
    isShowingSolution = false;

    const numbersArray = numbers.map((number) => Number(number));
    const targetNumber = Number(target);

    const memoizedKey = `${numbersArray.join(',')}-${targetNumber}`;

    if (memoizedSolutions.has(memoizedKey)) {
      solutions = getFromMap(memoizedSolutions, memoizedKey);
      solutionsPromise = Promise.resolve(solutions);
      return;
    }

    solutionsPromise = solveInWebWorker(numbersArray, targetNumber);

    solutions = await solutionsPromise;

    memoizedSolutions.set(memoizedKey, solutions);
  };
</script>

{#if isSolvable}
  {#await solutionsPromise}
    <Button on:click={onClick} disabled>Solving...</Button>
  {:then}
    <Button on:click={onClick}>Find solution</Button>
  {/await}
{:else}
  <Button on:click={onClick} disabled>Find solution</Button>
{/if}

{#if hasCalculatedSolution}
  {#await solutionsPromise then}
    <div class="relative w-full max-w-lg my-4">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-badger-300" />
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-2 text-sm text-badger-500">Solution</span>
      </div>
    </div>
    <p class="text-xl text-badger-800 mt-2 mb-6">
      Possible in {firstSolution.steps.length} steps
    </p>
    {#if !isShowingSolution}
      <Button appearance="secondary" on:click={showSolution}>Show Solution</Button>
    {/if}
  {/await}

  {#if isShowingSolution}
    <div class="space-y-1 text-xl font-medium font-mono">
      {#if hasSolution}
        {#each firstSolution.steps as step}
          <p class="text-badger-800">{step}</p>
        {/each}
      {:else}
        <p class="text-badger-800">No solution found.</p>
      {/if}
    </div>
  {/if}
{/if}
