<script lang="ts">
  import { formatOrdinals } from '$lib/utils/format-ordinals';
  import DigitInput from '$lib/components/atoms/digit-input.svelte';
  import Solution from '$lib/components/molecules/solution.svelte';
  import { generateArray } from '$lib/utils/generate-array';

  let target: number | undefined;
  let numbers = generateArray(6, undefined);
</script>

<div class="flex flex-col items-center">
  <h2 class="mt-12 px-4 text-7xl font-medium text-badger-900 text-center md:text-8xl font-serif">
    Digits Solver
  </h2>

  <form class="flex flex-col items-center mx-4 my-8 space-y-12 w-full max-w-md">
    <p class="text-center">
      Enter the target and the available digits below to calculate a solution.
    </p>

    <div class="flex flex-col items-center">
      <label for="target-number" class="mb-2 text-sm font-bold">Target</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        id="target-number"
        class="bg-transparent text-center text-5xl font-bold border-2 rounded border-badger-400 w-40 placeholder:font-extralight outline-primary-500"
        type="text"
        pattern="[0-9]+"
        inputmode="numeric"
        autofocus
        bind:value={target}
      />
    </div>

    <fieldset class="grid grid-cols-3 grid-rows-2 gap-4">
      <legend class="sr-only">Available numbers</legend>
      {#each numbers as _, i}
        <DigitInput
          class="justify-self-center"
          id="number-{i}"
          label="{formatOrdinals(i + 1)} number"
          bind:value={numbers[i]}
        />
      {/each}
    </fieldset>
  </form>

  <Solution {numbers} {target} />
</div>
