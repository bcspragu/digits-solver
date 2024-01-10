<script lang="ts">
  import clsx from 'clsx';

  export let id: string;
  export let checked = false;
  export let label: string;

  const fontSizeMap = new Map<number, string>([
    [1, 'text-3xl'],
    [2, 'text-3xl'],
    [3, 'text-3xl'],
    [4, 'text-2xl'],
    [5, 'text-xl'],
    [6, 'text-lg'],
    [7, 'text-md'],
    [8, 'text-sm'],
    [9, 'text-xs'],
  ]);

  const getFontSize = (length: number) => fontSizeMap.get(length) ?? 'text-xl';

  $: fontSize = getFontSize(label.length);
</script>

<div class={clsx('h-20 w-20', $$restProps.class)}>
  <input {id} class="peer sr-only" type="checkbox" bind:checked on:change />
  <label
    for={id}
    class={clsx(
      'nice-peer-focus flex h-full w-full cursor-pointer select-none items-center justify-center rounded-full border-3 border-dashed border-badger-900 font-bold peer-checked:border-none peer-checked:bg-lime-600 peer-checked:text-white',
      fontSize
    )}
  >
    <span class="relative -top-0.5 select-none">{label}</span>
  </label>
</div>
