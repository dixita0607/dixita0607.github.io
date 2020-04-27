<script>
  import { socialLinks } from '../data';
  import SocialLink from './SocialLink.svelte';
</script>

<div class="home">
  <h1>Dixita Ganatra</h1>
  <p>Designer and A Web Developer</p>
  <div class="social-links">
    {#each socialLinks as socialLink}
      <SocialLink {...socialLink} />
    {/each}
  </div>
</div>

<style>
  .home {
    background: url("../images/background.png") #FFFFFF center center no-repeat;
    min-height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    font-size: 78px;
    margin: 0;
  }

  p {
    font-size: 28px;
    margin: 0;
  }

  .social-links {
    display: flex;
    margin-top: 28px;
  }
</style>
