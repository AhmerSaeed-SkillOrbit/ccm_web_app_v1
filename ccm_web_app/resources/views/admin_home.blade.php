<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CCM Chronic Care Managment</title>

    <!-- Global stylesheets -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
    <link href="/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="/css/core.css" rel="stylesheet" type="text/css">
    <link href="/css/components.css" rel="stylesheet" type="text/css">
    <link href="/css/colors.css" rel="stylesheet" type="text/css">
    <!-- /global stylesheets -->

    <!-- Core JS files -->
    <script type="text/javascript" src="/js/plugins/loaders/pace.min.js"></script>
    <script type="text/javascript" src="/js/core/libraries/jquery.min.js"></script>
    <script type="text/javascript" src="/js/core/libraries/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/plugins/loaders/blockui.min.js"></script>
    <!-- /core JS files -->

    <!-- Theme JS files -->
    <script type="text/javascript" src="/js/plugins/visualization/d3/d3.min.js"></script>
    <script type="text/javascript" src="/js/plugins/visualization/d3/d3_tooltip.js"></script>
    <script type="text/javascript" src="/js/plugins/forms/styling/switchery.min.js"></script>
    <script type="text/javascript" src="/js/plugins/forms/styling/uniform.min.js"></script>
    <script type="text/javascript" src="/js/plugins/forms/selects/bootstrap_multiselect.js"></script>
    <script type="text/javascript" src="/js/plugins/ui/moment/moment.min.js"></script>
    <script type="text/javascript" src="/js/plugins/pickers/daterangepicker.js"></script>

    <script type="text/javascript" src="/js/core/app.js"></script>
    <script type="text/javascript" src="/js/pages/dashboard.js"></script>
    <!-- /theme JS files -->

</head>

<body>

<!-- Main navbar -->
<div class="navbar navbar-inverse">
    <div style="background: #fff;" class="navbar-header">
        <a class="navbar-brand" href="index.html"><img style="margin-top: -11px; height: 41px;" src="/svg/logo.png" alt=""></a>

        <ul class="nav navbar-nav visible-xs-block">
            <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
            <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
    </div>

    <div class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
            <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>

            <li class="dropdown">
                <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-git-compare"></i>
                    <span class="visible-xs-inline-block position-right">Git updates</span>
                    <span class="badge bg-warning-400">9</span>
                </a>-->

                <div class="dropdown-menu dropdown-content">
                    <div class="dropdown-content-heading">
                        Git updates
                        <ul class="icons-list">
                            <li><a href="#"><i class="icon-sync"></i></a></li>
                        </ul>
                    </div>

                    <ul class="media-list dropdown-content-body width-350">
                        <li class="media">
                            <div class="media-left">
                                <a href="#" class="btn border-primary text-primary btn-flat btn-rounded btn-icon btn-sm"><i class="icon-git-pull-request"></i></a>
                            </div>

                            <div class="media-body">
                                Drop the IE <a href="#">specific hacks</a> for temporal inputs
                                <div class="media-annotation">4 minutes ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left">
                                <a href="#" class="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i class="icon-git-commit"></i></a>
                            </div>

                            <div class="media-body">
                                Add full font overrides for popovers and tooltips
                                <div class="media-annotation">36 minutes ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left">
                                <a href="#" class="btn border-info text-info btn-flat btn-rounded btn-icon btn-sm"><i class="icon-git-branch"></i></a>
                            </div>

                            <div class="media-body">
                                <a href="#">Chris Arney</a> created a new <span class="text-semibold">Design</span> branch
                                <div class="media-annotation">2 hours ago</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left">
                                <a href="#" class="btn border-success text-success btn-flat btn-rounded btn-icon btn-sm"><i class="icon-git-merge"></i></a>
                            </div>

                            <div class="media-body">
                                <a href="#">Eugene Kopyov</a> merged <span class="text-semibold">Master</span> and <span class="text-semibold">Dev</span> branches
                                <div class="media-annotation">Dec 18, 18:36</div>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left">
                                <a href="#" class="btn border-primary text-primary btn-flat btn-rounded btn-icon btn-sm"><i class="icon-git-pull-request"></i></a>
                            </div>

                            <div class="media-body">
                                Have Carousel ignore keyboard events
                                <div class="media-annotation">Dec 12, 05:46</div>
                            </div>
                        </li>
                    </ul>

                    <div class="dropdown-content-footer">
                        <a href="#" data-popup="tooltip" title="All activity"><i class="icon-menu display-block"></i></a>
                    </div>
                </div>
            </li>
        </ul>

        <p class="navbar-text"><span class="label bg-success">Online</span></p>

        <ul class="nav navbar-nav navbar-right">
            <!---<li class="dropdown language-switch">
                <a class="dropdown-toggle" data-toggle="dropdown">
                    <img src="/svg/flags/gb.png" class="position-left" alt="">
                    English
                    <span class="caret"></span>
                </a>

                <ul class="dropdown-menu">
                    <li><a class="deutsch"><img src="/svg/flags/de.png" alt=""> Deutsch</a></li>
                    <li><a class="ukrainian"><img src="/svg/flags/ua.png" alt=""> Українська</a></li>
                    <li><a class="english"><img src="/svg/flags/gb.png" alt=""> English</a></li>
                    <li><a class="espana"><img src="/svg/flags/es.png" alt=""> España</a></li>
                    <li><a class="russian"><img src="/svg/flags/ru.png" alt=""> Русский</a></li>
                </ul>
            </li>

            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-bubbles4"></i>
                    <span class="visible-xs-inline-block position-right">Messages</span>
                    <span class="badge bg-warning-400">2</span>
                </a>

                <div class="dropdown-menu dropdown-content width-350">
                    <div class="dropdown-content-heading">
                        Messages
                        <ul class="icons-list">
                            <li><a href="#"><i class="icon-compose"></i></a></li>
                        </ul>
                    </div>

                    <ul class="media-list dropdown-content-body">
                        <li class="media">
                            <div class="media-left">
                                <img src="/svg/placeholder.jpg" class="img-circle img-sm" alt="">
                                <span class="badge bg-danger-400 media-badge">5</span>
                            </div>

                            <div class="media-body">
                                <a href="#" class="media-heading">
                                    <span class="text-semibold">James Alexander</span>
                                    <span class="media-annotation pull-right">04:58</span>
                                </a>

                                <span class="text-muted">who knows, maybe that would be the best thing for me...</span>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left">
                                <img src="/svg/placeholder.jpg" class="img-circle img-sm" alt="">
                                <span class="badge bg-danger-400 media-badge">4</span>
                            </div>

                            <div class="media-body">
                                <a href="#" class="media-heading">
                                    <span class="text-semibold">Margo Baker</span>
                                    <span class="media-annotation pull-right">12:16</span>
                                </a>

                                <span class="text-muted">That was something he was unable to do because...</span>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><img src="/svg/placeholder.jpg" class="img-circle img-sm" alt=""></div>
                            <div class="media-body">
                                <a href="#" class="media-heading">
                                    <span class="text-semibold">Jeremy Victorino</span>
                                    <span class="media-annotation pull-right">22:48</span>
                                </a>

                                <span class="text-muted">But that would be extremely strained and suspicious...</span>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><img src="/svg/placeholder.jpg" class="img-circle img-sm" alt=""></div>
                            <div class="media-body">
                                <a href="#" class="media-heading">
                                    <span class="text-semibold">Beatrix Diaz</span>
                                    <span class="media-annotation pull-right">Tue</span>
                                </a>

                                <span class="text-muted">What a strenuous career it is that I've chosen...</span>
                            </div>
                        </li>

                        <li class="media">
                            <div class="media-left"><img src="/svg/placeholder.jpg" class="img-circle img-sm" alt=""></div>
                            <div class="media-body">
                                <a href="#" class="media-heading">
                                    <span class="text-semibold">Richard Vango</span>
                                    <span class="media-annotation pull-right">Mon</span>
                                </a>

                                <span class="text-muted">Other travelling salesmen live a life of luxury...</span>
                            </div>
                        </li>
                    </ul>

                    <div class="dropdown-content-footer">
                        <a href="#" data-popup="tooltip" title="All messages"><i class="icon-menu display-block"></i></a>
                    </div>
                </div>
            </li>-->

            <li class="dropdown dropdown-user">
                <a class="dropdown-toggle" data-toggle="dropdown">
                    <img src="/svg/placeholder.jpg" alt="">
                    <span>Admin</span>
                    <i class="caret"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="#"><i class="icon-user-plus"></i> My profile</a></li>
                    <li><a href="#"><i class="icon-cog5"></i> Account settings</a></li>
                    <li><a href="/admin/logout"><i class="icon-switch2"></i> Logout</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
