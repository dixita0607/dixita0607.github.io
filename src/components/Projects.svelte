<script>
  import { projects } from '../data';
  import ProjectCard from './ProjectCard.svelte';
</script>

<div class="projects">
  <h1>Projects</h1>
  <div class="card-container">
    {#each projects as project}
      <ProjectCard {...project} />
    {/each}
  </div>
</div>

<style>
  .projects {
    padding: 96px 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: #ecb807;
    font-size: 48px;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
  }
</style>
