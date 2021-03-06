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
    <script type="text/javascript" src="/js/pages/components_modals.js"></script>

    <script type="text/javascript" src="/js/plugins/forms/selects/select2.min.js"></script>
    <script type="text/javascript" src="/js/plugins/forms/styling/uniform.min.js"></script>
    <script type="text/javascript" src="/js/pages/form_layouts.js"></script>
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
            <li class="dropdown dropdown-user">
                <a class="dropdown-toggle" data-toggle="dropdown">
                    <img src="/svg/placeholder.jpg" alt="">
                    <span>Admin</span>
                    <i class="caret"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="#"><i class="icon-user-plus"></i> My profile</a></li>
                    <li><a href="#"><i class="icon-cog5"></i> Account settings</a></li>
                    <li><a href="/logout"><i class="icon-switch2"></i> Logout</a></li>
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
                                    <li><a href="patient.html">Patients</a></li>
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
                        <h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">Home</span> - Patients</h4>
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
                    <div class="panel panel-flat">
                        <div class="panel-heading">
                            <h5 class="panel-title">Patients<a class="heading-elements-toggle"><i class="icon-more"></i></a></h5>

                        </div>


                        <div class="panel-body">
                            <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal_default">Add New <i class="icon-play3 position-right"></i></button>
                        </div>
                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"><div class="datatable-header"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label><span>Filter:</span> <input type="search" class="" placeholder="Type to filter..." aria-controls="DataTables_Table_0"></label></div><div class="dataTables_length" id="DataTables_Table_0_length"><label><span>Show:</span> <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="select2-hidden-accessible" tabindex="-1" aria-hidden="true"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: auto;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-DataTables_Table_0_length-ok-container"><span class="select2-selection__rendered" id="select2-DataTables_Table_0_length-ok-container" title="10">10</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></label></div></div><div class="datatable-scroll"><table class="table datatable-sorting dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                    <thead>
                                    <tr role="row">
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="First Name: activate to sort column ascending">ID</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Last Name: activate to sort column ascending">Name</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Job Title: activate to sort column ascending">Email</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Job Title: activate to sort column ascending">Role</th>
                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending">Status</th>
                                        <th class="text-center sorting_disabled" rowspan="1" colspan="1" aria-label="Actions" style="    width: 183px;">Actions</th></tr>
                                    </thead>
                                    <tbody>
                                    <tr role="row" class="odd">
                                        <td>1</td>
                                        <td> <a href="#" data-toggle="modal" data-target="#modal_patient">Jonh Doe</a></td>
                                        <td><a href="#">example@demo.com</a></td>
                                        <td class="sorting_1">Patient</td>
                                        <td><span class="label label-default">Inactive</span></td>
                                        <td class="text-center">
                                            <a href="#" >
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                            <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                            <a href="#" >
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                                        </td>
                                    </tr>

                                    <tr role="row" class="odd">
                                        <td>1</td>
                                        <td> <a href="#" data-toggle="modal" data-target="#modal_patient">Jonh Doe</a></td>
                                        <td><a href="#">example@demo.com</a></td>
                                        <td class="sorting_1">Patient</td>
                                        <td><span class="label label-default">Inactive</span></td>
                                        <td class="text-center">
                                            <a href="#" >
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                            <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                            <a href="#" >
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                                        </td>
                                    </tr>

                                    <tr role="row" class="odd">
                                        <td>1</td>
                                        <td> <a href="#" data-toggle="modal" data-target="#modal_patient">Jonh Doe</a></td>
                                        <td><a href="#">example@demo.com</a></td>
                                        <td class="sorting_1">Patient</td>
                                        <td><span class="label label-default">Inactive</span></td>
                                        <td class="text-center">
                                            <a href="#" >
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                            <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                            <a href="#" >
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                                        </td>
                                    </tr>

                                    <tr role="row" class="odd">
                                        <td>1</td>
                                        <td> <a href="#" data-toggle="modal" data-target="#modal_patient">Jonh Doe</a></td>
                                        <td><a href="#">example@demo.com</a></td>
                                        <td class="sorting_1">Patient</td>
                                        <td><span class="label label-default">Inactive</span></td>
                                        <td class="text-center">
                                            <a href="#" >
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                            <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                            <a href="#" >
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table></div><div class="datatable-footer"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 15 entries</div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">←</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a><a class="paginate_button " aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0">2</a></span><a class="paginate_button next" aria-controls="DataTables_Table_0" data-dt-idx="3" tabindex="0" id="DataTables_Table_0_next">→</a></div></div></div>
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


<!-- /page container -->

