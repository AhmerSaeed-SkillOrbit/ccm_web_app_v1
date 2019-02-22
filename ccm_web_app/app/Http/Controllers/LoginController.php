<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use App\Models\LoginModel;
use Illuminate\Http\Request;

class LoginController extends Controller {

    function login(Request $request) {
        // return LoginModel::getLogin($request);
        $client = new \GuzzleHttp\Client();
        $res = $client->post('http://127.0.0.1:8000/api/login', ['auth' =>  ['user', 'pass']]);
        // echo $res->getStatusCode(); // 200
        // echo $res->getBody();
    }

    function adminLogin(Request $request) {
        return LoginModel::getAdminLogin($request);
    }

    function logout(Request $request) {
        return LoginModel::getlogout($request);
    }

    function adminLogout(Request $request) {
        return LoginModel::getAdminlogout($request);
    }

}
