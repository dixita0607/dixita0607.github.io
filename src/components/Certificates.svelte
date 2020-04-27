<script>
  import { certificates } from '../data';
  import Certificate from './Certificate.svelte';
</script>

<div class="certifications">
  <h1>Certifications</h1>
  <div class="certificate">
    {#each certificates as certificate}
      <Certificate {...certificate} />
    {/each}
  </div>
</div>

<style>
  .certifications {
    background-color: #0080A3;
    padding: 164px 32px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin-top: 0;
    font-size: 48px;
    color: #FFFFFF;
  }

  .certificate {
    margin-top: 32px;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
