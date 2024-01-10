<script lang="ts">
  import clsx from 'clsx';

  export let operation: string;
  export let value: string;
  export let symbol: string;
  export let label: string;
</script>

<div class={clsx('h-14 w-14', $$restProps.class)}>
  <input id={label} class="peer sr-only" type="radio" {value} bind:group={operation} on:change />
  <label
    for={label}
    class="cursor-pointer w-full h-full rounded-full text-5xl flex items-center justify-center text-white bg-badger-900 font-bold nice-peer-focus peer-checked:bg-lime-600 peer-checked:border-none"
  >
    <span class="relative select-none h-full" aria-label={label}>{symbol}</span>
  </label>
</div>