<!-- /main navbar -->


<!-- Page container -->
<div class="page-container">

    <!-- Page content -->
    <div class="page-content">

        <!-- Main sidebar -->
        <div class="sidebar sidebar-main">
            <div class="sidebar-content">

                <!-- User menu -->
                <div class="sidebar-user">
                    <div class="category-content">
                        <div class="media">
                            <a href="#" class="media-left"><img src="/svg/placeholder.jpg" class="img-circle img-sm" alt=""></a>
                            <div class="media-body">
                                <span class="media-heading text-semibold">Super Admin</span>
                                <div class="text-size-mini text-muted">
                                    <i class="icon-pin text-size-small"></i> &nbsp;Santa Ana, CA
                                </div>
                            </div>

                            <!--<div class="media-right media-middle">
                                <ul class="icons-list">
                                    <li>
                                        <a href="#"><i class="icon-cog3"></i></a>
                                    </li>
                                </ul>
                            </div>-->
                        </div>
                    </div>
                </div>
                <!-- /user menu -->


                <!-- Main navigation -->
                <div class="sidebar-category sidebar-category-visible">
                    <div class="category-content no-padding">
                        <ul class="navigation navigation-main navigation-accordion">

                            <!-- Main -->
                            <li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
                            <li class="active"><a href="home.html"><i class="icon-home4"></i> <span>Dashboard</span></a></li>
                            <li>
                                <a href="#"><i class=" icon-users"></i> <span>User Managment</span></a>
                                <ul>
                                    <li><a href="admin.html">Admin Users</a></li>
                                    <li><a href="advocates.html">Advocates</a></li>
                                    <li><a href="doctors.html">Doctors</a></li>
                                    <li><a href="/add_patient_form">Patient</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i class="icon-user-check"></i> <span>Role Managment</span></a>
                                <ul>
                                    <li><a href="role.html">Role Users</a></li>
                                    <li><a href="groups.html">Groups</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i class="icon-ticket"></i> <span>Tickets Managment</span></a>
                                <ul>
                                    <li><a href="tickets.html">Tickets</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href="#"><i class=" icon-calendar5"></i> <span>Appointment Managment</span></a>
                                <ul>
                                    <li><a href="appointment.html">Appointments</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href="#"><i class="icon-folder"></i> <span>File Manager</span></a>
                                <ul>
                                    <li><a href="files.html">Files</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href="#"><i class="icon-stats-dots"></i> <span>Reports</span></a>
                                <ul>
                                    <li><a href="daily_reports.html">Daily Reports</a></li>
                                    <li><a href="summary.html">Complete Summary</a></li>
                                </ul>
                            </li>
                            <!-- /page kits -->

                        </ul>
                    </div>
                </div>
                <!-- /main navigation -->

            </div>
        </div>
        <!-- /main sidebar -->


        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Page header -->
            <div class="page-header page-header-default">
                <div class="page-header-content">
                    <div class="page-title">
                        <h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">Home</span> - Dashboard</h4>
                    </div>

                    <div class="heading-elements">
                        <div class="heading-btn-group">
                            <a href="#" class="btn btn-link btn-float has-text"><i class="icon-bars-alt text-primary"></i><span>Statistics</span></a>
                            <a href="#" class="btn btn-link btn-float has-text"><i class="icon-calculator text-primary"></i> <span>Invoices</span></a>
                            <a href="#" class="btn btn-link btn-float has-text"><i class="icon-calendar5 text-primary"></i> <span>Schedule</span></a>
                        </div>
                    </div>
                </div>

                <div class="breadcrumb-line">
                    <ul class="breadcrumb">
                        <li><a href="index.html"><i class="icon-home2 position-left"></i> Home</a></li>
                        <li class="active">Dashboard</li>
                    </ul>

                    <ul class="breadcrumb-elements">
                        <li><a href="#"><i class="icon-comment-discussion position-left"></i> Support</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="icon-gear position-left"></i>
                                Settings
                                <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><a href="#"><i class="icon-user-lock"></i> Account security</a></li>
                                <li><a href="#"><i class="icon-statistics"></i> Analytics</a></li>
                                <li><a href="#"><i class="icon-accessibility"></i> Accessibility</a></li>
                                <li class="divider"></li>
                                <li><a href="#"><i class="icon-gear"></i> All settings</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /page header -->


            <!-- Content area -->
            <div class="content">

                <div class="row">
                    <div class="col-lg-3">

                        <!-- Members online -->
                        <div class="panel bg-teal-400">
                            <div class="panel-body">
                                <div class="heading-elements">
                                    <i class=" icon-users4"></i>
                                </div>

                                <h3 class="no-margin">400</h3>
                                Advocates
                            </div>

                            <div class="container-fluid">
                                <div id="members-online"><svg width="247.546875" height="50"><g width="247.546875"><rect class="d3-random-bars" width="7.130979938271604" x="3.056134259259259" height="47.368421052631575" y="2.631578947368425" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="13.243248456790123" height="44.73684210526316" y="5.2631578947368425" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="23.430362654320987" height="50" y="0" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="33.61747685185185" height="44.73684210526316" y="5.2631578947368425" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="43.804591049382715" height="28.947368421052634" y="21.052631578947366" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="53.991705246913575" height="28.947368421052634" y="21.052631578947366" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="64.17881944444444" height="39.473684210526315" y="10.526315789473685" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="74.3659336419753" height="34.21052631578947" y="15.789473684210527" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="84.55304783950616" height="50" y="0" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="94.74016203703702" height="39.473684210526315" y="10.526315789473685" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="104.92727623456788" height="28.947368421052634" y="21.052631578947366" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="115.11439043209876" height="34.21052631578947" y="15.789473684210527" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="125.30150462962962" height="42.10526315789473" y="7.894736842105267" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="135.4886188271605" height="39.473684210526315" y="10.526315789473685" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="145.67573302469137" height="39.473684210526315" y="10.526315789473685" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="155.86284722222223" height="34.21052631578947" y="15.789473684210527" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="166.0499614197531" height="36.84210526315789" y="13.15789473684211" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="176.23707561728395" height="36.84210526315789" y="13.15789473684211" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="186.4241898148148" height="47.368421052631575" y="2.631578947368425" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="196.61130401234567" height="36.84210526315789" y="13.15789473684211" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="206.79841820987653" height="47.368421052631575" y="2.631578947368425" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="216.98553240740742" height="31.57894736842105" y="18.42105263157895" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="227.17264660493828" height="31.57894736842105" y="18.42105263157895" style="fill: rgba(255, 255, 255, 0.5);"></rect><rect class="d3-random-bars" width="7.130979938271604" x="237.35976080246914" height="50" y="0" style="fill: rgba(255, 255, 255, 0.5);"></rect></g></svg></div>
                            </div>
                        </div>
                        <!-- /members online -->

                    </div>

                    <div class="col-lg-3">

                        <!-- Current server load -->
                        <div class="panel bg-pink-400">
                            <div class="panel-body">
                                <div class="heading-elements">
                                    <i class=" icon-users4"></i>
                                </div>


                                <h3 class="no-margin">100</h3>
                                Nurses
                            </div>

                            <div id="server-load"><svg width="267.546875" height="50"><g transform="translate(0,0)" width="267.546875"><defs><clipPath id="load-clip-server-load"><rect class="load-clip" width="267.546875" height="50"></rect></clipPath></defs><g clip-path="url(#load-clip-server-load)"><path d="M-10.290264423076923,38.333333333333336L-8.575220352564102,32.333333333333336C-6.860176282051282,26.333333333333336,-3.430088141025641,14.333333333333334,0,7.888888888888889C3.430088141025641,1.444444444444445,6.860176282051282,0.5555555555555565,10.290264423076923,3.8888888888888893C13.720352564102564,7.222222222222222,17.150440705128204,14.777777777777777,20.580528846153847,16.555555555555554C24.01061698717949,18.333333333333332,27.440705128205128,14.333333333333332,30.87079326923077,13.888888888888886C34.30088141025641,13.444444444444443,37.73096955128205,16.555555555555554,41.16105769230769,14.777777777777777C44.59114583333333,13,48.02123397435897,6.333333333333334,51.45132211538461,9.222222222222221C54.881410256410255,12.11111111111111,58.3114983974359,24.555555555555554,61.74158653846153,28.33333333333333C65.17167467948718,32.11111111111111,68.60176282051282,27.22222222222222,72.03185096153845,25C75.46193910256409,22.77777777777778,78.89202724358974,23.22222222222222,82.32211538461539,22.77777777777778C85.75220352564102,22.333333333333336,89.18229166666666,21,92.6123798076923,18.77777777777778C96.04246794871794,16.555555555555554,99.47255608974359,13.444444444444443,102.90264423076923,11.666666666666664C106.33273237179486,9.888888888888888,109.7628205128205,9.444444444444443,113.19290865384613,8.333333333333332C116.62299679487178,7.2222222222222205,120.05308493589743,5.444444444444441,123.48317307692307,4.555555555555552C126.91326121794872,3.6666666666666625,130.34334935897436,3.6666666666666625,133.77343749999997,7.6666666666666625C137.20352564102564,11.666666666666663,140.63361378205127,19.666666666666664,144.0637019230769,25.444444444444443C147.49379006410254,31.22222222222222,150.92387820512818,34.77777777777778,154.35396634615384,35C157.78405448717947,35.22222222222222,161.21414262820514,32.111111111111114,164.64423076923077,31.888888888888886C168.0743189102564,31.666666666666664,171.50440705128204,34.33333333333333,174.9344951923077,33.44444444444444C178.36458333333331,32.55555555555556,181.79467147435895,28.11111111111111,185.2247596153846,26.333333333333332C188.65484775641022,24.555555555555557,192.08493589743586,25.444444444444443,195.51502403846152,22.333333333333332C198.94511217948715,19.22222222222222,202.37520032051282,12.11111111111111,205.80528846153845,12.333333333333332C209.2353766025641,12.555555555555554,212.66546474358972,20.11111111111111,216.09555288461536,24.33333333333333C219.525641025641,28.555555555555554,222.95572916666663,29.444444444444443,226.38581730769226,31C229.8159054487179,32.55555555555556,233.24599358974356,34.77777777777777,236.67608173076923,30.77777777777778C240.10616987179486,26.777777777777775,243.5362580128205,16.555555555555554,246.96634615384613,13.888888888888888C250.3964342948718,11.222222222222221,253.82652243589743,16.11111111111111,257.25661057692304,21.444444444444443C260.68669871794873,26.77777777777778,264.11678685897436,32.55555555555556,267.546875,30.555555555555557C270.97696314102564,28.555555555555557,274.40705128205127,18.77777777777778,277.8371394230769,15.88888888888889C281.26722756410254,13,284.6973157051282,17,286.412359775641,19L288.1274038461538,21L288.1274038461538,50L286.412359775641,49.999999999999986C284.6973157051282,49.99999999999999,281.26722756410254,49.99999999999999,277.8371394230769,49.999999999999986C274.40705128205127,49.99999999999999,270.97696314102564,49.99999999999999,267.546875,49.999999999999986C264.11678685897436,49.99999999999999,260.68669871794873,49.99999999999999,257.25661057692304,49.999999999999986C253.82652243589743,49.99999999999999,250.3964342948718,49.99999999999999,246.96634615384613,49.999999999999986C243.5362580128205,49.99999999999999,240.10616987179486,49.99999999999999,236.67608173076923,49.999999999999986C233.24599358974356,49.99999999999999,229.8159054487179,49.99999999999999,226.38581730769226,49.999999999999986C222.95572916666663,49.99999999999999,219.525641025641,49.99999999999999,216.09555288461536,49.999999999999986C212.66546474358972,49.99999999999999,209.2353766025641,49.99999999999999,205.80528846153845,49.999999999999986C202.37520032051282,49.99999999999999,198.94511217948715,49.99999999999999,195.51502403846152,49.999999999999986C192.08493589743586,49.99999999999999,188.65484775641022,49.99999999999999,185.2247596153846,49.999999999999986C181.79467147435895,49.99999999999999,178.36458333333331,49.99999999999999,174.9344951923077,49.999999999999986C171.50440705128204,49.99999999999999,168.0743189102564,49.99999999999999,164.64423076923077,49.999999999999986C161.21414262820514,49.99999999999999,157.78405448717947,49.99999999999999,154.35396634615384,49.999999999999986C150.92387820512818,49.99999999999999,147.49379006410254,49.99999999999999,144.0637019230769,49.999999999999986C140.63361378205127,49.99999999999999,137.20352564102564,49.99999999999999,133.77343749999997,49.999999999999986C130.34334935897436,49.99999999999999,126.91326121794872,49.99999999999999,123.48317307692307,49.999999999999986C120.05308493589743,49.99999999999999,116.62299679487178,49.99999999999999,113.19290865384613,49.999999999999986C109.7628205128205,49.99999999999999,106.33273237179486,49.99999999999999,102.90264423076923,49.999999999999986C99.47255608974359,49.99999999999999,96.04246794871794,49.99999999999999,92.6123798076923,49.999999999999986C89.18229166666666,49.99999999999999,85.75220352564102,49.99999999999999,82.32211538461537,49.999999999999986C78.89202724358974,49.99999999999999,75.46193910256409,49.99999999999999,72.03185096153845,49.999999999999986C68.60176282051282,49.99999999999999,65.17167467948718,49.99999999999999,61.74158653846153,49.999999999999986C58.3114983974359,49.99999999999999,54.881410256410255,49.99999999999999,51.45132211538461,49.999999999999986C48.02123397435897,49.99999999999999,44.59114583333333,49.99999999999999,41.161057692307686,49.999999999999986C37.73096955128205,49.99999999999999,34.30088141025641,49.99999999999999,30.87079326923077,49.999999999999986C27.440705128205128,49.99999999999999,24.01061698717949,49.99999999999999,20.580528846153847,49.999999999999986C17.150440705128204,49.99999999999999,13.720352564102564,49.99999999999999,10.290264423076923,49.999999999999986C6.860176282051282,49.99999999999999,3.430088141025641,49.99999999999999,0,49.999999999999986C-3.430088141025641,49.99999999999999,-6.860176282051282,49.99999999999999,-8.575220352564102,49.999999999999986L-10.290264423076923,50Z" class="d3-area" style="fill: rgba(255, 255, 255, 0.5); opacity: 1;" transform="translate(-1.2759927520751952,0)"></path></g></g></svg></div>
                        </div>
                        <!-- /current server load -->

                    </div>

                    <div class="col-lg-3">

                        <!-- Today's revenue -->
                        <div class="panel bg-blue-400">
                            <div class="panel-body">
                                <div class="heading-elements">
                                    <i class=" icon-users4"></i>
                                </div>


                                <h3 class="no-margin">100</h3>
                                Social workers
                            </div>

                            <div id="today-revenue"><svg width="267.546875" height="50"><g transform="translate(0,0)" width="267.546875"><defs><clipPath id="clip-line-small"><rect class="clip" width="267.546875" height="50"></rect></clipPath></defs><path d="M20,8.46153846153846L57.92447916666667,25.76923076923077L95.84895833333334,5L133.7734375,15.384615384615383L171.69791666666666,5L209.62239583333334,36.15384615384615L247.546875,8.46153846153846" clip-path="url(#clip-line-small)" class="d3-line d3-line-medium" style="stroke: rgb(255, 255, 255);"></path><g><line class="d3-line-guides" x1="20" y1="50" x2="20" y2="8.46153846153846" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="57.92447916666667" y1="50" x2="57.92447916666667" y2="25.76923076923077" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="95.84895833333334" y1="50" x2="95.84895833333334" y2="5" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="133.7734375" y1="50" x2="133.7734375" y2="15.384615384615383" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="171.69791666666666" y1="50" x2="171.69791666666666" y2="5" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="209.62239583333334" y1="50" x2="209.62239583333334" y2="36.15384615384615" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="247.546875" y1="50" x2="247.546875" y2="8.46153846153846" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line></g><g><circle class="d3-line-circle d3-line-circle-medium" cx="20" cy="8.46153846153846" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="57.92447916666667" cy="25.76923076923077" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="95.84895833333334" cy="5" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="133.7734375" cy="15.384615384615383" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="171.69791666666666" cy="5" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="209.62239583333334" cy="36.15384615384615" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="247.546875" cy="8.46153846153846" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle></g></g></svg></div>
                        </div>
                        <!-- /today's revenue -->

                    </div>
                    <div class="col-lg-3">

                        <!-- Today's revenue -->
                        <div class="panel bg-blue-400">
                            <div class="panel-body">
                                <div class="heading-elements">
                                    <i class=" icon-users4"></i>
                                </div>


                                <h3 class="no-margin">100</h3>
                                Doctors
                            </div>

                            <div id="today-revenue"><svg width="267.546875" height="50"><g transform="translate(0,0)" width="267.546875"><defs><clipPath id="clip-line-small"><rect class="clip" width="267.546875" height="50"></rect></clipPath></defs><path d="M20,8.46153846153846L57.92447916666667,25.76923076923077L95.84895833333334,5L133.7734375,15.384615384615383L171.69791666666666,5L209.62239583333334,36.15384615384615L247.546875,8.46153846153846" clip-path="url(#clip-line-small)" class="d3-line d3-line-medium" style="stroke: rgb(255, 255, 255);"></path><g><line class="d3-line-guides" x1="20" y1="50" x2="20" y2="8.46153846153846" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="57.92447916666667" y1="50" x2="57.92447916666667" y2="25.76923076923077" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="95.84895833333334" y1="50" x2="95.84895833333334" y2="5" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="133.7734375" y1="50" x2="133.7734375" y2="15.384615384615383" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="171.69791666666666" y1="50" x2="171.69791666666666" y2="5" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="209.62239583333334" y1="50" x2="209.62239583333334" y2="36.15384615384615" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line><line class="d3-line-guides" x1="247.546875" y1="50" x2="247.546875" y2="8.46153846153846" style="stroke: rgba(255, 255, 255, 0.3); stroke-dasharray: 4, 2; shape-rendering: crispedges;"></line></g><g><circle class="d3-line-circle d3-line-circle-medium" cx="20" cy="8.46153846153846" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="57.92447916666667" cy="25.76923076923077" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="95.84895833333334" cy="5" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="133.7734375" cy="15.384615384615383" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="171.69791666666666" cy="5" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="209.62239583333334" cy="36.15384615384615" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle><circle class="d3-line-circle d3-line-circle-medium" cx="247.546875" cy="8.46153846153846" r="3" style="stroke: rgb(255, 255, 255); fill: rgb(41, 182, 246); opacity: 1;"></circle></g></g></svg></div>
                        </div>
                        <!-- /today's revenue -->

                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">

                        <!-- Traffic sources -->
                        <div class="panel panel-flat">
                            <div class="panel-heading">
                                <h6 class="panel-title">Traffic sources<a class="heading-elements-toggle"><i class="icon-more"></i></a></h6>
                                <div class="heading-elements">
                                    <form class="heading-form" action="#">
                                        <div class="form-group">
                                            <label class="checkbox-inline checkbox-switchery checkbox-right switchery-xs">
                                                <input type="checkbox" class="switch" checked="checked" data-switchery="true" style="display: none;"><span class="switchery switchery-default" style="background-color: rgb(76, 175, 80); border-color: rgb(76, 175, 80); box-shadow: rgb(76, 175, 80) 0px 0px 0px 8px inset; transition: border 0.4s ease 0s, box-shadow 0.4s ease 0s, background-color 1.2s ease 0s;"><small style="left: 14px; background-color: rgb(255, 255, 255); transition: background-color 0.4s ease 0s, left 0.2s ease 0s;"></small></span>
                                                Live update:
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <ul class="list-inline text-center">
                                            <li>
                                                <a href="#" class="btn border-teal text-teal btn-flat btn-rounded btn-icon btn-xs valign-text-bottom"><i class="icon-plus3"></i></a>
                                            </li>
                                            <li class="text-left">
                                                <div class="text-semibold">New visitors</div>
                                                <div class="text-muted">2,349 avg</div>
                                            </li>
                                        </ul>

                                        <div class="col-lg-10 col-lg-offset-1">
                                            <div class="content-group" id="new-visitors"><svg width="168.34375" height="35"><g transform="translate(0,0)" width="168.34375"><defs><clipPath id="load-clip-new-visitors"><rect class="load-clip" width="168.34375" height="35"></rect></clipPath></defs><g clip-path="url(#load-clip-new-visitors)"><path d="M-6.474759615384616,18.333333333333332L-5.395633012820513,16.944444444444443C-4.316506410256411,15.555555555555554,-2.1582532051282053,12.777777777777775,0,10.416666666666666C2.1582532051282053,8.055555555555554,4.316506410256411,6.111111111111109,6.474759615384616,7.499999999999997C8.633012820512821,8.888888888888886,10.791266025641026,13.611111111111109,12.94951923076923,14.305555555555555C15.107772435897436,14.999999999999998,17.266025641025642,11.666666666666664,19.424278846153847,10.416666666666666C21.58253205128205,9.166666666666664,23.740785256410255,9.999999999999998,25.89903846153846,10.416666666666666C28.057291666666668,10.833333333333332,30.215544871794872,10.833333333333332,32.37379807692307,13.333333333333332C34.532051282051285,15.833333333333332,36.69030448717949,20.833333333333332,38.848557692307686,20.416666666666668C41.0068108974359,20,43.1650641025641,14.166666666666664,45.32331730769231,13.75C47.48157051282051,13.333333333333332,49.639823717948715,18.333333333333332,51.79807692307692,17.638888888888886C53.95633012820513,16.944444444444443,56.114583333333336,10.555555555555554,58.27283653846153,9.861111111111109C60.431089743589745,9.166666666666664,62.58934294871795,14.166666666666666,64.74759615384615,16.25C66.90584935897436,18.333333333333336,69.06410256410257,17.5,71.22235576923076,17.36111111111111C73.38060897435898,17.22222222222222,75.53886217948718,17.77777777777778,77.69711538461537,17.77777777777778C79.85536858974359,17.77777777777778,82.0136217948718,17.22222222222222,84.17187499999999,14.722222222222221C86.3301282051282,12.222222222222221,88.48838141025641,7.777777777777778,90.6466346153846,5.277777777777778C92.80488782051282,2.7777777777777777,94.96314102564102,2.2222222222222223,97.12139423076923,1.9444444444444446C99.27964743589743,1.6666666666666667,101.43790064102564,1.6666666666666667,103.59615384615384,4.027777777777777C105.75440705128206,6.3888888888888875,107.91266025641026,11.111111111111109,110.07091346153845,13.61111111111111C112.22916666666667,16.111111111111107,114.38741987179488,16.388888888888886,116.54567307692308,15.277777777777779C118.70392628205127,14.166666666666666,120.86217948717947,11.666666666666666,123.02043269230768,9.305555555555555C125.17868589743588,6.944444444444443,127.33693910256409,4.72222222222222,129.4951923076923,4.861111111111109C131.6534455128205,4.999999999999997,133.81169871794873,7.499999999999997,135.9699519230769,8.888888888888886C138.12820512820514,10.277777777777775,140.28645833333331,10.555555555555554,142.44471153846155,12.361111111111109C144.60296474358972,14.166666666666664,146.76121794871796,17.5,148.91947115384613,18.47222222222222C151.07772435897436,19.444444444444443,153.23597756410254,18.055555555555554,155.39423076923077,14.86111111111111C157.55248397435895,11.666666666666666,159.71073717948718,6.666666666666666,161.86899038461536,6.666666666666666C164.0272435897436,6.666666666666666,166.18549679487177,11.666666666666666,168.34375,15.13888888888889C170.5020032051282,18.61111111111111,172.6602564102564,20.555555555555557,174.8185096153846,21.52777777777778C176.97676282051282,22.5,179.13501602564102,22.5,180.2141426282051,22.5L181.29326923076923,22.5" class="d3-line d3-line-medium" style="stroke: rgb(38, 166, 154); opacity: 1;" transform="translate(-6.474759578704834,0)"></path></g></g></svg></div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4">
                                        <ul class="list-inline text-center">
                                            <li>
                                                <a href="#" class="btn border-warning-400 text-warning-400 btn-flat btn-rounded btn-icon btn-xs valign-text-bottom"><i class="icon-watch2"></i></a>
                                            </li>
                                            <li class="text-left">
                                                <div class="text-semibold">New sessions</div>
                                                <div class="text-muted">08:20 avg</div>
                                            </li>
                                        </ul>

                                        <div class="col-lg-10 col-lg-offset-1">
                                            <div class="content-group" id="new-sessions"><svg width="168.34375" height="35"><g transform="translate(0,0)" width="168.34375"><defs><clipPath id="load-clip-new-sessions"><rect class="load-clip" width="168.34375" height="35"></rect></clipPath></defs><g clip-path="url(#load-clip-new-sessions)"><path d="M-6.474759615384616,15L-5.395633012820513,12.777777777777779C-4.316506410256411,10.555555555555555,-2.1582532051282053,6.111111111111111,0,7.222222222222223C2.1582532051282053,8.333333333333334,4.316506410256411,15.000000000000002,6.474759615384616,15.27777777777778C8.633012820512821,15.555555555555557,10.791266025641026,9.444444444444446,12.94951923076923,6.527777777777778C15.107772435897436,3.6111111111111103,17.266025641025642,3.888888888888887,19.424278846153847,7.083333333333331C21.58253205128205,10.277777777777775,23.740785256410255,16.38888888888889,25.89903846153846,19.305555555555557C28.057291666666668,22.22222222222222,30.215544871794872,21.944444444444446,32.37379807692307,20.694444444444446C34.532051282051285,19.444444444444446,36.69030448717949,17.22222222222222,38.848557692307686,15.972222222222221C41.0068108974359,14.722222222222221,43.1650641025641,14.444444444444443,45.32331730769231,13.472222222222221C47.48157051282051,12.499999999999998,49.639823717948715,10.833333333333332,51.79807692307692,10.555555555555555C53.95633012820513,10.277777777777779,56.114583333333336,11.38888888888889,58.27283653846153,11.25C60.431089743589745,11.11111111111111,62.58934294871795,9.722222222222221,64.74759615384615,11.805555555555554C66.90584935897436,13.888888888888886,69.06410256410257,19.444444444444443,71.22235576923076,21.805555555555554C73.38060897435898,24.166666666666664,75.53886217948718,23.333333333333332,77.69711538461537,23.194444444444443C79.85536858974359,23.055555555555557,82.0136217948718,23.61111111111111,84.17187499999999,23.75C86.3301282051282,23.888888888888886,88.48838141025641,23.611111111111107,90.6466346153846,20.416666666666664C92.80488782051282,17.22222222222222,94.96314102564102,11.11111111111111,97.12139423076923,11.25C99.27964743589743,11.38888888888889,101.43790064102564,17.77777777777778,103.59615384615384,19.166666666666664C105.75440705128206,20.555555555555557,107.91266025641026,16.944444444444443,110.07091346153845,14.166666666666668C112.22916666666667,11.38888888888889,114.38741987179488,9.444444444444443,116.54567307692308,11.25C118.70392628205127,13.055555555555554,120.86217948717947,18.61111111111111,123.02043269230768,18.61111111111111C125.17868589743588,18.61111111111111,127.33693910256409,13.055555555555554,129.4951923076923,11.11111111111111C131.6534455128205,9.166666666666666,133.81169871794873,10.833333333333334,135.9699519230769,10.833333333333334C138.12820512820514,10.833333333333334,140.28645833333331,9.166666666666666,142.44471153846155,7.777777777777776C144.60296474358972,6.3888888888888875,146.76121794871796,5.277777777777775,148.91947115384613,5.833333333333331C151.07772435897436,6.388888888888887,153.23597756410254,8.611111111111109,155.39423076923077,12.222222222222221C157.55248397435895,15.833333333333332,159.71073717948718,20.833333333333332,161.86899038461536,20.27777777777778C164.0272435897436,19.72222222222222,166.18549679487177,13.61111111111111,168.34375,9.999999999999998C170.5020032051282,6.3888888888888875,172.6602564102564,5.277777777777775,174.8185096153846,5.277777777777776C176.97676282051282,5.277777777777775,179.13501602564102,6.3888888888888875,180.2141426282051,6.944444444444443L181.29326923076923,7.499999999999999" class="d3-line d3-line-medium" style="stroke: rgb(255, 112, 67); opacity: 1;" transform="translate(-6.474759578704834,0)"></path></g></g></svg></div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4">
                                        <ul class="list-inline text-center">
                                            <li>
                                                <a href="#" class="btn border-indigo-400 text-indigo-400 btn-flat btn-rounded btn-icon btn-xs valign-text-bottom"><i class="icon-people"></i></a>
                                            </li>
                                            <li class="text-left">
                                                <div class="text-semibold">Total online</div>
                                                <div class="text-muted"><span class="status-mark border-success position-left"></span> 5,378 avg</div>
                                            </li>
                                        </ul>

                                        <div class="col-lg-10 col-lg-offset-1">
                                            <div class="content-group" id="total-online"><svg width="168.34375" height="35"><g transform="translate(0,0)" width="168.34375"><defs><clipPath id="load-clip-total-online"><rect class="load-clip" width="168.34375" height="35"></rect></clipPath></defs><g clip-path="url(#load-clip-total-online)"><path d="M-6.474759615384616,24.166666666666668L-5.395633012820513,24.444444444444443C-4.316506410256411,24.72222222222222,-2.1582532051282053,25.27777777777778,0,23.47222222222222C2.1582532051282053,21.666666666666664,4.316506410256411,17.5,6.474759615384616,13.75C8.633012820512821,10,10.791266025641026,6.666666666666667,12.94951923076923,8.194444444444445C15.107772435897436,9.722222222222221,17.266025641025642,16.11111111111111,19.424278846153847,16.11111111111111C21.58253205128205,16.11111111111111,23.740785256410255,9.722222222222221,25.89903846153846,6.666666666666666C28.057291666666668,3.6111111111111103,30.215544871794872,3.888888888888887,32.37379807692307,4.72222222222222C34.532051282051285,5.555555555555554,36.69030448717949,6.944444444444443,38.848557692307686,9.999999999999998C41.0068108974359,13.055555555555554,43.1650641025641,17.77777777777778,45.32331730769231,17.916666666666668C47.48157051282051,18.055555555555557,49.639823717948715,13.61111111111111,51.79807692307692,13.472222222222221C53.95633012820513,13.333333333333334,56.114583333333336,17.5,58.27283653846153,19.305555555555557C60.431089743589745,21.111111111111114,62.58934294871795,20.555555555555557,64.74759615384615,19.72222222222222C66.90584935897436,18.888888888888886,69.06410256410257,17.77777777777778,71.22235576923076,15.555555555555554C73.38060897435898,13.333333333333332,75.53886217948718,10,77.69711538461537,11.527777777777777C79.85536858974359,13.055555555555554,82.0136217948718,19.444444444444443,84.17187499999999,18.75C86.3301282051282,18.055555555555554,88.48838141025641,10.277777777777775,90.6466346153846,7.777777777777775C92.80488782051282,5.277777777777775,94.96314102564102,8.055555555555554,97.12139423076923,8.194444444444443C99.27964743589743,8.333333333333332,101.43790064102564,5.833333333333333,103.59615384615384,7.222222222222222C105.75440705128206,8.61111111111111,107.91266025641026,13.88888888888889,110.07091346153845,13.88888888888889C112.22916666666667,13.88888888888889,114.38741987179488,8.61111111111111,116.54567307692308,7.361111111111112C118.70392628205127,6.111111111111112,120.86217948717947,8.88888888888889,123.02043269230768,8.611111111111112C125.17868589743588,8.333333333333334,127.33693910256409,5,129.4951923076923,3.472222222222222C131.6534455128205,1.9444444444444435,133.81169871794873,2.2222222222222205,135.9699519230769,3.749999999999998C138.12820512820514,5.277777777777775,140.28645833333331,8.055555555555554,142.44471153846155,11.527777777777775C144.60296474358972,14.999999999999998,146.76121794871796,19.166666666666664,148.91947115384613,18.19444444444444C151.07772435897436,17.22222222222222,153.23597756410254,11.11111111111111,155.39423076923077,8.75C157.55248397435895,6.388888888888888,159.71073717948718,7.777777777777777,161.86899038461536,10C164.0272435897436,12.222222222222221,166.18549679487177,15.277777777777777,168.34375,17.22222222222222C170.5020032051282,19.166666666666664,172.6602564102564,20,174.8185096153846,18.47222222222222C176.97676282051282,16.944444444444443,179.13501602564102,13.055555555555554,180.2141426282051,11.11111111111111L181.29326923076923,9.166666666666666" class="d3-line d3-line-medium" style="stroke: rgb(92, 107, 192); opacity: 1;" transform="translate(-6.474759578704834,0)"></path></g></g></svg></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- /traffic sources -->

                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-8">
                        <div class="panel panel-flat">
                            <div class="panel-heading">
                                <h6 class="panel-title">Support tickets<a class="heading-elements-toggle"><i class="icon-more"></i></a></h6>
                                <div class="heading-elements">
                                    <button type="button" class="btn btn-link daterange-ranges heading-btn text-semibold">
                                        <i class="icon-calendar3 position-left"></i> <span>December 29 - January 27</span> <b class="caret"></b>
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-xlg text-nowrap">
                                    <tbody>
                                    <tr>
                                        <td class="col-md-4">
                                            <div class="media-left media-middle">
                                                <div id="tickets-status"><svg width="42" height="42"><g transform="translate(21,21)"><g class="d3-arc" style="stroke: rgb(255, 255, 255); cursor: pointer;"><path d="M1.1634144591899855e-15,19A19,19 0 0,1 -12.326087772183463,-14.459168725498339L-6.163043886091732,-7.229584362749169A9.5,9.5 0 0,0 5.817072295949927e-16,9.5Z" style="fill: rgb(41, 182, 246);"></path></g><g class="d3-arc" style="stroke: rgb(255, 255, 255); cursor: pointer;"><path d="M-12.326087772183463,-14.459168725498339A19,19 0 0,1 14.331188229058796,-12.474656065130077L7.165594114529398,-6.237328032565038A9.5,9.5 0 0,0 -6.163043886091732,-7.229584362749169Z" style="fill: rgb(102, 187, 106);"></path></g><g class="d3-arc" style="stroke: rgb(255, 255, 255); cursor: pointer;"><path d="M14.331188229058796,-12.474656065130077A19,19 0 0,1 5.817072295949928e-15,19L2.908536147974964e-15,9.5A9.5,9.5 0 0,0 7.165594114529398,-6.237328032565038Z" style="fill: rgb(239, 83, 80);"></path></g></g></svg></div>
                                            </div>

                                            <div class="media-left">
                                                <h5 class="text-semibold no-margin">14,327 <small class="text-success text-size-base"><i class="icon-arrow-up12"></i> (+2.9%)</small></h5>
                                                <span class="text-muted"><span class="status-mark border-success position-left"></span> Jun 16, 10:00 am</span>
                                            </div>
                                        </td>

                                        <td class="col-md-3">
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn border-indigo-400 text-indigo-400 btn-flat btn-rounded btn-xs btn-icon"><i class="icon-alarm-add"></i></a>
                                            </div>

                                            <div class="media-left">
                                                <h5 class="text-semibold no-margin">
                                                    1,132 <small class="display-block no-margin">total tickets</small>
                                                </h5>
                                            </div>
                                        </td>

                                        <td class="col-md-3">
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn border-indigo-400 text-indigo-400 btn-flat btn-rounded btn-xs btn-icon"><i class="icon-spinner11"></i></a>
                                            </div>

                                            <div class="media-left">
                                                <h5 class="text-semibold no-margin">
                                                    06:25:00 <small class="display-block no-margin">response time</small>
                                                </h5>
                                            </div>
                                        </td>

                                        <td class="text-right col-md-2">
                                            <a href="#" class="btn bg-teal-400"><i class="icon-statistics position-left"></i> Report</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="table-responsive">
                                <table class="table text-nowrap">
                                    <thead>
                                    <tr>
                                        <th style="width: 50px">Due</th>
                                        <th style="width: 300px;">User</th>
                                        <th>Description</th>
                                        <th class="text-center" style="width: 20px;"><i class="icon-arrow-down12"></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="active border-double">
                                        <td colspan="3">Active tickets</td>
                                        <td class="text-right">
                                            <span class="badge bg-blue">24</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <h6 class="no-margin">12 <small class="display-block text-size-small no-margin">hours</small></h6>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn bg-teal-400 btn-rounded btn-icon btn-xs">
                                                    <span class="letter-icon">A</span>
                                                </a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default text-semibold letter-icon-title">Annabelle Doney</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                <span class="text-semibold">[#1183] Workaround for OS X selects printing bug</span>
                                                <span class="display-block text-muted">Chrome fixed the bug several versions ago, thus rendering this...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <h6 class="no-margin">16 <small class="display-block text-size-small no-margin">hours</small></h6>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#"><img src="/svg/placeholder.jpg" class="img-circle img-xs" alt=""></a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default text-semibold letter-icon-title">Chris Macintyre</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                <span class="text-semibold">[#1249] Vertically center carousel controls</span>
                                                <span class="display-block text-muted">Try any carousel control and reduce the screen width below...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <h6 class="no-margin">20 <small class="display-block text-size-small no-margin">hours</small></h6>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn bg-blue btn-rounded btn-icon btn-xs">
                                                    <span class="letter-icon">R</span>
                                                </a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default text-semibold letter-icon-title">Robert Hauber</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                <span class="text-semibold">[#1254] Inaccurate small pagination height</span>
                                                <span class="display-block text-muted">The height of pagination elements is not consistent with...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <h6 class="no-margin">40 <small class="display-block text-size-small no-margin">hours</small></h6>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn bg-warning-400 btn-rounded btn-icon btn-xs">
                                                    <span class="letter-icon">D</span>
                                                </a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default text-semibold letter-icon-title">Dex Sponheim</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-blue position-left"></span> Active</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                <span class="text-semibold">[#1184] Round grid column gutter operations</span>
                                                <span class="display-block text-muted">Left rounds up, right rounds down. should keep everything...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-checkmark3 text-success"></i> Resolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr class="active border-double">
                                        <td colspan="3">Resolved tickets</td>
                                        <td class="text-right">
                                            <span class="badge bg-success">42</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <i class="icon-checkmark3 text-success"></i>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn bg-success-400 btn-rounded btn-icon btn-xs">
                                                    <span class="letter-icon">A</span>
                                                </a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default letter-icon-title">Alan Macedo</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-success position-left"></span> Resolved</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                [#1046] Avoid some unnecessary HTML string
                                                <span class="display-block text-muted">Rather than building a string of HTML and then parsing it...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <i class="icon-checkmark3 text-success"></i>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn bg-pink-400 btn-rounded btn-icon btn-xs">
                                                    <span class="letter-icon">B</span>
                                                </a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default letter-icon-title">Brett Castellano</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-success position-left"></span> Resolved</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                [#1038] Update json configuration
                                                <span class="display-block text-muted">The <code>files</code> property is necessary to override the files property...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <i class="icon-checkmark3 text-success"></i>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#"><img src="/svg/placeholder.jpg" class="img-circle img-xs" alt=""></a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default">Roxanne Forbes</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-success position-left"></span> Resolved</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                [#1034] Tooltip multiple event
                                                <span class="display-block text-muted">Fix behavior when using tooltips and popovers that are...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr class="active border-double">
                                        <td colspan="3">Closed tickets</td>
                                        <td class="text-right">
                                            <span class="badge bg-danger">37</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <i class="icon-cross2 text-danger-400"></i>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#"><img src="/svg/placeholder.jpg" class="img-circle img-xs" alt=""></a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default">Mitchell Sitkin</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-danger position-left"></span> Closed</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                [#1040] Account for static form controls in form group
                                                <span class="display-block text-muted">Resizes control label's font-size and account for the standard...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropup">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-reload-alt text-blue"></i> Reopen issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <i class="icon-cross2 text-danger"></i>
                                        </td>
                                        <td>
                                            <div class="media-left media-middle">
                                                <a href="#" class="btn bg-brown-400 btn-rounded btn-icon btn-xs">
                                                    <span class="letter-icon">K</span>
                                                </a>
                                            </div>

                                            <div class="media-body">
                                                <a href="#" class="display-inline-block text-default letter-icon-title">Katleen Jensen</a>
                                                <div class="text-muted text-size-small"><span class="status-mark border-danger position-left"></span> Closed</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-default display-inline-block">
                                                [#1038] Proper sizing of form control feedback
                                                <span class="display-block text-muted">Feedback icon sizing inside a larger/smaller form-group...</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <ul class="icons-list">
                                                <li class="dropup">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>
                                                    <ul class="dropdown-menu dropdown-menu-right">
                                                        <li><a href="#"><i class="icon-undo"></i> Quick reply</a></li>
                                                        <li><a href="#"><i class="icon-history"></i> Full history</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#"><i class="icon-plus3 text-blue"></i> Unresolve issue</a></li>
                                                        <li><a href="#"><i class="icon-cross2 text-danger"></i> Close issue</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="panel panel-flat">
                            <div class="panel-heading">
                                <h6 class="panel-title">Log Details<a class="heading-elements-toggle"><i class="icon-more"></i></a></h6>
                                <div class="heading-elements">
                                    <form class="heading-form" action="#">
                                        <div class="form-group">
                                            <label class="checkbox checkbox-inline checkbox-switchery checkbox-right switchery-xs">
                                                <input type="checkbox" class="switcher" id="realtime" checked="checked">
                                                Realtime
                                            </label>
                                        </div>
                                    </form>
                                    <span class="badge bg-danger-400 heading-text">+86</span>
                                </div>
                            </div>

                            <div class="panel-body">
                                <div class="content-group-xs" id="bullets"></div>

                                <ul class="media-list">
                                    <li class="media">
                                        <div class="media-left">
                                            <a href="#" class="btn border-pink text-pink btn-flat btn-rounded btn-icon btn-xs"><i class="icon-statistics"></i></a>
                                        </div>

                                        <div class="media-body">
                                            Stats for July, 6: 1938 orders, $4220 revenue
                                            <div class="media-annotation">2 hours ago</div>
                                        </div>

                                        <div class="media-right media-middle">
                                            <ul class="icons-list">
                                                <li>
                                                    <a href="#"><i class="icon-arrow-right13"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li class="media">
                                        <div class="media-left">
                                            <a href="#" class="btn border-success text-success btn-flat btn-rounded btn-icon btn-xs"><i class="icon-checkmark3"></i></a>
                                        </div>

                                        <div class="media-body">
                                            Invoices <a href="#">#4732</a> and <a href="#">#4734</a> have been paid
                                            <div class="media-annotation">Dec 18, 18:36</div>
                                        </div>

                                        <div class="media-right media-middle">
                                            <ul class="icons-list">
                                                <li>
                                                    <a href="#"><i class="icon-arrow-right13"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li class="media">
                                        <div class="media-left">
                                            <a href="#" class="btn border-primary text-primary btn-flat btn-rounded btn-icon btn-xs"><i class="icon-alignment-unalign"></i></a>
                                        </div>

                                        <div class="media-body">
                                            Affiliate commission for June has been paid
                                            <div class="media-annotation">36 minutes ago</div>
                                        </div>

                                        <div class="media-right media-middle">
                                            <ul class="icons-list">
                                                <li>
                                                    <a href="#"><i class="icon-arrow-right13"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li class="media">
                                        <div class="media-left">
                                            <a href="#" class="btn border-warning-400 text-warning-400 btn-flat btn-rounded btn-icon btn-xs"><i class="icon-spinner11"></i></a>
                                        </div>

                                        <div class="media-body">
                                            Order <a href="#">#37745</a> from July, 1st has been refunded
                                            <div class="media-annotation">4 minutes ago</div>
                                        </div>

                                        <div class="media-right media-middle">
                                            <ul class="icons-list">
                                                <li>
                                                    <a href="#"><i class="icon-arrow-right13"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li class="media">
                                        <div class="media-left">
                                            <a href="#" class="btn border-teal-400 text-teal btn-flat btn-rounded btn-icon btn-xs"><i class="icon-redo2"></i></a>
                                        </div>

                                        <div class="media-body">
                                            Invoice <a href="#">#4769</a> has been sent to <a href="#">Robert Smith</a>
                                            <div class="media-annotation">Dec 12, 05:46</div>
                                        </div>

                                        <div class="media-right media-middle">
                                            <ul class="icons-list">
                                                <li>
                                                    <a href="#"><i class="icon-arrow-right13"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>


                <!-- Dashboard content -->


            </div>
            <!-- /dashboard content -->


            <!-- Footer -->
            <div class="footer text-muted">
                &copy; 2019. <a href="#">CCM</a> by <a href="#" target="_blank">VAC</a>
            </div>
            <!-- /footer -->

        </div>
        <!-- /content area -->

    </div>
    <!-- /main content -->

</div>
<!-- /page content -->

</div>
<!-- /page container -->

</body>
</html>
