<script>
  export let image, title, code, demo;
</script>

<a href={code.url}>
  <div class="card">
    <img src={image} alt="Project Thumbnail">
    <div class="content">
      <h1>{title}</h1>
      <a href={code.url} title="Code"><i class="fa {code.icon}"></i></a>
      <a href={demo.demo} title="Demo"><i class="fa {demo.icon}"></i></a>
    </div>
  </div>
</a>

<style>
  a {
    text-decoration: none;
  }

  .card {
    display: flex;
    flex-direction: column;
    margin: 16px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    max-width: 300px;
  }

  .card:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  img {
    max-width: 300px;
  }

  .content {
    padding: 16px;
    color: #1d809f;
    text-align: center;
    border-top: 1px solid lightgrey;
  }

  .content h1 {
    font-size: 24px;
  }

  .content a {
    text-decoration: none;
    color: #1d809f;
  }

  .content a i {
    font-size: 22px;
    padding: 0 8px;
  }
</style>


