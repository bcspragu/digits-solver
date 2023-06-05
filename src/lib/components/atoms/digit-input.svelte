<script lang="ts">
  import clsx from 'clsx';

  export let id: string;
  export let value: number;
  export let label: string;
</script>

<div
  class={clsx(
    'w-20 h-20 border-badger-900 border-dashed border-3 rounded-full flex items-center justify-center focus-within:border-primary-500 selection:text-primary-600',
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
