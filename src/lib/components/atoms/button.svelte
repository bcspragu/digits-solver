<script lang="ts">
  import clsx from 'clsx';
  export let appearance: 'primary' | 'secondary' = 'primary';
</script>

<button
  class={clsx(
    'rounded-full px-5 py-4 text-base font-bold',
    appearance === 'primary' && 'nice-focus bg-yellow-400 text-badger-900 hover:bg-yellow-400',
    appearance === 'secondary' &&
      'bg-white text-badger-900 ring-1 ring-inset ring-badger-300 hover:bg-badger-50',
    $$restProps.disabled && 'cursor-not-allowed opacity-50'
  )}
  on:click
  {...$$restProps}
>
  <slot />
</button>
