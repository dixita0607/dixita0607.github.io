<script>
  import 'font-awesome/css/font-awesome.css';

  export let url, name, icon;
</script>

<div>
  <!--suppress HtmlUnknownTarget -->
  <a href={url} title={name}><i class="fa {icon}"></i></a>
</div>

<style>
  a {
    text-decoration: none;
  }

  i {
    background-color: #000000;
    color: #FFFFFF;
    line-height: 56px;
    text-align: center;
    font-size: 28px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin: 0 4px;
  }

  .fa-github {
    background-color: #000000;
  }
  .fa-free-code-camp {
    background-color: #006900;
  }
  .fa-codepen {
    background-color: #f9be00;
  }
  .fa-twitter {
    background-color: #1eb0fb;
  }
  .fa-medium {
    background-color: #00ae7b;
  }
  .fa-envelope-o {
    background-color: #ef5350;
  }
  .fa-linkedin {
    background-color: #0073bb;
  }

</style>
