<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Request;
use DB;
use App\Models\HelperModel;

class PageFilteringMiddlware {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null) {

        $routeName = $request->path();
        $hasSession = $request->session()->has('sessionLoginData');
        $urlHome = url('/');
        $urlLogin = url('/admin/login');

        if ($hasSession && $routeName != '/admin/login') {
            return $this->whenSessionIsActive($request, $next);
        } else if ($hasSession && $routeName == 'login') {
            return redirect($urlHome);
        } else if (!$hasSession && $routeName != 'login') {
            return redirect($urlLogin);
        }

        return $next($request);
    }

    private function whenSessionIsActive($request, $next) {
        $listOfMenuIDsAndRoles = HelperModel::getUserSessionRoleAuth();
        return $next($request);
        $menuIDs = $this->createMenuIDs($listOfMenuIDsAndRoles);
        $routeName = $request->path();
        $id = $this->getMenuIDsFromDatabase('/' . $routeName);

//        if (count($id) > 0 && $this->checkForPermission($id, $menuIDs) == true) {
//            return $next($request);
//        } else if (count($id) > 0 && $this->checkForPermission($id, $menuIDs) == false)
//            return redirect(url('/'))->withErrors(['Access Denied']);
//        else
//            return $next($request);
    }

    private function checkForPermission($id, $menuIDs) {
        foreach ($menuIDs as $menu) {
            if ($id[0]['MenuID'] == $menu['MenuID'] && $menu['NoAccess'] == 0) {
                return true;
            }
        }
        return false;
    }

    private function getMenuIDsFromDatabase($routeName) {
        return HelperModel::getMenuIDsFromDatabase($routeName);
    }

    private function createMenuIDs($listOfMenuIDsAndRoles) {
        $menuIDs = array();
        foreach ($listOfMenuIDsAndRoles as $data) {
            $tempArray = array("MenuID" => $data['MenuID'], "NoAccess" => $data['NoAccess']);
            array_push($menuIDs, $tempArray);
        }
        return $menuIDs;
    }
}
