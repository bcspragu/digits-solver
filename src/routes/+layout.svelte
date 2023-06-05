<script lang="ts">
  import '../app.css';
</script>

<div class="min-w-screen min-h-screen flex flex-col items-center">
  <div class="flex-1">
    <slot />
  </div>

  <div
    class="flex flex-col items-center justify-center mt-8 pt-8 pb-8 w-full bg-badger-900 font-medium text-badger-100 space-y-3"
  >
    <p>
      Made with <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 inline text-pink-500"
          aria-label="love"
        >
          <path
            d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"
          />
        </svg>
      </span>
      by
      <a
        class="underline decoration-pink-500 decoration-2 underline-offset-2 hover:text-pink-500 nice-focus"
        href="https://farrant.me"
        target="_blank"
        rel="noopener">Josh Farrant</a
      >
    </p>
    <p>Dedicated to Luke Atherton</p>
  </div>
</div>
