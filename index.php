<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<style>
	.clk{
		margin-top:10px;
	}

	</style>
  </head>
  <body>
  <div class="container">
    <h1>WWScrape</h1>
<div class = "well">
<div class="form-group has-success">
  <label class="form-control-label" for="inputSuccess1">Input URL</label>
  <input type="text" class="form-control form-control-primary inpt" id="inputSuccess1" />
   <div class="btn-group" role="group" aria-label="Third group">
    <button type="button" class="btn btn-primary clk">SCRAPE</button>
   </div>
  <small class="form-text text-muted">Start the scrape but beware!</small>
</div>
<div class="result"></div>
<div class="result_run"></div>
</div>
</div>

    <!-- jQuery first, then Tether, then Bootstrap JS. -->
    <script src="vendor/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
	<script>
	  $(document).ready(function() {

		  $( ".clk" ).click(function () {
			//alert("start scrape");
			var inpt = $(".inpt");
			var values = inpt.val();
			alert(values);
			$.post( "runcasper.php", {"values": values } , function( data ) {
			  $( ".result" ).html( data );        

		  });
	   });
	});

	</script>
  </body>
</html>
