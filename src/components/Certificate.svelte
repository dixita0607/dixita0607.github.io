<script>
  export let name, url, icon;
</script>


<a href={url} target="_blank"><i class="fa {icon}"></i>{name}</a>

<style>
  a {
    text-decoration: none;
    color: white;
    margin: 8px 4px;
    background-color: #343a40;
    padding: 24px 32px;
    border-radius: 4px;
  }

  a:hover {
    background-color: #1d2124;
  }
  i {
    padding-right: 8px;
  }
</style>
