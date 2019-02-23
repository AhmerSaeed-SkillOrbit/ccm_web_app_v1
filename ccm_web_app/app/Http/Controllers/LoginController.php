<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use App\Models\LoginModel;
use Illuminate\Http\Request;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request as HttpRequest;

class LoginController extends Controller {

    function login(Request $request) {
        // return LoginModel::getLogin($request);
        // try {

        //     echo "test";
        //     $client = new \GuzzleHttp\Client();
        //     $res = $client->post('http://127.0.0.1:8000/api/login', ['auth' =>  ['user', 'pass']]);
        //     echo $res->getStatusCode(); // 200
        //     echo $res->getBody();
        //   } catch (Exception $e) {

        //     echo "error";
        //         //   return $e;
        //   }
        
        // // if(){

        // // }

        
        

        try {

            // $request = new HttpRequest('POST', 'http://127.0.0.1:8000/api/login');
            // $response = $client->send($request, ['timeout' => 2]);

            $client = new \GuzzleHttp\Client();
            $res = $client->request(‘GET’, "http://127.0.0.1:8000/api/test/list", [
                ‘headers’ => [
                ‘Accept’ => ‘application/json’,
                ‘Content-type’ => ‘application/json’
                ]]);

            // Here the code for successful request
            echo "Got response 200";
        } catch (RequestException $e) {

            // Catch all 4XX errors 

            // To catch exactly error 400 use 
            if ($e->getResponse()->getStatusCode() == '400') {
                    echo "Got response 400";
            }

            
            // You can check for whatever error status code you need 

        } catch (\Exception $e) {
            echo "Got response 500";
            print_r($e);
            // There was another exception.

        }
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
