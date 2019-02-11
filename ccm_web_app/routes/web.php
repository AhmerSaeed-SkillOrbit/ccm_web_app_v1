<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | This file is where you may define all of the routes that are handled
  | by your application. Just tell Laravel the URIs it should respond
  | to using a Closure or controller method. Build something great!
  |
 */

//////////////// PAGE NAVIGATION ////////////////////////////
//
//
//
//  General Pages //

Route::get('/', 'PageController@home')->middleware('page.filtering');

Route::get('/admin/login', 'PageController@adminLogin');

//Route::get('/admin/home', 'PageController@adminHome')->middleware('page.filtering');

Route::get('/admin/home', 'PageController@adminHome');

Route::get('forget_password', 'PageController@forgetPasswordForm');

Route::get('reset_password', 'PageController@resetPasswordForm');


Route::get('/', 'PageController@home')->middleware('page.filtering');

Route::get('login', 'PageController@login')->middleware('page.filtering');

Route::get('forget_password', 'PageController@forgetPasswordForm');

Route::get('reset_password', 'PageController@resetPasswordForm');

/// List Pages ///

Route::get('system_settings', 'PageController@systemSettingsList')->middleware('page.filtering');

Route::get('menu_bar', 'PageController@menuBarList')->middleware('page.filtering');

Route::get('user_roles', 'PageController@userRolesList')->middleware('page.filtering');

Route::get('user', 'PageController@userList')->middleware('page.filtering');

Route::get('services_product', 'PageController@servicesList')->middleware('page.filtering');

Route::get('port', 'PageController@portList')->middleware('page.filtering');

Route::get('port_type', 'PageController@portTypeList')->middleware('page.filtering');

Route::get('service_type', 'PageController@serviceTypeList')->middleware('page.filtering');

Route::get('payment_terms', 'PageController@paymentTermsList')->middleware('page.filtering');

Route::get('customer', 'PageController@customerList') ->middleware('page.filtering');

Route::get('vendor', 'PageController@vendorList')->middleware('page.filtering');

Route::get('rate_search', 'PageController@rateSearchList')->middleware('page.filtering');

Route::get('rate_set', 'PageController@rateSetList') ->middleware('page.filtering');

Route::get('quotation', 'PageController@quotationList') ->middleware('page.filtering');;

Route::get('customer_file', 'PageController@customerFileList')->middleware('page.filtering');

/// Form Pages ///

Route::get('system_settings_form/{formtype}/{id}', 'PageController@systemSettingsForm')->middleware('page.filtering');

Route::get('menu_bar_form/{formtype}/{id}', 'PageController@menuSettingsForm')->middleware('page.filtering');

Route::get('user_roles_form/{formtype}/{id}', 'PageController@userRolesForm')->middleware('page.filtering');

Route::get('signup/{formtype}', 'PageController@userForm'); //->middleware('page.filtering');

Route::get('services_product_form/{formtype}/{id}', 'PageController@servicesProductForm')->middleware('page.filtering');

Route::get('port_form/{formtype}/{id}', 'PageController@portForm')->middleware('page.filtering');

Route::get('port_type_form/{formtype}/{id}', 'PageController@portTypeForm')->middleware('page.filtering');

Route::get('service_type_form/{formtype}/{id}', 'PageController@serviceTypeForm')->middleware('page.filtering');

Route::get('customer_form/{formtype}/{id}', 'PageController@customerForm')->middleware('page.filtering');

Route::get('vendor_form/{formtype}/{id}', 'PageController@vendorForm')->middleware('page.filtering');

Route::get('task_approver', 'PageController@taskApproverList');

Route::get('payment_terms_form/{formtype}/{id}', 'PageController@paymentTermsForm')->middleware('page.filtering');

Route::get('rate_set_form/{formType}/{id}', 'PageController@rateSetForm')->middleware('page.filtering');

Route::get('quotation_form/{formType}/{id}', 'PageController@quotationForm')->middleware('page.filtering');

Route::get('customer_file_form/{formType}/{id}', 'PageController@customerFileForm')->middleware('page.filtering');

//////////////// CRUD Operations ////////////////////////////

//Route::post('login', "LoginController@login");

Route::post('/admin/login',"LoginController@login");

Route::get('/admin/logout', "LoginController@logout");

Route::post('system_settings_store', 'SystemSettingsController@store');

Route::post('system_settings_update', 'SystemSettingsController@update');

