@extends('main') 
@section('content')


<div class="row">
    <div class="panel panel-flat">
        <div class="panel-heading">
            <h5 class="panel-title">Patients<a class="heading-elements-toggle"><i class="icon-more"></i></a></h5>

        </div>


        <div class="panel-body">
            <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal_default">Add New <i class="icon-play3 position-right"></i></button>
        </div>
        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
            <div class="datatable-header">
                <div id="DataTables_Table_0_filter" class="dataTables_filter"><label><span>Filter:</span> <input type="search" class="" placeholder="Type to filter..." aria-controls="DataTables_Table_0"></label></div>
                <div class="dataTables_length" id="DataTables_Table_0_length"><label><span>Show:</span> <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="select2-hidden-accessible" tabindex="-1" aria-hidden="true"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: auto;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-DataTables_Table_0_length-ok-container"><span class="select2-selection__rendered" id="select2-DataTables_Table_0_length-ok-container" title="10">10</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></label></div>
            </div>
            <div class="datatable-scroll">
                <table class="table datatable-sorting dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                    <thead>
                        <tr role="row">
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="First Name: activate to sort column ascending">ID</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Last Name: activate to sort column ascending">Name</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Job Title: activate to sort column ascending">Email</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Job Title: activate to sort column ascending">Role</th>
                            <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending">Status</th>
                            <th class="text-center sorting_disabled" rowspan="1" colspan="1" aria-label="Actions" style="    width: 183px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr role="row" class="odd">
                            <td>1</td>
                            <td>Jonh Doe</td>
                            <td><a href="#">example@demo.com</a></td>
                            <td class="sorting_1">Super Admin</td>
                            <td><span class="label label-default">Inactive</span></td>
                            <td class="text-center">
                                <a href="#">
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                <a href="#">
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                            </td>
                        </tr>
                        <tr role="row" class="odd">
                            <td>1</td>
                            <td>Jonh Doe</td>
                            <td><a href="#">example@demo.com</a></td>
                            <td class="sorting_1">Report Viewer</td>
                            <td><span class="label label-default">Inactive</span></td>
                            <td class="text-center">
                                <a href="#">
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                <a href="#">
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                            </td>
                        </tr>
                        <tr role="row" class="odd">
                            <td>1</td>
                            <td>Jonh Doe</td>
                            <td><a href="#">example@demo.com</a></td>
                            <td class="sorting_1">Admin</td>
                            <td><span class="label label-default">Inactive</span></td>
                            <td class="text-center">
                                <a href="#">
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                <a href="#">
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                            </td>
                        </tr>
                        <tr role="row" class="odd">
                            <td>1</td>
                            <td>Jonh Doe</td>
                            <td><a href="#">example@demo.com</a></td>
                            <td class="sorting_1">Editor</td>
                            <td><span class="label label-default">Inactive</span></td>
                            <td class="text-center">
                                <a href="#">
                                                <i style="color:#ffa808;" class=" icon-pencil"></i>
                                            </a> &nbsp;
                                <a href="#">
                                                <i style="color:#0aa700;" class="icon-eye2"></i>
                                            </a>&nbsp;
                                <a href="#">
                                                <i style="color:#f70a0a;" class="icon-bin"></i>
                                            </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="datatable-footer">
                <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 15 entries</div>
                <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0"
                        id="DataTables_Table_0_previous">←</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a><a class="paginate_button " aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0">2</a></span>
                    <a class="paginate_button next" aria-controls="DataTables_Table_0" data-dt-idx="3" tabindex="0" id="DataTables_Table_0_next">→</a>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Dashboard content -->
<div>

</div>
<!-- /dashboard content -->


<!--new user-->
<div id="modal_default" class="modal fade in" style="display: none; padding-right: 17px;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h5 class="modal-title">Add New admin </h5>
            </div>

            <div class="modal-body">
                <div class="col-md-12">

                    <!-- Basic layout-->
                    <form action="#" class="form-horizontal">
                        <div class="panel panel-flat">
                            <div class="panel-heading">


                                <div class="panel-body">
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">Name:</label>
                                        <div class="col-lg-9">
                                            <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">Email:</label>
                                        <div class="col-lg-9">
                                            <input type="text" class="form-control" placeholder="Eugene Kopyov">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">Password:</label>
                                        <div class="col-lg-9">
                                            <input type="password" class="form-control" placeholder="Your strong password">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">Your state:</label>
                                        <div class="col-lg-9">
                                            <select class="select select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                                                <optgroup label="Alaskan/Hawaiian Time Zone">
                                                    <option value="AK">Alaska</option>
                                                    <option value="HI">Hawaii</option>
                                                </optgroup>
                                                <optgroup label="Pacific Time Zone">
                                                    <option value="CA">California</option>
                                                    <option value="NV">Nevada</option>
                                                    <option value="WA">Washington</option>
                                                </optgroup>
                                                <optgroup label="Mountain Time Zone">
                                                    <option value="AZ">Arizona</option>
                                                    <option value="CO">Colorado</option>
                                                    <option value="WY">Wyoming</option>
                                                </optgroup>
                                                <optgroup label="Central Time Zone">
                                                    <option value="AL">Alabama</option>
                                                    <option value="AR">Arkansas</option>
                                                    <option value="KY">Kentucky</option>
                                                </optgroup>
                                                <optgroup label="Eastern Time Zone">
                                                    <option value="CT">Connecticut</option>
                                                    <option value="DE">Delaware</option>
                                                    <option value="FL">Florida</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>




                                    <div class="text-right">
                                    </div>
                                </div>
                            </div>

                            <!-- /basic layout -->

                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Submit form <i class="icon-arrow-right14 position-right"></i></button>
                </div>

            </div>
        </div>
    </div>
</div>
<!-- new user-->
@endsection