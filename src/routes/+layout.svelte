<script>
  import Header from './Header.svelte'
  import Footer from './Footer.svelte'
  import '../app.css'
</script>

<Header />
<main>
  <slot />
</main>
<Footer />
