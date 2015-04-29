<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Laboratory</title>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="col-md-12">
                <?php
                    function show_project($path) {
                        echo ("<div>");
                        echo ("<img src=\"".$path."/favicon\" alt=\"Project's logo\">");
                        echo ("</div>");
                        echo ("<a href=\"".$path."\">".$path."</a>");
                    }
                    // Directories to ignore
                    $ignore = ['css', 'fonts', 'js', 'assets'];
                    // List all directories in the actual directory
                    $directories = glob('*', GLOB_ONLYDIR);
                    foreach ($directories as $directory) {
                        if(!in_array($directory, $ignore)) {
                            show_project($directory);
                        }
                    }
                ?>
            </div>
        </div>
    </body>
</html>