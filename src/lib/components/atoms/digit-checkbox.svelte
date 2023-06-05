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

<div class={clsx('w-20 h-20', $$restProps.class)}>
  <input {id} class="peer sr-only" type="checkbox" bind:checked on:change />
  <label
    for={id}
    class={clsx(
      'cursor-pointer w-full h-full rounded-full flex items-center justify-center border-badger-900 border-dashed border-3 font-bold nice-peer-focus peer-checked:bg-lime-600 peer-checked:border-none peer-checked:text-white select-none',
      fontSize
    )}
  >
    <span class="relative -top-0.5 select-none">{label}</span>
  </label>
</div>
