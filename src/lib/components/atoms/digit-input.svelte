<script lang="ts">
  import clsx from 'clsx';

  export let id: string;
  export let value: number;
  export let label: string;
</script>

<div
  class={clsx(
    'flex h-20 w-20 items-center justify-center rounded-full border-3 border-dashed border-badger-900 selection:text-primary-600 focus-within:border-primary-500',
    $$restProps.class
  )}
>
  <label for={id} class="sr-only">{label}</label>
  <input
    {id}
    class="bg-transparent text-center w-full h-full font-bold text-3xl relative -top-0.5 rounded-full outline-none border-none appearance-none"
    type="text"
    pattern="[0-9]+"
    inputmode="numeric"
    placeholder="0"
    bind:value
  />
</div>