<!--new user-->
<div id="modal_default" class="modal fade in" style="display: none; padding-right: 17px;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h5 class="modal-title">Add New Patient </h5>
            </div>

            <div class="modal-body">
                <div class="col-md-12">

                    <!-- Basic layout-->
                    <form action="/add_patient" class="form-horizontal" method="post">
                        @csrf
                        <div class="panel panel-flat">
                            <div class="panel-heading">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">Name:</label>
                                        <div class="col-lg-9">
                                            <input name="name" type="text" class="form-control" placeholder="Name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">Email:</label>
                                        <div class="col-lg-9">
                                            <input name="email" type="text" class="form-control" placeholder="Email">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">Password:</label>
                                        <div class="col-lg-9">
                                            <input name="password" type="password" class="form-control" placeholder="Your strong password">
                                        </div>
                                    </div>
                                    <div class="text-right">
                                    </div>
                                </div>
                            </div>
                            <!-- /basic layout -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Submit form <i class="icon-arrow-right14 position-right"></i></button>
                        </div>
                    </form>
            </div>
        </div>
        </div>
    </div>
</div>


<div id="modal_patient" class="modal fade in" style="display: none; padding-right: 17px;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h5 class="modal-title">Paitents Form </h5>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#form1" data-toggle="tab" aria-expanded="false">Form 1</a></li>
                    <li class=""><a href="#form2" data-toggle="tab" aria-expanded="false">Form 2</a></li>
                    <li class=""><a href="#form3" data-toggle="tab" aria-expanded="false">Form 3</a></li>
                    <li class=""><a href="#form4" data-toggle="tab" aria-expanded="false">Form 4</a></li>
                    <li class=""><a href="#form5" data-toggle="tab" aria-expanded="false">Form 5</a></li>

                </ul>
                <div id="myTabContent" class="tab-content">
                    <div class="tab-pane fade active in" id="form1">
                        <div class="col-md-12">

                            <!-- Basic layout-->
                            <form action="#" class="form-horizontal">
                                <div class="panel panel-flat">
                                    <div class="panel-heading">


                                        <div class="panel-body">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PATIENT:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF CAREGIVER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUBSTITUTE DECISION MAKER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PRIMARY HEALTH CARE PROVIDER (E.G. GP):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (1):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (2):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (3):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="text-right">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- /basic layout -->

                                </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Submit form <i class="icon-arrow-right14 position-right"></i></button>

                            </form>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="form2">
                        <div class="col-md-12">
                            <!-- Basic layout-->
                            <form action="#" class="form-horizontal">
                                <div class="panel panel-flat">
                                    <div class="panel-heading">
                                        <div class="panel-body">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PATIENT:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF CAREGIVER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUBSTITUTE DECISION MAKER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PRIMARY HEALTH CARE PROVIDER (E.G. GP):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (1):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (2):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (3):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="text-right">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- /basic layout -->

                                </div>


                                <div class="modal-footer">
                                    <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Submit form <i class="icon-arrow-right14 position-right"></i></button>
                                </div>

                            </form>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="form3">
                        <div class="col-md-12">

                            <!-- Basic layout-->
                            <form action="#" class="form-horizontal">
                                <div class="panel panel-flat">
                                    <div class="panel-heading">


                                        <div class="panel-body">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PATIENT:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF CAREGIVER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUBSTITUTE DECISION MAKER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PRIMARY HEALTH CARE PROVIDER (E.G. GP):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (1):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (2):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (3):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>





                                            <div class="text-right">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- /basic layout -->

                                </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Submit form <i class="icon-arrow-right14 position-right"></i></button>

                            </form>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="form4">
                        <div class="col-md-12">
                            <!-- Basic layout-->
                            <form action="#" class="form-horizontal">
                                <div class="panel panel-flat">
                                    <div class="panel-heading">
                                        <div class="panel-body">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PATIENT:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF CAREGIVER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUBSTITUTE DECISION MAKER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PRIMARY HEALTH CARE PROVIDER (E.G. GP):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (1):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (2):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (3):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>





                                            <div class="text-right">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- /basic layout -->

                                </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Submit form <i class="icon-arrow-right14 position-right"></i></button>

                            </form>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="form5">
                        <div class="col-md-12">
                            <!-- Basic layout-->
                            <form action="#" class="form-horizontal">
                                <div class="panel panel-flat">
                                    <div class="panel-heading">


                                        <div class="panel-body">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PATIENT:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF CAREGIVER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUBSTITUTE DECISION MAKER:</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF PRIMARY HEALTH CARE PROVIDER (E.G. GP):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (1):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (2):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">NAME OF SUPPORTING HEALTH CARE PROVIDER (3):</label>
                                                <div class="col-lg-8">
                                                    <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                                </div>
                                            </div>
                                            <div class="text-right">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /basic layout -->
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Submit form <i class="icon-arrow-right14 position-right"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
    </div>

<!-- new user-->
</body>
</html>

<!--<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>-->
<!------ Include the above in your HEAD tag ---------->



