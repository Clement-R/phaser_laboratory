<?php 
    require 'vendor/autoload.php';
    Twig_Autoloader::register();

    $loader = new Twig_Loader_Filesystem('templates');
    $twig = new Twig_Environment($loader, array('auto_reload' => true));

    // Directories to ignore
    $ignore = ['css', 'fonts', 'js', 'assets', 'vendor', 'templates',
               'project_template'];
    // List all directories in the actual directory
    $directories = glob('*', GLOB_ONLYDIR);

    $projects = [];
    foreach ($directories as $directory) {
        if(!in_array($directory, $ignore)) {
            $project = [];
            $project['name'] = $directory;

            $favicon = $directory."/favicon";
            if(is_file($favicon)) {
                $project['logo'] = $favicon;
            } else {
                $project['logo'] = 'assets/images/boxItem.png';
            }

            $projects[] = $project;
        }
    }
    echo $twig->render('index.html', array('projects' => $projects));

    // TODO :
    // Ajax call from index to create a new directory (project), and refresh
    // index projects div.
?>