Route::post('menu_bar_store', 'MenuBarController@store');

Route::post('menu_bar_update', 'MenuBarController@update');

Route::get('menu_bar_delete/{id}', 'MenuBarController@destroy');

Route::post('signup_store', "UserController@store");

Route::post('user_form_update', "UserController@update");

Route::get('user_form_delete/{id}', "UserController@destroy");

Route::get('user_lock/{id}', "UserController@lock");

Route::post('service_product_store', 'ServicesController@store');

Route::post('service_product_update', 'ServicesController@update');

Route::get('service_product_delete/{id}', 'ServicesController@destroy');

Route::post('port_store', 'PortController@store');

Route::post('port_update', 'PortController@update');

Route::get('port_delete/{id}', 'PortController@destroy');

Route::post('port_type_store', 'PortTypeController@store');

Route::post('port_type_update', 'PortTypeController@update');

Route::get('port_type_delete/{id}', 'PortTypeController@destroy');

Route::post('service_type_store', 'ServiceTypeController@store');

Route::post('service_type_update', 'ServiceTypeController@update');

Route::get('service_type_delete/{id}', 'ServiceTypeController@destroy');

Route::post('payment_term_store', 'PaymentTermsController@store');

Route::post('payment_term_update', 'PaymentTermsController@update');

Route::get('payment_term_delete/{id}', 'PaymentTermsController@destroy');

Route::post('customer_form_store', 'CustomerController@store');

Route::post('customer_form_update', 'CustomerController@update');

Route::get('customer_form_delete/{id}', 'CustomerController@destroy');

Route::post('task_approver_store', 'TaskApproverController@store');

Route::post('task_approver_deny', 'TaskApproverController@deny');

Route::post('vendor_form_store', 'VendorController@store');

Route::post('vendor_form_update', 'VendorController@update');

Route::get('vendor_form_delete/{id}', 'VendorController@destroy');

Route::post('rate_form_store', "RateSetController@save");

Route::post('rate_form_update', "RateSetController@update");

Route::get('customer_file_delete/{id}' , 'CustomerFileController@destroy');

//////////////// Ajax Calls ////////////////////////////

Route::post('user_roles_store', "UserRolesController@store");

Route::get('company/active', "SystemSettingsController@isCompanyActive");

Route::put('/company/change_status', "SystemSettingsController@changeCompanyStatus");

Route::post('user_roles_update', "UserRolesController@update");

Route::post('quotation_store', "QuotationController@store");

Route::post('quotation_update', "QuotationController@update");

//////////////// Helper Function Calls ////////////////////////////

Route::get('company/info', 'HelperController@loadCompanyInfo');

Route::get('sidebar/menubar', 'HelperController@allMenuBarList');

Route::get('city/{countryID}', 'HelperController@loadCities');

Route::get('customer/search/{id}', 'HelperController@customerDetail');

Route::get('menu_bar/{levelName}', 'MenuBarController@getMenuBarSubList');

Route::get('customer/filter', 'CustomerController@find');

Route::get('vendor/filter', 'VendorController@find');

Route::get('port/filter', 'PortController@find');

Route::get('services/filter', 'ServicesController@find');

Route::get('user/filter', 'UserController@find');

Route::get('service_type/filter', 'ServiceTypeController@find');

Route::get('port_type/filter', 'PortTypeController@find');

Route::get('menu/filter', 'MenuBarController@find');

Route::get('user_role/filter', 'UserRolesController@find');

Route::get('system_settings/filter', 'SystemSettingsController@find');

Route::get('payment_terms/filter', 'PaymentTermsController@find');

Route::get('rateset/filter', 'RateSetController@find');

Route::get('quote/filter', 'QuotationController@find');

Route::get('customer_file/filter', 'CustomerFileController@find');

Route::get('rate_search/filter', 'RateSearchController@find');

Route::get('task_approved/filter', 'TaskApproverController@findStatus');

Route::get('/task_approved_advance/filter', 'TaskApproverController@findTask');

Route::get('quote/customer/port/{id}', 'HelperController@quoteCustomerAndPort');

Route::post('customer_file_store', 'CustomerFileController@store');

Route::post('customer_file_update', 'CustomerFileController@update');

Route::post('forget_password', 'ForgetPasswordController@sendEmailForResetPassword');

Route::post('reset_password', 'ForgetPasswordController@resetPassword');